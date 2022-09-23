import { StyleSheet, Button, SafeAreaView, TouchableOpacity, TextInput, View, Alert, ImageBackground, Image, Text, TouchableHighlight } from "react-native";
// import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Layout from "../../Themes/Layout";
import { useAppDispatch, useAppSelector } from "../../Hooks/RTKHooks";
import { MediumText, RegularText } from "../../Components/Texts";
import { kScaledSize, kSpacing, kTextSizes } from "../../Utils/Constants";
import Colors from "../../Themes/Colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fileGetDataTracuu } from '../../Store/TracuuSlice';
type Props = {
  navigation: any;
};



const TracuuScreen: React.FC = () => {
  const route: any = useRoute();
  const [textTracuu, onChangeText] = React.useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [number, onChangeNumber] = React.useState(null);
  // const { datatracuu } = useAppSelector((state) => state.tracuu);
  const dispatch = useAppDispatch();
  const { datatracuu } = useAppSelector((state) => state.dichvucong);
  // const id: string = route.params.id;
  const onGetTracuu = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await dispatch(fileGetDataTracuu({ code: textTracuu })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log('tra cuu', textTracuu)
  console.log('@@@', datatracuu)
  return (
    <View style={styles.customInforScreen}>

      <View style={styles.customInforScreen}>
        <ImageBackground resizeMode='cover' source={require('../../Assets/Images/trongdongv2.png')} style={styles.bgImage}>
          <View style={[Layout.fill, styles.container]}>
            <View style={styles.category}>
              <MediumText style={styles.textcenter}>TRA CỨU HỒ SƠ</MediumText>
            </View>
            <View style={styles.searchInput}>
              <TextInput
                style={styles.input}
                placeholder="Nhập mã hồ sơ"
                onChangeText={onChangeText}
                value={textTracuu}
              />
            </View>
            {/**Search */}
            <View style={styles.customSearch}>
              <View style={styles.bgSeachBtn}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  // onPress={onLogout}
                  style={styles.customLogout}
                >
                  {/* <MediumText style={styles.appButtonText}>
                  <MaterialCommunityIcons style={styles.iconSearch} name="file-search" size={20} />
                </MediumText> */}
                  <Button color="#fff" onPress={onGetTracuu} title="Tra cứu" />
                </TouchableOpacity>
              </View>
              <View style={styles.textreSearch}>
                {datatracuu &&
                  <View style={styles.cusSearch}>
                    <View><Text >Tên người nộp : {datatracuu.content.map((thutuc: any) =>
                      <Text>{thutuc.applicant.data.ownerFullname}</Text>
                    )}</Text></View>
                    <Text>Trạng thái hồ sơ : {datatracuu.content.map((thutuc: any) =>
                      <Text>{thutuc.dossierStatus.name}</Text>
                    )}</Text>
                  </View>
                }
              </View>
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
  cusSearch: {

  },
  textreSearch: {

  },
  nameCus: {
    color: '#a3def7',
    fontWeight: '700'
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
  bgSeachBtn: {
    flex: 1,
    alignSelf: "center",
    marginBottom: 90,
  },
  customSearch: {
    // flex: 1,
    // alignSelf: "center",
  },
  customLogout: {
    backgroundColor: "#2E5AAC",
    width: 200,
    height: 60,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 25,
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
