import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Alert, Text, Modal, ScrollView } from "react-native";
import Layout from "../../Themes/Layout";
import { Header } from "../../Components/Headers";
import { useAppDispatch, useAppSelector } from "../../Hooks/RTKHooks";
import Colors from "../../Themes/Colors";
import { kSpacing, kTextSizes } from "../../Utils/Constants";
import { fileGetDataThuTucDetail, postThutuc, fileGetCodePattern, getNewCode } from '../../Store/DichvucongSlice';
import { Button } from '../../Components/Buttons';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
// Constants

const MotaThuTucScreen: React.FC = () => {
  const route: any = useRoute();
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { fileThutucDetail } = useAppSelector((state) => state.dichvucong);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);
  // console.log("userData THỦ TUC CHI TIẾT", userData);
  //truyền id tu man full qua
  const id: string = route.params.id;
  const onGetDetail = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await dispatch(fileGetDataThuTucDetail({ id })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    onGetDetail();
  }, []);
  // const source = {
  //   html: `
  // <p style='text-align:center;'>
  //   Hello World!
  // </p>`
  // };

  //Trình tự
  const sourceTrinhtu = {
    html: `${fileThutucDetail && fileThutucDetail.steps}`
  }
  //Linh vuc
  const sourceLinhvuc = {
    html: `${fileThutucDetail && fileThutucDetail.name}`
  }
  //Thành phần hồ sơ
  const sourceThanhPhan = {
    html: `${fileThutucDetail && fileThutucDetail.agencyAccept}`
  }
  //Yêu cầu điều kiện
  const sourceYeucauDieukien = {
    html: `${fileThutucDetail && fileThutucDetail.requirement}`
  }
  //Thời gian xử lí
  const sourceThoigianxuli = {
    html: `${fileThutucDetail && fileThutucDetail.processingTime}`
  }
  //Phí dịch vụ
  const sourcePhidv = {
    html: `${fileThutucDetail && fileThutucDetail.serviceFee}`
  }
  console.log('@@ test 123 ok ok', fileThutucDetail);
  const { width } = useWindowDimensions();
  const navigateThuTucDetail = () => {
    navigation.navigate("ThutucChiTietScreen", { id });
    console.log('idssss', id)
  }
  return (
    <ScrollView style={[Layout.fill]}>
      <View style={styles.container}>
        <Header name="Mô tả thủ tục" />
        <View>
          {/* <Text style={styles.titleCus}>Mô tả thủ tục {fileThutucDetail.dossierComponent}</Text> */}
        </View>
        {/**Trình tự thực hiện */}
        <View style={styles.bgItem}>
          <Text style={styles.titleBlack}>Trình tự thực hiện :</Text>
          <RenderHtml
            contentWidth={width}
            source={sourceTrinhtu}
          />
        </View>
        {/**Lĩnh vực */}
        <View style={styles.bgItem}>
          <Text style={styles.titleBlack}>Lĩnh vực :</Text>
          <RenderHtml
            contentWidth={width}
            source={sourceLinhvuc}
          />
        </View>
        {/**ThanhPhan */}
        <View style={styles.bgItem}>
          <Text style={styles.titleBlack}>Thành Phần hồ sơ :</Text>
          <RenderHtml
            contentWidth={width}
            source={sourceThanhPhan}
          />
        </View>
        {/**Yêu cầu điều kiện */}
        <View style={styles.bgItem}>
          <Text style={styles.titleBlack}>Yêu cầu điều kiện :</Text>
          <RenderHtml
            contentWidth={width}
            source={sourceYeucauDieukien}
          />
        </View>
        {/**Thời gian xử lí*/}
        <View style={styles.bgItem}>
          <Text style={styles.titleBlack}>Thời gian xử lí :</Text>
          <RenderHtml
            contentWidth={width}
            source={sourceThoigianxuli}
          />
        </View>
        {/**Phí dịch vụ*/}
        <View style={styles.bgItem}>
          <Text style={styles.titleBlack}>Phí dịch vụ :</Text>
          <RenderHtml
            contentWidth={width}
            source={sourcePhidv}
          />
        </View>
        <View style={styles.bgCusBtn} >
          <TouchableOpacity style={styles.customBtn} onPress={() => navigateThuTucDetail()}>
            <Text style={styles.customBtnText}>Nộp hồ sơ trực tuyến</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    width: 100,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#e0e0eb',
    paddingHorizontal: 10,
    // width: 300,
  },
  bgCusBtn: {
    flex: 1,
    alignItems: 'center'
  },
  customBtn: {
    backgroundColor: "#2E5AAC",
    width: 200,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: '#fff',
    borderWidth: 1,
    // flex: 1,
  },
  customBtnText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  bgItem: {
    marginBottom: 10,
  },
  titleBlack: {
    color: '#000',
    fontWeight: '700'
  },
  titleCus: {
    color: '#0000ff',
    fontWeight: '700'
  },
  titleCusRed: {
    color: '#ff0000',
    fontWeight: '700'
  },
  titleCusMucdo: {
    color: '#ff0000',
    fontWeight: '700'
  },
  fixInput: {
    marginBottom: 15,
  },
  textCusmargin: {
    marginBottom: 8,
    color: '#0066ff',
    fontWeight: '700'
  },
  container: {
    marginTop: kSpacing.kSpacing15,
    marginHorizontal: kSpacing.kSpacing10,
  },
  result: {
    paddingVertical: kSpacing.kSpacing5,
    paddingHorizontal: kSpacing.kSpacing10,
    borderRadius: 5,
  },
  content: {
    marginTop: kSpacing.kSpacing15,
    paddingHorizontal: kSpacing.kSpacing15,
    paddingVertical: kSpacing.kSpacing15,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  text: {
    fontSize: kTextSizes.small,
  },
  fieldName: {
    fontSize: kTextSizes.small,
    color: Colors.grey6,
  },
  textLeft: {
    textAlign: "right",
    flex: 1,
    marginLeft: kSpacing.kSpacing10,
  },
  textCenter: {
    textAlign: "center",
    flex: 1,
    marginBottom: kSpacing.kSpacing10,
    color: '#0066ff'
  },
  detail: {
    paddingVertical: kSpacing.kSpacing15,
    borderBottomWidth: 0.5,
    borderColor: Colors.grey7,
  },
});

export default MotaThuTucScreen;
