import axios from 'axios';

const axiosInstance = axios.create(); // make a new instance of Axios

// REQUEST interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    await axios.post('http://localhost:8006/log', {
      type: 'request',
      method: config.method,
      url: config.url,
      timestamp: new Date().toISOString(),
      data: config.data,
    }).catch(() => {}); // don't block original request on logging failure
    console.log('interceptor works');
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    await axios.post('http://localhost:8006/log', {
      type: 'response',
      method: response.config.method,
      url: response.config.url,
      timestamp: new Date().toISOString(),
      status: response.status,
      data: response.data,
    }).catch(() => {});

    return response;
  },
  async (error) => {
    await axios.post('http://localhost:8006/log', {
      type: 'error',
      method: error.config?.method,
      url: error.config?.url,
      timestamp: new Date().toISOString(),
      status: error.response?.status,
      error: error.message,
    }).catch(() => {});

    return Promise.reject(error);
  }
);

export default axiosInstance;
