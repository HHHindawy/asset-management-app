import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    'https://my-json-server.typicode.com/HHHindawy/asset-management-app',
});

export default axiosInstance;
