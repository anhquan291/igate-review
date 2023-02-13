import AsyncStorage from '@react-native-community/async-storage';
import axios, { AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import { v4 as uuid } from 'uuid';
import Config from 'react-native-config';
const QueryString = require('query-string');

export const convertFromApiToApp = (
  result: any,
  mapping: Array<{
    api: string;
    app: string;
    defaultValue?: any;
  }>,
): Object => {
  let ret: any = {};
  mapping.forEach(({ api, app, defaultValue }) => {
    if (!(api in result)) {
      if (defaultValue !== undefined) {
        ret[app] = defaultValue;
      }
      return;
    }
    if (result[api] !== null) {
      ret[app] = result[api];
    } else {
      ret[app] = '';
    }
  });
  return ret;
};

export const requestGet = async (
  endpoint: string,
  options?: {
    data?: Object;
    params?: Object;
    needToken?: boolean;
  },
) => {
  const token: any = await AsyncStorage.getItem('authToken');
  const auth = JSON.parse(token);
  const userToken = options?.needToken ? auth : null;

  const response = await axios.get(
    `https://apiigate.quangngai.gov.vn/${endpoint}`,
    {
      params: options?.params,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.needToken && { Authorization: `Bearer ${userToken}` }),
      },
    },
  );

  // let header = {
  //   "content-type": "application/json",
  //   ...(options?.needToken && { Authorization: `Bearer ${userToken}` }),
  // };
  // const response: AxiosResponse = await axios.request({
  //   baseURL: Config.API_DATA,
  //   url: endpoint,
  //   method: "GET",
  //   data: options?.data,
  //   params: options?.params,
  //   timeout: 20000,
  //   headers: header,
  // });
  return response;
};

export const requestPost = async (
  endpoint: string,
  options?: {
    data?: any;
    params?: Object;
    needToken?: boolean;
    formData?: boolean;
  },
) => {
  const token: any = await AsyncStorage.getItem('authToken');
  const auth = JSON.parse(token);
  const userToken = options?.needToken ? auth : null;
  const data = options?.data;
  let header = {
    'content-type': options?.formData
      ? 'multipart/form-data'
      : 'application/json',
    ...(options?.needToken && { Authorization: `Bearer ${userToken}` }),
  };
  const response = await axios.post(
    `https://apiigate.quangngai.gov.vn/${endpoint}`,
    data,
    {
      params: options?.params,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.needToken && { Authorization: `Bearer ${userToken}` }),
      },
    },
  );

  // const response: AxiosResponse = await axios.request({
  //   baseURL: Config.API_DATA,
  //   url: endpoint,
  //   method: "POST",
  //   data: options?.formData ? formData : options?.data,
  //   params: options?.params,
  //   timeout: 20000,
  //   headers: header,
  // });
  return response;
};

export const requestPostXform = async (
  endpoint: string,
  options?: {
    data?: Object;
    params?: Object;
    needToken?: boolean;
  },
) => {
  const token: any = await AsyncStorage.getItem('authToken');
  const auth = JSON.parse(token);
  const userToken = options?.needToken ? auth : null;
  let formBody: any = [];
  const details: any = options?.data;
  // for (const property in details) {
  //   const encodedKey = encodeURIComponent(property);
  //   const encodedValue = encodeURIComponent(details[property]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");
  const response = await axios.post(
    `https://sso.quangngai.gov.vn/auth/realms/digo/protocol/openid-connect/token`,
    QueryString.stringify(details),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  // let header = {
  //   "Content-Type": "application/x-www-form-urlencoded",
  //   Accept: "application/json",
  //   ...(options?.needToken && { Authorization: `Bearer ${userToken}` }),
  // };
  // const response: AxiosResponse = await axios.request({
  //   baseURL: Config.API_URL,
  //   url: endpoint,
  //   method: "POST",
  //   data: formBody,
  //   params: options?.params,
  //   timeout: 20000,
  //   headers: header,
  // });
  return response;
};
