import axios from 'axios';
import envConfig from 'src/environment';

export const { baseUrl } = envConfig;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('at-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setupResponseInterceptor = (onUnauthenticated: () => void) => {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      if ([401, 403].includes(status)) {
        sessionStorage.removeItem('at-token');
        sessionStorage.removeItem('user');
        if (window.location.pathname !== '/sign-in') {
          onUnauthenticated();
          window.location.href = '/sign-in';
        }
      }
      return Promise.reject(error);
    }
  );
  return () => {
    axiosInstance.interceptors.response.eject(interceptor);
  };
};

export default {
  get: <T>(url: string, params?: object) => axiosInstance.get<T>(url, { ...params }),
  post: <T>(url: string, data: any) => axiosInstance.post<T>(url, data, {}),
  patch: <T>(url: string, data: any) => axiosInstance.patch<T>(url, data, {}),
  put: <T>(url: string, data: any) => axiosInstance.put<T>(url, data, {}),
  delete: <T>(url: string) => axiosInstance.delete<T>(url, {}),
};
