import APIMethod from '../models/enum/APIMethod';
import APIRequest from '../models/interfaces/api/APIRequest';
import APIResponse from '../models/interfaces/api/APIResponse';
import SharedPreference from '../storage/SharedPreference';
import {store} from '../store/Store';
import ENV from './Env';

const requiredHeaders: {[key: string]: any} = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
};

class AuthApi {
  private constructor() {}

  static makeRequest = async <T,>({
    url,
    abort = null,
    method,
    headers,
    body,
  }: APIRequest): Promise<APIResponse<T> | undefined> => {
    try {
      let jsonString = await SharedPreference.shared.getItem('userDetails');
      let apiURL = `${ENV.BASE_URL}${url}`;
      let apiHeaders = {...headers, ...requiredHeaders};
      if (jsonString) {
        let userInfo = JSON.parse(jsonString);
        apiHeaders['token'] = userInfo.accessToken;
      }
      let apiBody =
        method === APIMethod.post ? JSON.stringify(body ?? {}) : null;

      const response = await fetch(apiURL, {
        method: method,
        headers: apiHeaders,
        body: apiBody,
        signal: abort?.signal,
      });
      this.printRequest({url, method, headers, body}, response);

      // if (response.status === 404 && params.url !== Constants.API.Logout) {
      //   store.dispatch(clearData());
      // }
      if (!response.ok) {
        const errorResData = await response.json();
        const error = errorResData.error;
        const message =
          errorResData.message?.length > 0 ? errorResData.message : error;
        if (message === 'Invalid access token') {
          // console.log('Auto Logout');
          //store.dispatch(clearData());
        }
        throw new Error(message);
      }
      const resData = (await response.json()) as APIResponse<T>;
      return resData;
    } catch (e) {
      const error = e as Error;
      let isCancelled = error.message === 'Aborted';
      if (!isCancelled) {
        throw error;
      }
    }
  };

  static printRequest(request: APIRequest, response: Response) {
    console.log('*****************************************************');
    console.log('URL: ', request.url);
    console.log('Method: ', request.method);
    console.log('Headers: ', request.headers);
    console.log('Body: ', request.body);
    console.log('Status Code: ', response?.status);
    console.log('*****************************************************');
  }
}

export default AuthApi;
