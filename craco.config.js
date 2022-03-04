/* eslint-disable */
const cracoModuleFederationPlugin = require('./plugin.js')
const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: cracoModuleFederationPlugin,
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.path.json',
      },
    },
  ],
};
