import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Header } from "../../Components/Headers";
import { Button } from "../../Components/Buttons";
import { AppLoader } from "../../Components/Loaders";
import { useAppDispatch, useAppSelector } from "../../Hooks/RTKHooks";
import {
  authCheckLogin,
  authGetToken,
  authGetUserData,
} from "../../Store/AuthSlice";
import { useForm } from "react-hook-form";
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
    let decoded: any = jwtDecode(userInfo.access_token);
    await dispatch(authGetUserData(decoded.user_id)).unwrap();
  };

  useEffect(() => {
    dispatch(authCheckLogin());
  }, []);

  return (
    <View style={[Layout.fill]}>
      <Header name="TTPV-KSTTHC TỈNH QUẢNG NGÃI" showBackButton={false} />
      {isLoading && <AppLoader />}
      <ScrollContainer contentStyle={styles.container}>
        <View style={Layout.center}>
          <Image
            source={require("../../Assets/Images/logohcc.png")}
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

//WEBVIEW

// import React, { Component } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View, Button, Alert,
//   Modal, TouchableHighlight
// } from 'react-native';
// import { WebView } from 'react-native-webview';
// import uuid from "./uuid";
// import axios from "axios"

// class App extends Component {
//   constructor() {
//     super()
//     this.state = {
//       isVisble: false
//     }
//     this.WebView = null
//   }

//   getParameterByName = (name, url) => {
//     if (!url) return null;
//     name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
//     var regexS = "[\\?&]" + name + "=([^&#]*)";
//     var regex = new RegExp(regexS);
//     var results = regex.exec(url);
//     if (results == null)
//       return "";
//     else
//       return decodeURIComponent(results[1].replace(/\+/g, " "));
//   }

//   callbackLoginSSO = (code) => {
//     let url = "https://ssotest.vnptigate.vn/auth/realms/digo/protocol/openid-connect/token"
//     let redirect_uri = "https://dichvucong.quangngai.gov.vn/vi/"
//     let client_id = "web-padsvc"
//     this.AU_OAUTH2_TOKEN(url, code, redirect_uri, client_id).then((response) => {
//       if (response.access_token) {
//         let { access_token, id_token } = response
//         //Xử lý lưu id_token để logout cho lần sau
//         //("sso_id_token", id_token)
//         console.log(("sso_id_token", id_token))
//         console.log("AU_OAUTH2_TOKEN: " + access_token)
//         //alert("ACCESS_TOKEN: " + access_token)
//       }
//     })
//   }

//   AU_OAUTH2_TOKEN = async (url, code, redirect_uri, client_id) => {
//     console.log(url, code, redirect_uri, client_id)
//     let result = ""
//     var qs = require('qs');
//     var data = qs.stringify({
//       "grant_type": "authorization_code",
//       "code": code,
//       "redirect_uri": redirect_uri,
//       "client_id": client_id
//     });

//     await axios({
//       method: "POST",
//       url: url,
//       data,
//       headers: { 'content-type': 'application/x-www-form-urlencoded' },
//     }).then(response => {
//       if (response.status === 200) {
//         result = response.data
//       }
//     }).catch(async error => {
//       console.log("AU_OAUTH2_TOKEN ERROR: " + JSON.stringify(error))
//     })
//     return result;
//   }

//   render() {
//     let urlLogin = "https://ssotest.vnptigate.vn/auth/realms/digo/protocol/openid-connect/auth"
//     urlLogin += "?client_id=web-padsvc"
//     urlLogin += "&redirect_uri=https://dichvucongtest.vnptigate.vn/vi/businessregistration"
//     urlLogin += "&state=" + uuid()
//     urlLogin += "&response_mode=fragment"
//     urlLogin += "&response_type=code"
//     urlLogin += "&scope=openid"
//     urlLogin += "&nonce=" + uuid()
//     // console.log(urlLogin)

//     return (
//       <View>
//         <Modal
//           transparent={false}
//           animationType="slide"
//           visible={this.state.isVisble}
//           supportedOrientations={["landscape", "landscape-left", "landscape-right", "portrait", "portrait-upside-down"]}
//         >
//           <View style={{ flex: 1, backgroundColor: "#ccc" }}>
//             <SafeAreaView style={{ zIndex: 999, backgroundColor: Platform.OS === 'ios' ? "#000000" : "#000000", flex: 1 }}>
//               <Button danger
//                 style={{ position: "absolute", top: 0, left: 0, zIndex: 999, borderRadius: 0 }}
//                 onPress={() => { this.setState({ isVisble: false }) }}
//                 title="Close"
//               >
//                 <Text>&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;</Text>
//               </Button>
//               <WebView
//                 ref={ref => { this.WebView = ref }}
//                 style={{ flex: 1 }}
//                 source={{ uri: urlLogin }}
//                 javaScriptEnabled={true}
//                 domStorageEnabled={true}
//                 decelerationRate="normal"
//                 mixedContentMode="always"
//                 originWhitelist={["*"]}
//                 startInLoadingState={true}
//                 scalesPageToFit={true}
//                 bounces={false}
//                 onNavigationStateChange={(event) => {
//                   console.log("onNavigationStateChange: " + JSON.stringify(event))
//                   if (event.url) {
//                     let code = this.getParameterByName("code", event.url)
//                     if (code) {
//                       console.log("code", code)
//                       this.WebView.stopLoading()
//                       this.callbackLoginSSO(code)
//                       this.setState({ isVisble: false })
//                     }
//                   }
//                 }}
//               />
//             </SafeAreaView>
//           </View>
//         </Modal>
//         <TouchableHighlight
//           onPress={() => {
//             this.setState({ isVisble: true });
//           }}>
//           <Text>Show Modal</Text>
//         </TouchableHighlight>
//       </View>
//     )
//   }
// }


// export default App;