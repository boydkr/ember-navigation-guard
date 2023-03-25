'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    scenarios: [
      {
        name: 'lts-3.20',
        npm: {
          devDependencies: {
            'ember-source': '~3.20.5',
          },
        },
      },
      {
        name: 'lts-3.24',
        npm: {
          devDependencies: {
            'ember-source': '~3.24.3',
          },
        },
      },
      {
        name: 'lts-3.24',
        npm: {
          devDependencies: {
            'ember-source': '~3.24.6',
          },
        },
      },
      {
        name: 'lts-3.28',
        npm: {
          devDependencies: {
            'ember-source': '~3.28.11',
          },
        },
      },
      {
        name: 'lts-4.4',
        npm: {
          devDependencies: {
            'ember-source': '~4.4.4',
          },
        },
      },
      {
        name: 'lts-4.8',
        npm: {
          devDependencies: {
            'ember-source': '~4.8.4',
          },
        },
      },
      {
        name: 'release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
          overrides: {
            'ember-source': '$ember-source',
          },
        },
      },
      {
        name: 'beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
          overrides: {
            'ember-source': '$ember-source',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
