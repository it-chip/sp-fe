const webpackConfig = require('../../sp-fe/config/webpack.dev.config');
const paths = require('../../sp-fe/config/paths');

module.exports = {
  features: {
    postcss: false,
  },
  core: {
    builder: 'webpack5',
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        extensions: [...webpackConfig.resolve.extensions]
      },
      module: {
        ...config.module,
        rules: [
          {
            test: /\.(ts|tsx|mdx)$/,
            exclude: paths.appNodeModules,
            use: ['babel-loader']
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              'file-loader?name=images/[name].[ext]'
            ]
          }
        ]
      }
    };
  },
};