const ModuleFederationPlugin = require( 'webpack' ).container.ModuleFederationPlugin;
const path = require( 'path' );

module.exports = {
	entry: {
		locations: {
			import: path.resolve( __dirname, `./index` ),
			library: {
				name: [ 'elementorEditorPackages', 'locations' ],
				type: 'window',
			},
		},
	},
	mode: 'development',
	output: {
		filename: 'main.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				type: 'javascript/auto',
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [ '@babel/preset-react' ],
				},
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin( {
			name: 'locations',
			shared: {
				react: {
					eager: true,
				},
			},
		} ),
	],
};
