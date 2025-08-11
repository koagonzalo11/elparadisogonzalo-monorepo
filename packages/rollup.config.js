// packages/my-npm-package/rollup.config.js
export default {
  input: 'src/index.js',  // Adjust to your entry file
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',         // or 'esm' if you prefer
  },
  plugins: [
    // add plugins here if needed, e.g. terser for minification
  ],
};
