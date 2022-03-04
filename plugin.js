/* eslint-disable */
const paths = require('react-scripts/config/paths')

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    webpackConfig.output.publicPath = 'auto'
    const htmlWebpackPlugin = webpackConfig.plugins.find(
      (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
    )
    const definePlugin = webpackConfig.plugins.find(
      (plugin) => plugin.constructor.name === 'DefinePlugin'
    )
    definePlugin.definitions['process.env'] = {
      ...definePlugin.definitions['process.env'],
      MODE: `"${process.env.MODE}"`,
    }
    htmlWebpackPlugin.userOptions = {
      ...htmlWebpackPlugin.userOptions,
      publicPath: paths.publicUrlOrPath,
    }
    webpackConfig.resolve = {
      ...webpackConfig.resolve,
      fallback: {
        path: require.resolve('path-browserify'),
      },
    }

    webpackConfig.plugins = [...webpackConfig.plugins]

    const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
      ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
    )

    webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)
    return webpackConfig
  },
  overrideDevServerConfig: ({ devServerConfig }) => {
    devServerConfig.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    }

    return devServerConfig
  },
}
