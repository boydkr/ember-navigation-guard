'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    scenarios: [
      {
        name: 'lts-3.24',
        npm: {
          devDependencies: {
            '@types/ember-qunit': '^5.0.0',
            '@types/ember-resolver': '^5.0.11',
            '@types/ember__test-helpers': '^2.6.1',
            'ember-qunit': '^5.1.5',
            'ember-resolver': '^8.0.3',
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
      {
        name: 'canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
          overrides: {
            'ember-source': '$ember-source',
          },
        },
      },
      {
        name: 'classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false,
          }),
        },
        npm: {
          devDependencies: {
            'ember-source': '~3.28.11',
          },
          ember: {
            edition: 'classic',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
