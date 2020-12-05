/**
 * Grunt webpack task config
 * @package Elementor
 */
const path = require( 'path' );

const TerserPlugin = require( 'terser-webpack-plugin' );

const aliasList = require('./webpack.alias.js').resolve;

const webpack = require('webpack');

const RemoveChunksPlugin = require('./remove-chunks');

const moduleRules = {
	rules: [
		// {
		// 	enforce: 'pre',
		// 	test: /\.js$/,
		// 	exclude: /node_modules/,
		// 	loader: 'eslint-loader',
		// 	options: {
		// 		failOnError: true,
		// 	}
		// },
		{
			test: /core[/\\]app.*\.(s)?css$/i,
			use: [
				{
					loader: './loaders/app-imports.js',
				},
			],
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [ '@wordpress/default' ],
						plugins: [
							[ '@wordpress/babel-plugin-import-jsx-pragma' ],
							[ '@babel/plugin-transform-react-jsx', {
								'pragmaFrag': 'React.Fragment',
							} ],
							[ '@babel/plugin-proposal-class-properties' ],
							[ '@babel/plugin-transform-runtime' ],
							[ '@babel/plugin-transform-modules-commonjs' ],
							[ '@babel/plugin-proposal-optional-chaining' ],
						],
					},
				},
			],
		},
	],
};

const entry = {
	'editor': [
		path.resolve( __dirname, '../assets/dev/js/editor/utils/jquery-serialize-object.js' ),
		path.resolve( __dirname, '../assets/dev/js/editor/utils/jquery-html5-dnd.js' ),
		path.resolve( __dirname, '../assets/dev/js/editor/editor.js' ),
	],
	'admin': path.resolve( __dirname, '../assets/dev/js/admin/admin.js' ),
	'elementor-admin-bar': path.resolve( __dirname, '../modules/admin-bar/assets/js/frontend/module.js' ),
	'admin-feedback': path.resolve( __dirname, '../assets/dev/js/admin/admin-feedback.js' ),
	'common': path.resolve( __dirname, '../core/common/assets/js/common.js' ),
	'gutenberg': path.resolve( __dirname, '../assets/dev/js/admin/gutenberg.js' ),
	'new-template': path.resolve( __dirname, '../assets/dev/js/admin/new-template/new-template.js' ),
	'app': path.resolve( __dirname, '../core/app/assets/js/index.js' ),
	'app-loader': path.resolve( __dirname, '../core/app/assets/js/app-loader' ),
	'app-packages': path.resolve( __dirname, '../core/app/assets/js/app-packages' ),
	'beta-tester': path.resolve( __dirname, '../assets/dev/js/admin/beta-tester/beta-tester.js' ),
	'common-modules': path.resolve( __dirname, '../core/common/assets/js/modules' ),
	'editor-modules': path.resolve( __dirname, '../assets/dev/js/editor/modules.js' ),
	'editor-document': path.resolve( __dirname, '../assets/dev/js/editor/editor-document.js' ),
	'qunit-tests': path.resolve( __dirname, '../tests/qunit/main.js' ),
};

const frontendEntries = {
	'frontend-modules': path.resolve( __dirname, '../assets/dev/js/frontend/modules.js' ),
	'frontend': { import: path.resolve( __dirname, '../assets/dev/js/frontend/frontend.js' ), dependOn: 'frontend-modules' },
	'preloaded-elements-handlers': { import: path.resolve( __dirname, '../assets/dev/js/frontend/preloaded-elements-handlers.js' ), dependOn: 'frontend' },
};

const externals = {
	'@wordpress/i18n': 'wp.i18n',
		react: 'React',
		'react-dom': 'ReactDOM',
		'@elementor/app-ui': 'elementorAppPackages.appUi',
		'@elementor/site-editor': 'elementorAppPackages.siteEditor',
		'@elementor/router': 'elementorAppPackages.router',
};

const plugins = [
	new webpack.ProvidePlugin( {
		React: 'react',
		ReactDOM: 'react-dom',
		PropTypes: 'prop-types',
		__: [ '@wordpress/i18n', '__' ],
	} )
];

const baseConfig = {
	target: 'web',
	context: __dirname,
	devtool: 'source-map',
	externals,
	module: moduleRules,
	resolve: aliasList,
};

const devSharedConfig = {
	...baseConfig,
	plugins: [
		new RemoveChunksPlugin( '.bundle.js' ),
		...plugins,
	],
	mode: 'development',
	output: {
		path: path.resolve( __dirname, '../assets/js' ),
		chunkFilename: '[name].[contenthash].bundle.js',
		filename: '[name].js',
		devtoolModuleFilenameTemplate: '../[resource]',
	},
	watch: true,
};

const webpackConfig = [
	{
		...devSharedConfig,
		name: 'base',
		entry: entry,
	},
	{
		...devSharedConfig,
		name: 'frontend',
		optimization: {
			runtimeChunk:  {
				name: 'webpack.runtime',
			},
			splitChunks: {
				minChunks: 2,
			},
		},
		entry: frontendEntries,
	},
];

const prodSharedOptimization = {
	minimize: true,
	minimizer: [
		new TerserPlugin( {
			terserOptions: {
				keep_fnames: true,
			},
			include: /\.min\.js$/
		} ),
	],
};

const prodSharedConfig = {
	...baseConfig,
	plugins: [
		new RemoveChunksPlugin( '.bundle.min.js' ),
		...plugins,
	],
	mode: 'production',
	output: {
		path: path.resolve( __dirname, '../assets/js' ),
		chunkFilename: '[name].[contenthash].bundle.min.js',
		filename: '[name].js',
	},
	performance: { hints: false },
};

const webpackProductionConfig = [
	{
		...prodSharedConfig,
		name: 'base',
		entry: {
			...entry,
		},
		optimization: {
			...prodSharedOptimization,
		},
	},
	{
		...prodSharedConfig,
		name: 'frontend',
		entry: {
			...frontendEntries,
		},
		optimization: {
			...prodSharedOptimization,
			runtimeChunk: {
				name: 'webpack.runtime.min',
			},
			splitChunks: {
				minChunks: 2,
			},
		},
	},
];

// Add minified entry points
webpackProductionConfig.forEach( ( config, index ) => {
	for ( const entryPoint in config.entry ) {
		let entryValue = config.entry[ entryPoint ];

		if ( entryValue.dependOn ) {
			// We duplicate the 'entryValue' obj for not affecting the 'entry' obj used by the dev process.
			entryValue = { ...entryValue };

			entryValue.dependOn += '.min';
		}

		delete config.entry[ entryPoint ];
		config.entry[ entryPoint + '.min' ] = entryValue;
	}
} );

const developmentNoWatchConfig = webpackConfig.map( ( config ) => {
	return { ...config, watch: false };
} );

const gruntWebpackConfig = {
	development: webpackConfig,
	developmentNoWatch: developmentNoWatchConfig,
	production: webpackProductionConfig
};

module.exports = gruntWebpackConfig;
