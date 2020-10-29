/**
 * Grunt webpack task config
 * @package Elementor
 */
const path = require( 'path' );

const TerserPlugin = require( 'terser-webpack-plugin' );

const aliasList = require('./webpack.alias.js').resolve;

const webpack = require('webpack');

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
	'frontend': path.resolve( __dirname, '../assets/dev/js/frontend/frontend.js' ),
	'external-handlers': { import: path.resolve( __dirname, '../assets/dev/js/frontend/external-handlers.js' ), dependOn: 'frontend' },
	'frontend-modules': path.resolve( __dirname, '../assets/dev/js/frontend/modules.js' ),
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
	plugins,
	module: moduleRules,
	resolve: aliasList,
};

const devSharedConfig = {
	...baseConfig,
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
				name: 'runtime',
			},
			splitChunks: {
				minChunks: 2,
			},
		},
		entry: frontendEntries,
	},
];


const webpackProductionConfig = Object.assign( {}, baseConfig, {
	mode: 'production',
	output: {
		path: path.resolve( __dirname, '../assets/js' ),
		chunkFilename: '[name].[contenthash].bundle.min.js',
		filename: '[name].js',
	},
	entry: {},
	performance: { hints: false },
	optimization: {
		runtimeChunk: {
			name: 'runtime.min',
		},
		splitChunks: {
			minChunks: 2,
		},
		minimize: true,
		minimizer: [
			new TerserPlugin( {
				terserOptions: {
					keep_fnames: true,
				},
				include: /\.min\.js$/
			} ),
		],
	},
} );

// Add minified entry points
for ( const entryPoint in entry ) {
	let entryValue = entry[ entryPoint ];

	if ( entryValue.dependOn ) {
		entryValue = { ...entryValue };

		entryValue.dependOn += '.min';
	}

	webpackProductionConfig.entry[ entryPoint + '.min' ] = entryValue;
}

const defaultConfig = webpackConfig.map( ( config ) => {
	return { ...config, watch: false };
} );

const gruntWebpackConfig = {
	development: webpackConfig,
	default: defaultConfig,
	production: webpackProductionConfig
};

module.exports = gruntWebpackConfig;
