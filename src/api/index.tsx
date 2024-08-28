import {APIRequest, METHOD_GET, METHOD_POST} from './api-request';
// export const API_LOGIN = 1;
type UrlParams = {[key: string]: string};

export const API_URL = {
  API_ALL_CATEGORIES: {
    id: 0,
    url: 'all-categories',
    type: METHOD_GET,
  },
};

export class RequestManager {
  doRequest = async (
    requestURLObject: {
      type: string;
      url: string;
      urlParam?: UrlParams;
      id: number;
    },
    param: any,
    onResponse: (response: any) => void,
    onError: (error: any) => void,
  ) => {
    // requestURLObject = Object.assign({}, requestURLObject);
    requestURLObject = {...requestURLObject};
    let queryParam = null;
    let url = null;
    const requestBuilder = new APIRequest.Builder();
    switch (requestURLObject.type) {
      case METHOD_GET: {
        requestBuilder.get();
        break;
      }
      case METHOD_POST: {
        requestBuilder.post();
        requestBuilder.jsonParams(param);
        break;
      }
      default: {
        break;
      }
    }
    url = requestURLObject.url;
    if (requestURLObject.urlParam) {
      queryParam = this.objectToQuerystring(requestURLObject.urlParam);
      url = `${url}${queryParam}`;
    }
    requestBuilder.setReqId(requestURLObject.id);
    requestBuilder.reqURL(url);
    if (onResponse) {
      requestBuilder.response(onResponse);
    }
    if (onError) {
      requestBuilder.error(onError);
    }
    await requestBuilder.build().doRequest();
  };

  objectToQuerystring = (obj: UrlParams) =>
    Object.keys(obj).reduce((str, key, i) => {
      var delimiter, val;
      delimiter = i === 0 ? '?' : '&';
      key = encodeURIComponent(key);
      val = encodeURIComponent(obj[key]);
      if (typeof obj[key] === 'undefined' || obj[key] == '') {
        // s   return (i === 0 && length > 1) ? '?' : '';
      }
      return [str, delimiter, key, '=', val].join('');
    }, '');
}
export {APIRequest};
