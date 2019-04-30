import babel from 'rollup-plugin-babel';
import commonJs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

function createConfig({ file = 'dist/index.js' }) {
  return {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file,
      name: 'SuperAppSDK'
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      commonJs(),
      resolve(),
      uglify()
    ]
  };
}

export default [createConfig({})];
