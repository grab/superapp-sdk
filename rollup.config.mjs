/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const COPYRIGHT_BANNER = `/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */`;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/index.js',
      format: 'umd',
      name: 'SuperAppSDK',
      exports: 'named',
    },
    {
      file: 'build/index.esm.js',
      format: 'es',
      exports: 'named',
    },
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      outDir: 'build',
      emitDeclarationOnly: true,
    }),
    terser({
      format: {
        comments: false,
        preamble: COPYRIGHT_BANNER,
      },
      compress: {
        passes: 2,
      },
      mangle: true,
    }),
  ],
  external: [],
};
