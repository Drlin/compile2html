var webpack = require('webpack');
var path = require('path');

var distPath = path.resolve(__dirname, 'build');
module.exports = {
	entry: './compile2html.js',
	output: {
		path: distPath,
		filename: 'bundle.js',
		library: 'Compile2Html',
    	libraryTarget: 'umd',
    	umdNamedDefine: true
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: path.resolve(__dirname, 'node_modules'),
			include: path.resolve(__dirname, 'compile2html.js'),
			loader: 'babel-loader',
			query: {
                presets: ['es2015', 'stage-0']
            }
		}]
	},
	plugins: ([
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			mangle: false,
			compress: {
				warnings: false,
				// drop_console: true,
				collapse_vars: true,
				reduce_vars: true
			}
		})
	])
}