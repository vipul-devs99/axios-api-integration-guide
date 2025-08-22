import { useState, useEffect } from 'react';
import { Auth } from '../auth';
import { setupResponseInterceptor } from '../instance';

export function useAuth() {
  const [user, setUser] = useState(() =>
    JSON.parse(sessionStorage.getItem('user') || 'null')
  );

  useEffect(() => {
    const removeInterceptor = setupResponseInterceptor(() => {
      setUser(null);
    });
    return () => removeInterceptor();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await Auth.login(username, password);
      if (response?.data?.token) {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        sessionStorage.setItem('at-token', response.data.token);
        setUser(response.data.user);
      }
      return response;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('at-token');
    window.location.href = '/sign-in';
  };

  return { user, signIn, signOut };
}
