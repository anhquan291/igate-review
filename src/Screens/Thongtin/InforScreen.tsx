import { StyleSheet, TouchableOpacity, View, Alert, Text } from "react-native";
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

const ThongtinScreen = () => {
  return (
    <View style={[Layout.fill]}>

      <View style={[Layout.fill, styles.container]}>
        <View style={styles.category}>
          <MediumText style={styles.textcenter}>QUẢN LÝ THÔNG TIN</MediumText>
        </View>
        <View style={styles.category}>
          <MediumText style={styles.category2}>Mã số định danh</MediumText>
        </View>
        <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
          <MediumText style={{ color: Colors.black }}>Tên CD/DN: </MediumText>
          <MediumText style={styles.textLeft}>DOANH NGHIỆP ABC</MediumText>
        </View>
        <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
          <MediumText style={{ color: Colors.black }}>Email: </MediumText>
          <MediumText style={styles.textLeft}>
            test@gmail.com
          </MediumText>
        </View>
        <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
          <MediumText style={{ color: Colors.black }}>Ngày sinh/Ngày thành lập: </MediumText>
          <MediumText style={styles.textLeft}>
            22/09/2022
          </MediumText>
        </View>
        <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
          <MediumText style={{ color: Colors.black }}>CCCD/Mã số DN: </MediumText>
          <MediumText style={styles.textLeft}>
            222111333444
          </MediumText>
        </View>
        <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
          <MediumText style={{ color: Colors.black }}>SĐT/Địa chỉ: </MediumText>
          <MediumText style={styles.textLeft}>

          </MediumText>
        </View>
      </View>
      {/**Thủ tục hành chính đã thực hiện */}
      <View style={[Layout.fill, styles.container]}>
        <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
          {/* <MediumText style={{ color: Colors.black }}>SĐT/Địa chỉ: </MediumText> */}
          <MediumText>
            *Thủ tục hành chính đã thực hiện
          </MediumText>
        </View>
        <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
          {/* <MediumText style={{ color: Colors.black }}>SĐT/Địa chỉ: </MediumText> */}
          <MediumText>
            *Thủ tục hành chính đã thanh toán trực tuyến
          </MediumText>
        </View>
      </View>
    </View>
  );
};

export default ThongtinScreen;

const styles = StyleSheet.create({
  category: {
    marginBottom: kScaledSize(20),
  },
  category2: {

  },
  textcenter: {
    textAlign: "center",
  },
  container: {
    marginTop: kScaledSize(20),
    marginHorizontal: kSpacing.kSpacing10,
  },
  textLeft: {
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
