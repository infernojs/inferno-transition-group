import path from 'path';
import fs from 'fs';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

let pkg = JSON.parse(fs.readFileSync('./package.json'));

let external = Object.keys(pkg.dependencies || {});

export default {
	input: path.join(__dirname, 'src/index.js'),
	output: [{
		name: 'InfernoTransitionGroup',
		format: 'umd',
		file: path.join(__dirname, 'dist/inferno-transition-group.js'),
		sourcemap: false
	}, {
		name: 'InfernoTransitionGroup',
		format: 'es',
		file: path.join(__dirname, 'dist/inferno-transition-group.esm.js'),
		sourcemap: false
	}],
	external,
	plugins: [
		babel({
			babelrc: false,
			comments: false,
			presets: [
				[
					"es2015",
					{
						"loose": true,
						"modules": false
					}
				],
				'stage-0'
			],
			plugins: [
				'transform-class-properties',
				['transform-es2015-classes', { loose:true }]
			]
		}),
		commonjs({
			include: 'node_modules/**',
			exclude: '**/*.css'
		})
	]
};
