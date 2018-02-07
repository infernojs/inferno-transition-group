var path = require('path');

module.exports = function(config) {
	config.set({
		basePath: '..',
		frameworks: ['mocha', 'chai-sinon'],
		reporters: ['mocha'],

		singleRun: true,

		files: [
			'tests/**/*.js'
		],

		browsers: ['Chrome'],

		preprocessors: {
			'tests/**/*.js': ['webpack'],
			'src/**/*.js': ['webpack'],
			// '**/*.js': ['sourcemap']
		},

		client: {
			mocha: {
				timeout: 6000
			}
		},

		webpack: {
			module: {
				loaders: [
					{
						test: /\.jsx?$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
						query: {
							// sourceMap: 'inline',
							presets: [['es2015', {loose: true}], 'stage-0'],
							plugins: [
								'transform-class-properties',
								'transform-object-rest-spread',
								'inferno'
							]
						}
					},
					{
						test: /\.css$/,
						loader: 'style!css'
					}
				]
			}
		},

		webpackMiddleware: {
			noInfo: true
		}
	});
};
