import babel from 'rollup-plugin-babel';
import commonJs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

function createConfig({ file = 'dist/index.js' }) {
  return {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file,
      name: 'SuperAppSDK'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonJs({ include: 'node_modules/**' }),
      uglify()
    ]
  };
}

export default [createConfig({})];
