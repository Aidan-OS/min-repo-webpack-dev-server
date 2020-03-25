const webpack = require('webpack');
let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = [{
		context: path.join(__dirname, '../app'),
		devtool: 'inline-source-map',
		entry: {
			'app': [
				'@babel/polyfill',
				'react-hot-loader/patch',
				'webpack-dev-server/client?http://localhost:8080',
				'webpack/hot/only-dev-server',
				'./src/main/js/index.js',
			],
		},
		output: {
			path: path.resolve(__dirname, './app/build'),
			filename: 'app.bundle.js',
			publicPath: 'http://localhost:8080/',
		},
		devServer: {
			hot: true,
			publicPath: 'http://localhost:8080/',
			historyApiFallback: true,
		},
		// MANUALLY SPECIFY TARGET - THIS IS REQUIRED TO RESOLVE A DEPENDENCY WITHIN THE RPC CLIENT MODULE AND WEBPACK
		target: "electron-main",
		module: {
			rules: [
				{
					exclude: /node_modules/,
					test: /\.js$/,
					loader: 'babel-loader',
					query: {
						presets: ['@babel/preset-react'],
						plugins: ["@babel/plugin-transform-destructuring", "@babel/plugin-proposal-object-rest-spread"]
					},
				},
				{
					test: /\.css/,
					use: ['style-loader', 'css-loader']
				}
			],
		},
		resolve: {
			mainFields: ['module', 'browser', 'main']
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			new CopyWebpackPlugin([
				{ from: './src/main/app.js' },
				{ from: './src/main/index.html', to: 'index.html' }
			]),
		],
	},
	////////////////
	{
		context: path.join(__dirname, '../app'),
		devtool: 'source-map',
		entry: {
			'app': [
				'react-hot-loader/patch',
				'./src/main/index.html',
				'webpack-dev-server/client?http://localhost:8080',
				'webpack/hot/only-dev-server',
			],
		},
		output: {
			path: path.resolve(__dirname, '../app/build/'),
			filename: 'app.bundle.js',
			publicPath: '/',
		},
		target: "electron-renderer",
		module: {
			rules: [
				{
					exclude: /node_modules/,
					test: /\.html$/,
					loader: 'html-loader',
				},
				{
					test: /\.css/,
					use: ['style-loader', 'css-loader']
				}],
		},
		resolve: {
			mainFields: ['browser', 'module']
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new CopyWebpackPlugin([
				{
					from: './src/main/index.html',
					to: path.join(__dirname, '../app/build/')
				},
			]),
			new webpack.NamedModulesPlugin(),
		],
	}
];
