import api from './instance';

export const Auth = {
  login: (username: string, password: string) => api.post('/auth/login', { username, password }),
  logout: () => api.post('/auth/logout', {}),
};
