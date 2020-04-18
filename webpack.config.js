const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "[name].[contenthash].js"
	},
	optimization: {
		// runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	},
	module: {
		rules: [
			// CSS Files
			{
				test: /\.css$/,
				use: [
					"style-loader",// second
					"css-loader",// first
				]
			},
			// Images
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: [
					"file-loader"
				]
			},
			// Fonts
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					"file-loader"
				]
			},
			// JSX Files
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "src/template/index.html",
			filename: "index.html"
		})
	],
	devServer: {
		port: 8080,
		host: "0.0.0.0",
		// open: true,
		proxy: {
			"/api": "http://localhost:80"
		}
	},
	devtool: "source-map",
	mode: "development",
	watch: true,
};
