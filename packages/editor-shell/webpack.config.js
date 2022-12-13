const ModuleFederationPlugin = require( 'webpack' ).container.ModuleFederationPlugin;

module.exports = {
	entry: './index',
	mode: 'development',
	output: {
		publicPath: 'auto',
		clean: true,
	},
	externals: {
		'@elementor/locations': 'elementorEditorPackages.locations',
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
			name: 'editorShell',
			shared: {
				react: {
					import: 'react',
					shareKey: 'shared-react',
					shareScope: 'default',
					strictVersion: true,
					version: '17.0.2',
					requiredVersion: '^17.0.2',
				},
			},
		} ),
	],
};
