/* eslint-disable @typescript-eslint/no-unsafe-call */
import {isNetworkConnected} from 'src/utils';
import {ResponseCode} from 'src/utils/Constants';
import {axiosInstance} from './api-instance';

export const METHOD_GET = 'get';
export const METHOD_POST = 'post';
export const METHOD_PUT = 'put';
export const REQ_JSON = 'json';
export const REQ_FORM_DATA = 'form-data';

interface APIResponse {
  status: number;
  meta: {
    message: string;
  };
}
interface FileObject {
  image: {
    path: string;
    mime?: string; // Optional property, adjust as needed
  };
  imageName?: string; // Optional property, adjust as needed
  param_pic?: string;
}

interface APIRequestParams {
  [key: string]: any;
}

export class APIRequest {
  onResponse(response: any, reqID: number) {
    throw new Error('Method not implemented.');
  }

  onError(error: any, reqID: number) {
    throw new Error('Method not implemented.');
  }

  method: string = '';

  url: string = '';

  params: APIRequestParams | null = null;

  reqType: string = REQ_JSON;

  config: any;

  reqID: number = 0;

  isLoading: boolean = false;

  async doRequest() {
    await isNetworkConnected().then((data: any) => {
      const isInternet = JSON.parse(data);
      if (isInternet) {
        switch (this.method) {
          case METHOD_GET:
            axiosInstance
              .get(this.url, {params: this.params})
              .then(response => this.onAPIResponse(response))
              .catch(error => this.onAPIError(error));
            break;
          case METHOD_PUT:
            axiosInstance
              .put(this.url, this.params)
              .then(response => this.onAPIResponse(response))
              .catch(error => this.onAPIError(error));
            break;
          case METHOD_POST:
          default:
            console.log('----------------', this.url);
            axiosInstance
              .post(this.url, this.params, this.config)
              .then(response => this.onAPIResponse(response))
              .catch(error => this.onAPIError(error));
            break;
        }
      } else {
        this.onAPIError({
          status: ResponseCode.NO_INTERNET,
          meta: {
            message: 'Internet connection not available.',
          },
        });
      }
    });
  }

  onAPIResponse = (response: any) => {
    console.log('response=', response);
    this.onResponse(response, this.reqID);
  };

  onAPIError = (error: any) => {
    console.log('error=', error);

    this.onError(error, this.reqID);
  };

  static Builder = class {
    axios: APIRequest;

    constructor() {
      this.axios = new APIRequest();
    }

    reqURL(url: string) {
      this.axios.url = url;
      return this;
    }

    post() {
      this.axios.method = METHOD_POST;
      return this;
    }

    get() {
      this.axios.method = METHOD_GET;
      return this;
    }

    put() {
      this.axios.method = METHOD_PUT;
      return this;
    }

    jsonParams(params: APIRequestParams) {
      this.axios.reqType = REQ_JSON;
      this.axios.params = params;
      return this;
    }

    params(key: string, value: any) {
      this.axios.reqType = REQ_FORM_DATA;
      if (this.axios.params === undefined || this.axios.params === null) {
        this.axios.params = new FormData();
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.axios.params.append(key, value);
      return this;
    }

    addFile(key: string, uri: string, type = 'image/jpeg', name = '') {
      this.axios.reqType = REQ_FORM_DATA;
      // this.config = {
      //     ...this.config,
      //     'Content-Type': 'multipart/form-data'
      // }
      if (this.axios.params === undefined || this.axios.params === null) {
        this.axios.params = new FormData();
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.axios.params.append(key, {
        uri,
        type,
        name,
      });
      return this;
    }

    addFilesWithParam(param: APIRequestParams, fileArray: FileObject[]) {
      this.axios.reqType = REQ_FORM_DATA;
      if (this.axios.params === undefined || this.axios.params === null) {
        this.axios.params = new FormData();
        for (const file of fileArray) {
          let {mime} = file.image;
          if (mime === undefined || mime === null || mime === '') {
            mime = 'image/jpeg';
          }
          let name = file.imageName;
          if (name === undefined || name === null) {
            name = '';
          }
          this.axios.params.append(file.param_pic, {
            uri: file.image.path,
            type: mime,
            name,
          });
        }
        const keys = Object.keys(param);
        for (const key of keys) {
          this.axios.params.append(key, param[key]);
        }
      }
      return this;
    }

    setReqId(reqID: number) {
      this.axios.reqID = reqID;
      return this;
    }

    setLoading(isLoading: boolean) {
      this.axios.isLoading = isLoading;
      return this;
    }

    response(onResponse: (response: any, reqID: number) => void) {
      this.axios.onResponse = onResponse;
      return this;
    }

    error(onError: (error: any, reqID: number) => void) {
      this.axios.onError = onError;
      return this;
    }

    build() {
      return this.axios;
    }
  };
}
