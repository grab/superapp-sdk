import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'SuperAppSDK',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    // Resolve node_modules dependencies
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    // Convert CommonJS modules to ES6
    commonjs(),
    // Handle TypeScript files
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationMap: true,
      module: 'ESNext',
      target: 'ES2018',
    }),
    // Minify the output
    terser({
      format: {
        comments: false,
      },
      compress: {
        drop_console: false,
        passes: 2,
      },
      mangle: true,
    }),
  ],
  // Mark peer dependencies as external if needed (currently bundling all)
  external: [],
};
