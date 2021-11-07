import { babel } from '@rollup/plugin-babel';
import pkg from './package.json'

const config = {
  input: 'index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: pkg.name,
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
  ],
  plugins: [babel({ babelHelpers: 'bundled' })]
};

export default config;
