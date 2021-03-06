import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
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

const UserScreen = (props: Props) => {
  const { userData } = useAppSelector((state) => state.auth);
  console.log("userData", userData);
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
  return (
    <View style={[Layout.fill]}>
      <Header name="Thông tin" showBackButton={false} logout
        onLogout={onLogout} />
      <View style={[Layout.fill, styles.container]}>
        <View>
          <View style={[styles.avatar, Layout.center]}>
            <FontAwesome name="user" size={kScaledSize(40)} />
          </View>
          <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
            <RegularText style={{ color: Colors.grey6 }}>Họ tên: </RegularText>
            <MediumText style={styles.textLeft}>{userData.fullname}</MediumText>
          </View>
          <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
            <RegularText style={{ color: Colors.grey6 }}>Email: </RegularText>
            <MediumText style={styles.textLeft}>
              {userData.email[0].value}
            </MediumText>
          </View>
          {userData.experience[0].primary && (
            <View
              style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}
            >
              <RegularText style={{ color: Colors.grey6 }}>
                Cơ quan:{" "}
              </RegularText>
              <MediumText style={styles.textLeft}>
                {userData.experience[0].agency.parent.name}
              </MediumText>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={onNavigate}
          style={[styles.result, { backgroundColor: Colors.primary }]}
        >
          <RegularText style={Layout.whiteText}>Đánh giá hồ sơ</RegularText>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onLogout}
          style={[styles.result, { backgroundColor: Colors.primary }]} >
          <RegularText style={Layout.whiteText}>Đăng xuất</RegularText>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: kScaledSize(20),
    marginHorizontal: kSpacing.kSpacing10,
  },
  textLeft: {
    textAlign: "right",
    flex: 1,
    marginLeft: kSpacing.kSpacing10,
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
