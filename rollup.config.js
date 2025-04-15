import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main, // dist/index.js
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module, // dist/index.esm.js
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(), // Resolves node_modules dependencies
    commonjs(), // Converts CommonJS modules to ES6
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // Don’t transpile dependencies
      extensions: ['.js', '.jsx'],
    }),
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
    'bootstrap', // Keep as peer/external dependency
  ],
};
