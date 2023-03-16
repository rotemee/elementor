// Inspired by "Dependency Extraction Webpack Plugin" by @wordpress team.
// Link: https://github.com/WordPress/gutenberg/tree/trunk/packages/dependency-extraction-webpack-plugin

const { sources: { RawSource } } = require( 'webpack' );
const fs = require( 'fs' );
const path = require( 'path' );

module.exports = class ExtractDependenciesWebpackPlugin {
	constructor( {
		handlePrefix,
		i18n,
	} = {} ) {
		if ( ! handlePrefix  ) {
			throw new Error( 'handlePrefix is required in Webpack.config' );
		}
		
		this.handlePrefix = handlePrefix;
		this.i18n = i18n;
	}

	apply( compiler ) {
		compiler.hooks.thisCompilation.tap( this.constructor.name, ( compilation ) => {
			compilation.hooks.processAssets.tap( { name: this.constructor.name }, () => {
				const entriesData = [ ...compilation.entrypoints ].reduce( ( data, [ entryName, entrypoint ] ) => {
					const chunk = entrypoint.chunks.find( ( { name } ) => name === entryName );
					const chunkJSFile = this.getFileFromChunk( chunk );

					if ( ! chunkJSFile ) {
						return data;
					}

					const rootFolderPath = compilation.options.context;
					const entryFolderPath = entrypoint.origins[ 0 ].request;
					const packageJsonPath = this.findPackageJsonPath( entryFolderPath, rootFolderPath );

					if ( ! packageJsonPath ) {
						return data;
					}

					const packageJsonData = require( packageJsonPath );

					const deps = this.getDepsFromChunk( compilation, chunk );
					const packageName = packageJsonData.name;

					data[ packageName ] = {
						entryName,
						deps,
						packageName,
						handle: `${ this.handlePrefix }-${ entryName }`,
						i18n: packageJsonData.elementor?.i18n || this.i18n,
						shouldMinify: compilation.options.optimization.minimize,
						type: packageJsonData.elementor?.type,
					};

					return data;
				}, {} );

				const loaderFileContent = this.getLoaderFileContent( entriesData );

				compilation.emitAsset(
					'loader.php',
					new RawSource( loaderFileContent )
				);
			} );
		} );
	}

	findPackageJsonPath( baseFolder, topLevelFolder ) {
		const packageJsonPath = path.resolve( baseFolder, 'package.json' );

		if ( fs.existsSync( packageJsonPath ) ) {
			return packageJsonPath;
		}

		const parentFolder = path.resolve( baseFolder, '..' );

		if ( parentFolder === topLevelFolder ) {
			return null;
		}

		return this.findPackageJsonPath( parentFolder, topLevelFolder );
	}

	getLoaderFileContent( entriesData ) {
		const entriesContent = Object.entries( entriesData ).map( ( [ packageName, data ] ) => {
			return `
	$data['${ packageName }'] = ${ this.createPackageLoaderConfig( data ) };`;
		} );

		return `<?php

add_filter( 'elementor/packages/config', function( $data ) {
	$plugin_url = plugins_url( '/', __FILE__ );
${ entriesContent.join( '\n' ) }

	return $data;
} );
`;
	}

	getDepsFromChunk( compilation, chunk ) {
		const externals = Object.keys( compilation.options.externals );
		const depsSet = new Set();

		compilation.chunkGraph.getChunkModules( chunk ).forEach( ( module ) => {
			[ ...( module.modules || [] ), module ].forEach( ( subModule ) => {
				const isExternalDep = externals.includes( subModule.userRequest );

				if ( ! isExternalDep ) {
					return;
				}

				depsSet.add( subModule.userRequest );
			} );
		} );

		return depsSet;
	}

	createPackageLoaderConfig( { entryName, deps, shouldMinify, handle, i18n, packageName, type } ) {
		const depsAsString = [ ...deps ]
			.filter( ( dep ) => dep !== packageName )
			.sort()
			.map( ( dep ) => `'${ dep }',` )
			.join( '\n\t\t\t' );

		// TODO: verify 'replace_requested_file' - it should be false by default?
		const i18nContent = i18n ? `[
			'domain' => '${ i18n.domain }',
			'replace_requested_file' => ${ ( i18n.replaceRequestedFile || false ).toString() },
		]` : '[]';

		let content =
`[
		'handle' => '${ handle }',
		'entry' => '${ entryName }',
		'url' => $plugin_url,
		'deps' => [
			${ depsAsString }
		],
		'i18n' => ${ i18nContent },
		'type' => ${ type ? `'${ type }'` : 'null' },
	]`;

		if ( shouldMinify ) {
			content = content
				.replaceAll( /\s/gm, '' )
				.replace( '<?php', '<?php\n' );
		}

		return content;
	}

	getFileFromChunk( chunk ) {
		return [ ...chunk.files ].find( ( f ) => /\.js$/i.test( f ) );
	}
};
