import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Layout from "../../Themes/Layout";
import { Header } from "../../Components/Headers";
import { useAppSelector } from "../../Hooks/RTKHooks";
import { MediumText, RegularText } from "../../Components/Texts";
import { kScaledSize, kSpacing, kTextSizes } from "../../Utils/Constants";
import Colors from "../../Themes/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = {
  navigation: any;
};

const UserScreen = (props: Props) => {
  const { userData } = useAppSelector((state) => state.auth);
  console.log(userData);
  const onNavigate = () => {
    props.navigation.navigate("HomeScreen");
  };
  return (
    <View style={[Layout.fill]}>
      <Header name="Thông tin" showBackButton={false} />
      <View style={[Layout.fill, styles.container]}>
        <View>
          <View style={[styles.avatar, Layout.center]}>
            <FontAwesome name="user" size={kScaledSize(40)} />
          </View>
          <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
            <RegularText style={{ color: Colors.grey6 }}>Họ tên: </RegularText>
            <MediumText style={styles.textLeft}>{userData.name}</MediumText>
          </View>
          <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
            <RegularText style={{ color: Colors.grey6 }}>Email: </RegularText>
            <MediumText style={styles.textLeft}>
              {userData.preferred_username}
            </MediumText>
          </View>
        </View>
        <TouchableOpacity
          onPress={onNavigate}
          style={[styles.result, { backgroundColor: Colors.primary }]}
        >
          <RegularText style={Layout.whiteText}>Đánh giá hồ sơ</RegularText>
        </TouchableOpacity>
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
    paddingVertical: kSpacing.kSpacing5,
    paddingHorizontal: kSpacing.kSpacing10,
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
