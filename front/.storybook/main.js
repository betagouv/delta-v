const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  staticDirs: ['../public'],
  addons: [
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, '../src/'),
    };

    config.resolve.roots = [path.resolve(__dirname, '../public'), 'node_modules'];

    return config;
  },
};
