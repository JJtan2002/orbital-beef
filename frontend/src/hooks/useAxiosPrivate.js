import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const apiPrivate = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});

const useAxiosPrivate = () => {
  const { authTokens, Logout, refresh } = useAuth();

  useEffect(() => {
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authTokens?.access}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return apiPrivate(prevRequest);
          } catch (err) {
            Logout();
            return Promise.reject(err);
          }
        } else if (error.response.status === 403 && !prevRequest.sent) {
          Logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept);
      apiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authTokens, refresh, Logout]);

  return apiPrivate;
};

export default useAxiosPrivate;
