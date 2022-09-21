import { StyleSheet, SafeAreaView, TouchableOpacity, TextInput, View, Alert, ImageBackground, Image, Text, TouchableHighlight } from "react-native";
import React from "react";
import Layout from "../../Themes/Layout";
import { Header } from "../../Components/Headers";
import { useAppSelector, useAppDispatch } from "../../Hooks/RTKHooks";
import { MediumText, RegularText } from "../../Components/Texts";
import { kScaledSize, kSpacing, kTextSizes } from "../../Utils/Constants";
import Colors from "../../Themes/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { authLogout } from "../../Store/AuthSlice";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
type Props = {
  navigation: any;
};
const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("Nhập mã hồ sơ");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};


// export default UselessTextInput;

const TracuuScreen = () => {
  return (
    <View style={styles.customInforScreen}>

      <View style={styles.customInforScreen}>
        <ImageBackground resizeMode='cover' source={require('../../Assets/Images/trongdongv2.png')} style={styles.bgImage}>
          <View style={[Layout.fill, styles.container]}>
            <View style={styles.category}>
              <MediumText style={styles.textcenter}>TRA CỨU HỒ SƠ</MediumText>
            </View>
            <View style={styles.searchInput}>
              <UselessTextInput />
            </View>
            {/**Search */}
            <View style={styles.customSearch}>
              <TouchableOpacity
                activeOpacity={0.8}
                // onPress={onLogout}
                style={styles.customLogout}
              >
                <MediumText style={styles.appButtonText}>
                  <MaterialCommunityIcons style={styles.iconSearch} name="file-search" size={20} />
                  Tra cứu</MediumText>
              </TouchableOpacity>
            </View>

          </View>

          <View>

          </View>
        </ImageBackground>
      </View>

    </View>
  );
};

export default TracuuScreen;

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderColor: '#3496f7',
    // fontWeight: '700',
    // color: '#fff'
  },
  searchInput: {
    marginBottom: kScaledSize(10),
  },
  iconSearch: {
    paddingRight: kScaledSize(10),
  },
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
  customSearch: {
    flex: 1,
    alignSelf: "center",
  },
  customLogout: {
    backgroundColor: "#2E5AAC",
    width: 150,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: '#fff',
    borderWidth: 1,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
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
