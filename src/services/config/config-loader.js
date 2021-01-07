import { baseUrl } from './environment';
let loadedConfig = null;

export const loadConfig = () => {
  return new Promise((resolve, reject) => {
    if (loadedConfig) {
      resolve(loadedConfig);
      return;
    }

    const errorMessage = 'Failed to load config';
    fetch(baseUrl + '/config.json', {
      credentials: 'include',
      headers: { accept: 'application/json' }
    }).then(
      response => {
        if (response.headers.get('Content-Type').indexOf('application/json') < 0) {
          reject(errorMessage);
          return;
        }
        if (response.ok) {
          response.json().then(config => {
            loadedConfig = config;
            resolve(config);
          });
        } else {
          reject(errorMessage);
        }
      },
      () => reject(errorMessage)
      );
  });
};

export const getLoadedConfig = () => loadedConfig;
