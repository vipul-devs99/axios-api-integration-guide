export const RELEASE_VERSION = '1.0.1';

export const _Environments: { [key: string]: any } = {
  development: {
    env: import.meta.env.VITE_APP_ENV,
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
    release: RELEASE_VERSION,
    logs: true,
  },
  production: {
    env: import.meta.env.VITE_APP_ENV,
    baseUrl: import.meta.env.VITE_APP_BASE_URL,
    release: RELEASE_VERSION,
    logs: false,
  },
};

const getEnvironment = () => {
  const env = import.meta.env.VITE_APP_ENV || 'development';
  return _Environments[env];
};
export default getEnvironment();
