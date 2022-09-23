import { StyleSheet, TouchableOpacity, View, Alert, ImageBackground, Image, Text, TouchableHighlight } from "react-native";
import React from "react";
import Layout from "../../Themes/Layout";
import { Header } from "../../Components/Headers";
import { useAppSelector, useAppDispatch } from "../../Hooks/RTKHooks";
import { MediumText, RegularText } from "../../Components/Texts";
import { kScaledSize, kSpacing, kTextSizes } from "../../Utils/Constants";
import Colors from "../../Themes/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { authLogout } from "../../Store/AuthSlice";

type Props = {
  navigation: any;
};
const dispatch = useAppDispatch();

const ThongtinScreen = (props: Props) => {
  const { userData } = useAppSelector((state) => state.auth);
  console.log("userData1", userData);
  const onLogout = (): void => {
    Alert.alert("Thông báo", "Bạn có muốn đăng xuất không?", [
      {
        text: "Đồng ý",
        onPress: () => dispatch(authLogout()),
      },
      {
        text: "Huỷ",
      },
    ]);
    console.log('-> có click vào đây')
  };
  return (
    <View style={styles.customInforScreen}>
      <ImageBackground resizeMode='cover' source={require('../../Assets/Images/trongdongv2.png')} style={styles.bgImage}>
        <View style={[Layout.fill, styles.container]}>
          <View style={styles.category}>
            <MediumText style={styles.textcenter}>QUẢN LÝ THÔNG TIN</MediumText>
          </View>
          <View style={styles.category}>
            <MediumText style={styles.textCustom}>Mã số định danh</MediumText>
          </View>
          <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
            <MediumText style={styles.textCustom}>Tên CD/DN: </MediumText>
            <MediumText style={styles.textLeft}>{userData?.fullname}</MediumText>
          </View>
          <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
            <MediumText style={styles.textCustom}>Email: </MediumText>
            <MediumText style={styles.textLeft}>
              {userData && userData.email[0]?.value}
            </MediumText>
          </View>
          <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
            <MediumText style={styles.textCustom}>CCCD/Mã số DN: </MediumText>
            <MediumText style={styles.textLeft}>
              {userData && userData?.identity.number}
            </MediumText>
          </View>
          <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
            <MediumText style={styles.textCustom}>Cấp tại: </MediumText>
            <MediumText style={styles.textLeft}>
              {userData && userData.identity.agency?.name}
            </MediumText>
          </View>
          <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
            <MediumText style={styles.textCustom}>SĐT : </MediumText>
            <MediumText style={styles.textLeft}>
              {userData && userData.account.username[0].value}      </MediumText>
          </View>
          <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
            <MediumText style={styles.textCustom}>Địa chỉ : </MediumText>
            <MediumText style={styles.textLeft}>
              {userData && userData.address && userData.address[0].address ? userData.address[0].address : ''}
            </MediumText>
          </View>
        </View>
        <View style={[Layout.fill, styles.container]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onLogout}
            style={styles.customLogout}
          >
            <MediumText style={styles.appButtonText}>
              Đăng Xuất
      </MediumText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ThongtinScreen;

const styles = StyleSheet.create({
  customInforScreen: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#a3def7'
  },
  bgImage: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  category: {
    marginBottom: kScaledSize(20),
  },
  category2: {

  },
  customLogout: {
    backgroundColor: "#2E5AAC",
    width: 120,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: '#fff',
    borderWidth: 1,
  },
  appButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  textcenter: {
    fontWeight: '700',
    textAlign: "center",
    color: '#2E5AAC',
    fontSize: 22,
  },
  container: {
    marginTop: kScaledSize(20),
    marginHorizontal: kSpacing.kSpacing10,
  },
  textCustom: {
    color: '#2E5AAC',
  },
  textLeft: {
    fontWeight: '700',
    textAlign: "right",
    flex: 1,
    marginLeft: kSpacing.kSpacing10,
    color: '#2E5AAC',
  },
  result: {
    marginTop: kScaledSize(30),
    alignSelf: "center",
    paddingVertical: kSpacing.kSpacing10,
    paddingHorizontal: kSpacing.kSpacing20,
    borderRadius: 5,
  },
  avatar: {
    height: kScaledSize(80),
    width: kScaledSize(80),
    backgroundColor: Colors.grey7,
    marginBottom: kScaledSize(30),
    borderRadius: kScaledSize(40),
    alignSelf: "center",
  },
});
