// this is so that jest test files can import and use ts files
// and also use esmodule syntax
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ]
};
