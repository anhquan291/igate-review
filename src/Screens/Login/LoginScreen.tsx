import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
// Components
import { Header } from "../../Components/Headers";
import { Button } from "../../Components/Buttons";
import { AppLoader } from "../../Components/Loaders";
// Reddux
import { useAppDispatch, useAppSelector } from "../../Hooks/RTKHooks";
import {
  authCheckLogin,
  authGetToken,
  authGetUserData,
} from "../../Store/AuthSlice";
// Form
import { useForm } from "react-hook-form";
// Theme
import Layout from "../../Themes/Layout";
import { CommonTextInput, PasswordTextInput } from "../../Components/Input";
import { kScaledSize, kSpacing } from "../../Utils/Constants";
import { ScrollContainer } from "../../Components/Container";
import jwtDecode from "jwt-decode";

const LoginScreen: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const onGetToken = async (data: any): Promise<void> => {
    const { username, password } = data;
    const details = {
      client_id: "web-onegate",
      grant_type: "password",
      scope: "openid",
      username,
      password,
    };
    const userInfo = await dispatch(authGetToken(details)).unwrap();
    let decoded: any = jwtDecode(userInfo.res.access_token);
    await dispatch(authGetUserData(decoded.user_id)).unwrap();
  };

  useEffect(() => {
    dispatch(authCheckLogin());
  }, []);

  return (
    <View style={[Layout.fill]}>
      <Header name="iGate Review" showBackButton={false} />
      {isLoading && <AppLoader />}
      <ScrollContainer contentStyle={styles.container}>
        <View style={Layout.center}>
          <Image
            source={require("../../Assets/Images/logo.png")}
            style={styles.logo}
          />
        </View>
        <CommonTextInput
          controller={{
            name: "username",
            control: control,
            rules: {
              required: {
                value: true,
                message: "Không được bỏ trống",
              },
              validate: (value) => value.length >= 6 || "Tối thiểu 6 ký tự",
            },
          }}
          errorText={errors?.username?.message}
          placeholder={"Tên đăng nhập"}
          inputProps={{
            autoCapitalize: "none",
          }}
        />
        <PasswordTextInput
          controller={{
            name: "password",
            control: control,
            rules: {
              required: {
                value: true,
                message: "Không được bỏ trống",
              },
              validate: (value) => value.length >= 6 || "Tối thiểu 6 ký tự",
            },
          }}
          errorText={errors?.password?.message}
          placeholder={"Mật khẩu"}
        />
        <Button title="Đăng nhập" onPress={handleSubmit(onGetToken)} />
      </ScrollContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: kSpacing.kSpacing15,
  },
  logo: {
    width: kScaledSize(200),
    height: kScaledSize(150),
    resizeMode: "contain",
  },
});

export default LoginScreen;
