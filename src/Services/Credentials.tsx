import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

interface Key {
  access: string;
  refresh: string;
}
interface Decode {
  exp: number;
}

const setCredentials = async (keys: Key) => {
  try {
    await AsyncStorage.setItem('keys', JSON.stringify(keys));
  } catch (e) {
    console.log(e);
  }
};

async function getAccessUsingRefresh(refreshToken: string) {
  const response = await axios.request({
    baseURL: 'https://reqres.in/api/',
    url: 'refresh',
    data: {
      refreshToken,
    },
    timeout: 5000,
  });
  const { data }: any = response;
  const tokenResponse = {
    access: data.token,
    refresh: data.refreshToken,
  };
  return setCredentials(tokenResponse);
}

async function getVerifiedKeys(keys: Key) {
  console.log('Loading keys from storage');

  if (keys) {
    console.log('checking access');

    if (!isTokenExpired(keys.access)) {
      console.log('returning access');

      return keys;
    } else {
      console.log('access expired');

      console.log('checking refresh expiry');

      if (!isTokenExpired(keys.refresh)) {
        console.log('fetching access using refresh');

        const response = await getAccessUsingRefresh(keys.refresh);

        await AsyncStorage.setItem('keys', JSON.stringify(response));

        console.log('UPDATED ONE');

        return response;
      } else {
        console.log('refresh expired, please login');

        return null;
      }
    }
  } else {
    console.log('access not available please login');

    return null;
  }
}

function isTokenExpired(token: string) {
  let decoded: Decode = jwt_decode(token);
  if (decoded.exp < new Date().getTime() / 1000) {
    return true;
  } else {
    return false;
  }
}

export const getCredentials = async () => {
  try {
    let credentials = await AsyncStorage.getItem('keys');
    let cred = await getVerifiedKeys(JSON.parse(credentials || '{}'));

    if (credentials != null && cred != null) {
      return cred;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};
