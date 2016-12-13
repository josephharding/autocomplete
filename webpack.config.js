var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var path = require("path");
module.exports = {
	entry: [
		"webpack-hot-middleware/client?reload=true",
		"./src/app.js"
	],
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/build/",
		filename: "bundle.js"
	},
	module: {
	  loaders: [
		{
		  test: /\.js$/,
		  exclude: /(node_modules)/,
		  loader: 'babel',
		  query: {
			  presets: ['es2015']
      }
		},
		{
			test: /\.css$/,
			loaders: ['style', 'css']
		}
	  ]
	},
	postcss: function() {
		return [autoprefixer]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
