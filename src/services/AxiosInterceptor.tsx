//@flow
import axios from 'axios';
import { baseURL } from '../config/Config';


export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 120000,
  headers: {
    Accept: 'application/json',
  },
});



 // Add a response interceptor
 axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data

    return response;
  }, function (error) {
  
    console.log("error", error)
    if (error === 'Network Error') {
      //alert('red','Network Error')
    }
    // Do something with response error
    return Promise.reject(error);
  });


