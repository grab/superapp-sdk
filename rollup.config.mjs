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
import { visualizer } from 'rollup-plugin-visualizer';

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
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
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
    ...(process.env.ROLLUP_VISUALIZE
      ? [
          visualizer({
            filename: 'bundle-stats.html',
            gzipSize: true,
            template: 'treemap',
          }),
        ]
      : []),
  ],
  external: [],
};
