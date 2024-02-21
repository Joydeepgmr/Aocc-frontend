const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin =
// 	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const dotenv = require('dotenv');

// this will update the process.env with environment variables in .env file
dotenv.config();

const config = {
	entry: ['react-hot-loader/patch', './src/index.js'],
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		publicPath: '/',
		chunkFilename: '[name].js',
		crossOriginLoading: 'anonymous',
	},
	module: {
		rules: [
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpg|jpeg|png|woff|woff2|gif|eot|ttf|svg)$/,
				use: 'url-loader?limit=1024000',
			},
			{
				test: /\.(mp4|mov)$/,
				use: 'url-loader?limit=10000&mimetype=video/mp4',
			},
		],
	},
	devServer: {
		historyApiFallback: true,
		// disableHostCheck: true,
		allowedHosts: 'all',
		static: './build',
	},
	resolve: {
		extensions: ['.webpack.js', '.web.js', '.mjs', '.js', '.jsx', '.json'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
			components: path.resolve(__dirname, 'src/components'),
			asset: path.resolve(__dirname, 'src/Asset'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: './favicon.svg',
			template: './index.html',
			filename: 'index.html',
		}),
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
		// new BundleAnalyzerPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: './sitemap.xml', to: 'sitemap.xml' },
				{ from: './robots.txt', to: 'robots.txt' },
				{ from: './src/assets/seo/og_image.png', to: 'og_image.png' },
			],
		}),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(process.env),
		}),
	],
	devtool: 'cheap-module-source-map',
	optimization: {
		// runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
				assets: {
					test: /\.(jpg|jpeg|png|woff|woff2|gif|eot|ttf|svg)$/,
					name: 'assets',
					chunks: 'all',
				},
			},
		},
	},
};

module.exports = config;
