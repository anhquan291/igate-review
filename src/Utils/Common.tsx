import { Dimensions, Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import dayjs from "dayjs";
import moment from "moment";
import jwtDecode from "jwt-decode";

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_ZOOM_WIDTH = 320;
const IP12_ZOOM_HEIGHT = 693;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

export const hasNotch = (): boolean => {
  if (Platform.OS !== "ios" || Platform.isPad || Platform.isTVOS) {
    return false;
  }
  const { width, height } = Dimensions.get("window");
  if (
    (width === X_WIDTH && height === X_HEIGHT) ||
    (width === XSMAX_WIDTH && height === XSMAX_HEIGHT) ||
    (width === IP12_ZOOM_WIDTH && height === IP12_ZOOM_HEIGHT) ||
    (width === IP12_WIDTH && height === IP12_HEIGHT) ||
    (width === IP12MAX_WIDTH && height === IP12MAX_HEIGHT)
  ) {
    return true;
  }
  return false;
};

export const saveToStorage = async (
  key: string,
  value: string,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const removeFromStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const formatDateMonth = (date: any) =>
  moment(date).format("DD/MM/YYYY HH:MM");
export const formatDate = (date: any) => moment(date).format("DD/MM/YYYY");
export const checkTokenExpired = (token: string) => {
  let decoded: any = jwtDecode(token);
  if (Date.now() / 1000 > decoded.exp) {
    return true;
  } else {
    return false;
  }
};
