import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import Layout from "../../Themes/Layout";
import { Header } from "../../Components/Headers";
import { useAppSelector, useAppDispatch } from "../../Hooks/RTKHooks";
import { BoldText, MediumText, RegularText } from "../../Components/Texts";
import { kScaledSize, kSpacing, kTextSizes } from "../../Utils/Constants";
import Colors from "../../Themes/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  authGetToken,
  authGetTokenBackground,
  authLogout,
} from "../../Store/AuthSlice";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type Props = {
  navigation: any;
};

const UserScreen = (props: Props) => {
  const { userData, userCredential } = useAppSelector((state) => state.auth);
  const focus = useIsFocused();
  console.log("dữ liệu userData", userData, userCredential);
  const onNavigate = () => {
    // props.navigation.navigate("HomeScreen");
    props.navigation.navigate("RatingScreen");
    // console.log('-->', props.navigation.navigate);
  };
  const dispatch = useAppDispatch();
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
  };
  const onGetToken = async (): Promise<void> => {
    console.log("focus run");
    await dispatch(authGetTokenBackground(userCredential)).unwrap();
  };

  useEffect(() => {
    let interval: any;
    if (focus) {
      interval = setInterval(() => {
        onGetToken();
      }, 5 * 60 * 1000);
    }
    return () => clearInterval(interval);
  }, [focus]);

  return (
    <View style={[Layout.fill]}>
      {/* <Header
        name="THÔNG TIN CÁN BỘ"
        showBackButton={false}
        // logout
        // onLogout={onLogout}
      /> */}
      <ScrollView style={[Layout.fill]}>
        <View style={styles.titleWrapper}>
          <RegularText style={styles.title}>
            ĐỂ CẢI THIỆN CHẤT LƯỢNG PHỤC VỤ NGƯỜI DÂN, TỔ CHỨC NGÀY MỘT TỐT HƠN,
            XIN ÔNG/BÀ VUI LÒNG ĐÁNH GIÁ GIÚP QUÁ TRÌNH TIẾP NHẬN HỒ SƠ VÀ GIẢI
            QUYẾT TTHC CỦA ÔNG/BÀ.
          </RegularText>
        </View>
        <View style={[Layout.fill, styles.container]}>
          <View style={[styles.user, Layout.shadow]}>
            <View style={[styles.avatar, Layout.center]}>
              <FontAwesome name="user" size={kScaledSize(40)} />
            </View>
            <View style={styles.info}>
              <View style={[styles.detail]}>
                <RegularText>Người tiếp nhận hồ sơ và kết quả</RegularText>
                <MediumText>{userData.fullname}</MediumText>
              </View>
              {/**email */}
              <View style={[styles.detail]}>
                <RegularText>Email: </RegularText>
                <MediumText>
                  {/**check tránh lỗi email. */}
                  {userData.email.length > 0 ? userData.email[0].value : ""}
                </MediumText>
              </View>
              {userData.experience[0].primary && (
                <View style={[styles.detail]}>
                  <RegularText>Cơ quan: </RegularText>
                  <MediumText>
                    {userData.experience[0].agency.parent.name}
                  </MediumText>
                </View>
              )}
              <View style={[Layout.rowBetween]}>
                <MediumText>Đăng xuất</MediumText>
                <TouchableOpacity onPress={onLogout}>
                  <MaterialIcons name="logout" size={kScaledSize(25)} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.complete, Layout.center]}>
          <Icon
            name="checkmark-circle"
            size={kScaledSize(100)}
            color={"green"}
          />
          <BoldText
            style={[
              {
                color: Colors.primary,
                marginTop: kScaledSize(10),
                marginBottom: kScaledSize(10),
                textAlign: "center",
              },
            ]}
          >
            TRUNG TÂM PHỤC VỤ - KIỂM SOÁT THỦ TỤC HÀNH CHÍNH TỈNH QUẢNG NGÃI
          </BoldText>
          <BoldText style={{ textAlign: "center" }}>
            TRÂN TRỌNG CẢM ƠN ÔNG/BÀ ĐÃ DÀNH THỜI GIAN ĐÁNH GIÁ
          </BoldText>
          <TouchableOpacity
            onPress={onNavigate}
            style={[styles.result, { backgroundColor: Colors.primary }]}
          >
            <RegularText style={styles.textBold}>ĐÁNH GIÁ HỒ SƠ</RegularText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: kScaledSize(15),
    transform: [{ translateY: kScaledSize(-30) }],
  },
  user: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: kScaledSize(15),
    flexDirection: "row",
  },
  info: {
    flex: 1,
    marginLeft: kScaledSize(20),
  },
  titleWrapper: {
    paddingTop: kScaledSize(20),
    paddingBottom: kScaledSize(40),
    paddingHorizontal: kScaledSize(20),
    backgroundColor: Colors.primary,
  },
  title: {
    textAlign: "center",
    color: Colors.white,
  },
  textBold: {
    color: Colors.white,
    fontWeight: "bold",
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
    width: kScaledSize(75),
    backgroundColor: Colors.grey7,
    borderRadius: kScaledSize(5),
  },
  detail: {
    marginBottom: kScaledSize(10),
    borderBottomWidth: 1,
    paddingBottom: kScaledSize(5),
  },
  complete: {
    marginHorizontal: kScaledSize(30),
  },
});
