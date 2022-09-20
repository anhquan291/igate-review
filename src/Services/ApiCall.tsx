import AsyncStorage from "@react-native-community/async-storage";
import axios, { AxiosResponse } from "axios";
import { Platform } from "react-native";
import { v4 as uuid } from "uuid";
import Config from "react-native-config";
const QueryString = require("query-string");

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
      ret[app] = "";
    }
  });
  return ret;
};
// Hàm dùng call GET
export const requestGet = async (
  endpoint: string,
  options?: {
    data?: Object;
    params?: Object;
    needToken?: boolean;
  },
) => {
  const token: any = await AsyncStorage.getItem("authToken");
  const auth = JSON.parse(token);
  const userToken = options?.needToken ? auth : null;

  const response = await axios.get(
    `https://apiquangngai.vnptigate.vn/${endpoint}`,
    {
      params: options?.params,
      headers: {
        "Content-Type": "application/json",
        ...(options?.needToken && { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJqazlObnpLTWVTeTF6Wk53RW1WMHVzY0FFcWFicTY4MGh5ZFpqY2Q0Wl9zIn0.eyJleHAiOjE2NjM3NzUyNDAsImlhdCI6MTY2MzY4ODg0MCwianRpIjoiMjRkNjljYTMtZDI2Mi00ZTYxLWJhYTItNjVkMWZhYWE3YmQ0IiwiaXNzIjoiaHR0cHM6Ly9zc29xdWFuZ25nYWkudm5wdGlnYXRlLnZuL2F1dGgvcmVhbG1zL2RpZ28iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZjpjMDk4ZmY5Zi1kYzllLTQyYjctOTE2Yy1kYjgxYTRiOGZkNzg6Kzg0OTQzMDg3NjU0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidGVzdC1wdWJsaWMiLCJzZXNzaW9uX3N0YXRlIjoiODNlNjEzZDctYTBmNS00NjZjLTliMWMtNDhkNzBmZWJkN2MwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3Nzb2hjbS52bnB0aWdhdGUudm4iLCJodHRwczovL3F1YW50cmloY20udm5wdGlnYXRlLnZuIiwiaHR0cHM6Ly9hcGloY20udm5wdGlnYXRlLnZuIiwiKiIsImh0dHBzOi8vdGFpa2hvYW5oY20udm5wdGlnYXRlLnZuIl0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJhY2NvdW50X2lkIjoiNjJhOTk4OWFkYjc1MTcxZWJhMjBkNTJhIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiQUNUSVZJVElfQURNSU4iLCJBQ1RJVklUSV9VU0VSIiwiQUNUSVZJVElfUFJPQ0VTUyJdfSwidXNlcl9pZCI6IjYyYTk5ODlhMjQ2NjYwMDg1NzU4MWMyZCIsIm5hbWUiOiJOZ3V54buFbiBLaW0gSG_DoG4iLCJncm91cHMiOlsicm9sZS9BQ1RJVklUSV9BRE1JTiIsInJvbGUvQUNUSVZJVElfVVNFUiIsInJvbGUvQUNUSVZJVElfUFJPQ0VTUyIsInRydW5ndGFtZGlldWhhbmgiXSwiZGVwbG95bWVudF9pZCI6IjYxNzdlYzg2YzdlMzRjMGM0NGYzZmJmNyIsInByZWZlcnJlZF91c2VybmFtZSI6Iis4NDk0MzA4NzY1NCIsImdpdmVuX25hbWUiOiJOZ3V54buFbiBLaW0gSG_DoG4ifQ.IhiifJI9_vCrwSGi-j3SYwpxVP7EanJCxT_DVlEQPBOvG2EN1gQRGHPcaHBH4KAsIitNfXoq4R44lTYn3V1nHlc3LpnZ3FIHU-LaoRKhBr1Un2YsNlSue_mSmUD_UFcqEvEZwoOqK7s8r-b2Nn_VWvpbgkgasGhfkNoBPbdUWJ6NnveVlmr6JYIvo0dVNe9VZeJ4ssHeHWIVhd1DnKqYHgdI-Fj_KICXMoJ7Q5bYhwaIn5CNgSYCvRF_1xTasQp7-eTTsnbbd6WbGNxxFhCYeU_93MFBLWSgFDdKk87KfMPAtOySJgDncOO5ZKcQJVk8JNVDIV9yQdKLxnGjL4D7LQ` }),
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
  const token: any = await AsyncStorage.getItem("authToken");
  const auth = JSON.parse(token);
  const userToken = options?.needToken ? auth : null;
  const data = options?.data;
  let header = {
    "content-type": options?.formData
      ? "multipart/form-data"
      : "application/json",
    ...(options?.needToken && { Authorization: `Bearer ${userToken}` }),
  };
  const response = await axios.post(
    `https://apiquangngai.vnptigate.vn/${endpoint}`,
    data,
    {
      params: options?.params,
      headers: {
        "Content-Type": "application/json",
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
  const token: any = await AsyncStorage.getItem("authToken");
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

  //Change ssotest --> ssoquangngai
  const response = await axios.post(
    `https://ssoquangngai.vnptigate.vn/auth/realms/digo/protocol/openid-connect/token`,
    QueryString.stringify(details),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
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
