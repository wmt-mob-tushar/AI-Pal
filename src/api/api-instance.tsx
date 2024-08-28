/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { store } from 'src/reduxToolkit/store';
import {ToastType, showToast, Constants} from 'src/utils';
// import { API_URL } from "src/apputils";

//  $$$

interface DataResponse {
  status: number;
  meta: any;
  data: any;
  pagination?: any;
}
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'www.google.com',
  timeout: 30000,
});

// return request config or request error
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (store.getState()) {
      const {app} = store.getState();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.headers.Authorization = `Bearer ${app.token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// user axios interceptors for change response and error as we want
axiosInstance.interceptors.response.use(
  response => {
    const dataResponse:DataResponse = {
      status: response.status,
      meta: response.data.meta,
      data: response.data.data !== undefined ? response.data.data : null,
      pagination:
        response.data.pagination !== undefined
          ? response.data.pagination
          : null,
    };
    console.log('Response :: ', dataResponse);
    return Promise.resolve(dataResponse as any);
  },
  error => {
    const errorResponse = {
      status:
        error.response !== undefined
          ? error.response.status
          : Constants.ResponseCode.INTERNAL_SERVER_ERROR,
      meta:
        error.response.data.meta !== undefined
          ? error.response.data.meta
          : undefined,
      data:
        error.response.data.data !== undefined
          ? error.response.data.data
          : undefined,
    };
    console.log('error :: ', errorResponse);
    switch (errorResponse.status) {
      case Constants.ResponseCode.NOT_FOUND:
        showToast(
          'Error',
          errorResponse.meta !== undefined
            ? errorResponse.meta.message
            : 'Sorry, Not Found',
          ToastType.ERROR,
        );
        break;
      case Constants.ResponseCode.BAD_GATEWAY:
        showToast(
          'Error',
          errorResponse.meta !== undefined
            ? errorResponse.meta.message
            : 'Something went wrong. Please try again.',
          ToastType.ERROR,
        );
        break;
      case Constants.ResponseCode.INTERNAL_SERVER_ERROR:
        showToast(
          'Error',
          errorResponse.meta !== undefined
            ? errorResponse.meta.message
            : 'Server Error. Please try again.',
          ToastType.ERROR,
        );
        break;
      case Constants.ResponseCode.TOKEN_INVALID:
        showToast(
          'Error',
          errorResponse.meta !== undefined
            ? errorResponse.meta.message
            : 'Server Error. Please try again.',
          ToastType.ERROR,
        );
        break;
    }
    return Promise.reject(errorResponse);
  },
);

export {axiosInstance};
