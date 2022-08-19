module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-react',
    '@babel/plugin-transform-typescript'
  ]
};

  // {
  //   "presets": ["@babel/preset-env", "@babel/preset-react"]
  // }

//   module.exports = {
//     presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
//   }; 