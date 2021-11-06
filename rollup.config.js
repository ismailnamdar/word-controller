import { babel } from '@rollup/plugin-babel';

const config = {
  input: 'index.js',
  output: {
    dir: 'output',
    format: 'iife'
  },
  plugins: [babel({ babelHelpers: 'bundled' })]
};

export default config;
