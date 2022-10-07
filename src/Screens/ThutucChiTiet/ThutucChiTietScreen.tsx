import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, ScrollView, Text, Modal } from "react-native";
import { Container } from "../../Components/Container";
import { Header } from "../../Components/Headers";
import { AppLoader } from "../../Components/Loaders";
import { MediumText, RegularText } from "../../Components/Texts";
import { useAppDispatch, useAppSelector } from "../../Hooks/RTKHooks";
import { HomeRouteProps } from "../../Navigators/Stack/HomeStack";
import { fileGetDetail } from "../../Store/FileSlice";
import Colors from "../../Themes/Colors";
import Layout from "../../Themes/Layout";
import { formatDateMonth } from "../../Utils/Common";
import { kSpacing, kTextSizes } from "../../Utils/Constants";
import { FileFields } from "../../Models/File";
import { rateCheckFile } from "../../Store/RateSlice";
import { handleAlert } from "../../Utils/Notification";
import { fileGetDataThuTucDetail, postThutuc, fileGetCodePattern, getNewCode, fileGetNation, fileGetNation_District, fileGetNation_Province, fileGetNation_Village } from '../../Store/DichvucongSlice';
import { Button } from '../../Components/Buttons';
// Constants
//Select dropdownlist
import SelectList from 'react-native-dropdown-select-list';

const ThutucChiTietScreen: React.FC = () => {
  const route: any = useRoute();
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);
  const { fileThutucDetail, dataCodePattern, newcode, nationid, nationdistrict, nationprovince, nationvillage } = useAppSelector((state) => state.dichvucong);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);
  // console.log("userData THỦ TUC CHI TIẾT", userData);
  //Xử lí select nation
  const [selectedNation, setSelectedNation] = React.useState("");
  const [selectedDistrict, setSelectedDistrict] = React.useState("");
  const [selectedProvince, setSelectedProvince] = React.useState("");
  const [selectedVillage, setSelectedVillage] = React.useState("");
  const [data, setData] = React.useState([]);
  let dataSelectNation = nationid && nationid.map((item: { id: any; name: any; }) => {
    return { key: item.id, value: item.name }
  })
  let dataSelectDistrict = nationdistrict && nationdistrict.map((item: { id: any; name: any; }) => {
    return { key: item.id, value: item.name }
  })
  let dataSelectProvince = nationprovince && nationprovince.map((item: { id: any; name: any; }) => {
    return { key: item.id, value: item.name }
  })
  let dataSelectVillage = nationvillage && nationvillage.map((item: { id: any; name: any; }) => {
    return { key: item.id, value: item.name }
  })
  // const dataSelectNation = nationid;
  //const dataSelectDistrict = nationdistrict;
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
  //Lay code Pattern
  const onGetPattern = async (): Promise<void> => {
    console.log('ifileThutucDetail', fileThutucDetail);
    try {
      setIsLoading(true);
      await dispatch(fileGetCodePattern({
        agencyId: fileThutucDetail?.agency[0].id,
        procedureId: fileThutucDetail?.id,
      })).unwrap();
      console.log('co chay voo dday')
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  //lay newcode
  const onNewcode = async (): Promise<void> => {
    console.log('ifileThutucDetail', fileThutucDetail);
    console.log('dataCodePattern', dataCodePattern);
    try {
      setIsLoading(true);
      await dispatch(getNewCode({
        codePattern: dataCodePattern,
        code: fileThutucDetail.code,
      })).unwrap();
      // console.log('co chay voo dday')
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //HÀM XỬ LÍ LẤY NATION_CODE ĐỊA DANH
  //fileGetNation
  const onGetNation = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await dispatch(fileGetNation({})).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log('Nationshow', nationid);
  //ongetnationdistrict
  const onGetNationDistrict = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await dispatch(fileGetNation_District({ nationId: nationid && nationid[0].id })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log('Nationdistrictshow', nationdistrict);
  //ongetnation province
  const onGetNationProvince = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await dispatch(fileGetNation_Province({ nationId: nationid && nationid[0].id, nationdistrictId: selectedDistrict })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  //ongetnation village
  const onGetNationVillage = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await dispatch(fileGetNation_Village({ nationId: nationid && nationid[0].id, nationprovinceId: selectedProvince })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log('onGetNationnationvillage', nationvillage);

  useEffect(() => {
    onGetDetail();
    onGetNation();
  }, []);

  useEffect(() => {
    if (fileThutucDetail !== null) {
      onGetPattern();
    }
  }, [fileThutucDetail]);
  useEffect(() => {
    if (dataCodePattern !== null) {
      onNewcode();
    }
  }, [dataCodePattern]);
  //lấy NATION dicstrict code
  useEffect(() => {
    if (nationid !== null) {
      onGetNationDistrict();
    }
  }, [nationid]);
  //lấy NATION province code
  useEffect(() => {
    if (nationid !== null && selectedDistrict !== null) {
      onGetNationProvince();
    }
  }, [nationid, selectedDistrict]);
  //lấy NATION village code
  useEffect(() => {
    if (nationid !== null && selectedDistrict !== null && selectedProvince !== null) {
      onGetNationVillage();
    }
  }, [nationid, selectedDistrict, selectedProvince]);


  //console.log("fileThutucDetail", fileThutucDetail);
  //console.log("newcode", newcode);
  // console.log("thutuc id", fileThutucDetail?.agency[0].id);
  // console.log("code id", fileThutucDetail?.code);



  const [textchuHoso, onChangeText1] = React.useState<string>("");
  const [textngaySinh, onChangeText2] = React.useState<string>("");
  const [texteMail, onChangeText3] = React.useState<string>("");
  const [textgioiTinh, onChangeText4] = React.useState<string>("");
  const [textSdt, onChangeText5] = React.useState<string>("");
  const [textNoiDungGiaiquyet, onChangeText6] = React.useState<string>("");
  const [textDiachi, onChangeText7] = React.useState<string>("");
  const [textQuocgia, onChangeText8] = React.useState<string>("");
  const [textTinh, onChangeText9] = React.useState<string>("");
  const [textQuanHuyen, onChangeText10] = React.useState<string>("");
  const [textPhuongxa, onChangeText11] = React.useState<string>("");
  const [textDiachichitiet, onChangeText12] = React.useState<string>("");

  // const [number, onChangeNumber] = React.useState<any>(null);
  console.log('text', textchuHoso);

  // const onShowPopup = () => {
  //   Alert.alert('Nhập vào những thông tin cần thiết của chủ hộ.')
  // }
  const navigateDinhKemThutuc = () => {
    navigation.navigate("DinhkemThutucScreen", {
      valueTenChuHoso: textchuHoso,
      valueNgaySinh: textngaySinh,
      valueEmail: texteMail,
      valueGioiTinh: textgioiTinh,
      valueSdt: textSdt,
      valueNoiDungGiaiquyet: textNoiDungGiaiquyet,
      valueDiachi: textDiachi,
      valueQuocgia: textQuocgia,
      valueTinh: textTinh,
      valueQuanHuyen: textQuanHuyen,
      valuePhuongxa: textPhuongxa,
      valueDiachichitiet: textDiachichitiet
    });
  }
  return (
    <ScrollView style={[Layout.fill]}>
      <View style={styles.container}>
        <Header name="Thông tin chi tiết thủ tục" />
        <View style={styles.bgThutucChitiet}>
          <View>
            <Text style={styles.titleCus}>Tên thủ tục : {fileThutucDetail && fileThutucDetail.name}</Text>
          </View>
          <View>
            <Text style={styles.titleCus}>Mã thủ tục : {fileThutucDetail && fileThutucDetail.nationCode}</Text>
          </View>
          <View>
            <Text style={styles.titleCus}>Đơn vị xử lí : <Text style={styles.titleCusRed}>{fileThutucDetail && fileThutucDetail?.agency[0].name}</Text></Text>
          </View>
          <View>
            <Text style={styles.titleCusMucdo}>{fileThutucDetail && fileThutucDetail.level.name}</Text>
          </View>
        </View>
        {/**FORM 1 */}
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Thông tin chủ hồ sơ :</Text>
          <TextInput
            style={styles.input}
            placeholder="Thông tin chủ hồ sơ"
            onChangeText={onChangeText1}
            value={textchuHoso}
          />
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Ngày tháng năm sinh :</Text>
          <TextInput
            style={styles.input}
            placeholder="Ngày tháng năm sinh"
            onChangeText={onChangeText2}
            value={textngaySinh}
          />
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Email :</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={onChangeText3}
            value={texteMail}
          />
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Giới tính :</Text>
          <TextInput
            style={styles.input}
            placeholder="Giới tính"
            onChangeText={onChangeText4}
            value={textgioiTinh}
          />
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Số điện thoại :</Text>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            onChangeText={onChangeText5}
            value={textSdt}
          />
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Nội dung yêu cầu giải quyết :</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText6}
            placeholder="Nội dung yêu cầu giải quyết"
            value={textNoiDungGiaiquyet}
          />
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Địa chỉ :</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText7}
            placeholder="Địa chỉ"
            value={textDiachi}
          />
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Quốc gia :</Text>
          <SelectList placeholder="Chọn Quốc Gia" setSelected={setSelectedNation} data={dataSelectNation && dataSelectNation} onSelect={() => console.log('selectedNation', selectedNation)} />
          {/* <TextInput
            style={styles.input}
            onChangeText={onChangeText8}
            placeholder="Quốc gia"
            value={textQuocgia}
          /> */}
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Tỉnh :</Text>
          <SelectList placeholder="Chọn Tỉnh thành" setSelected={setSelectedDistrict} data={dataSelectDistrict} onSelect={() => console.log('selectedDistrict', selectedDistrict)} />

          {/* <TextInput
            style={styles.input}
            onChangeText={onChangeText9}
            placeholder="Tỉnh"
            value={textTinh}
          /> */}
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Quận/Huyện :</Text>
          <SelectList placeholder="Chọn Quận huyện" setSelected={setSelectedProvince} data={dataSelectProvince} onSelect={() => console.log('selectedProvince', selectedProvince)} />
          {/* <TextInput
            style={styles.input}
            onChangeText={onChangeText10}
            placeholder="Quận/Huyện"
            value={textQuanHuyen}
          /> */}
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Phường/Xã :</Text>
          <SelectList placeholder="Chọn Phường/Xã" setSelected={setSelectedVillage} data={dataSelectVillage} onSelect={() => console.log('selectedVillage', selectedVillage)} />
          {/* <TextInput
            style={styles.input}
            onChangeText={onChangeText11}
            placeholder="Phường/Xã"
            value={textPhuongxa}
          /> */}
        </View>
        <View style={styles.fixInput}>
          <Text style={styles.textCusmargin}>Địa chỉ chi tiết :</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText12}
            placeholder="Địa chỉ chi tiết"
            value={textDiachichitiet}
          />
        </View>

        <View style={styles.bgCusBtn} >
          <TouchableOpacity style={styles.customBtn} onPress={() => navigateDinhKemThutuc()}>
            <MediumText style={styles.customBtnText}>Tiếp theo</MediumText>
          </TouchableOpacity>
        </View>

        {/* <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      /> */}


        {/**modal custom input */}
        {/* <View style={styles.fixInput}>
          <TouchableOpacity style={{ backgroundColor: "#bfc7c7", borderRadius: 10 }} onPress={() => {
            setIsVisible(true);
          }}>
            <Text style={styles.textCusmargin}>Nhập thông tin tờ khai đăng ký</Text>
          </TouchableOpacity>

        </View>
        <Modal transparent={true} visible={isVisible}>
          <View style={{ backgroundColor: "#000000aa" }}>
            <View
              style={{
                backgroundColor: "#ffffff",
                margin: 50,
                padding: 40,
                borderRadius: 10,
              }}
            >
              <View>
                <View >
                  <Text style={{ color: "#0066ff", fontWeight: '700' }}>GIẤY ĐỀ NGHỊ ĐĂNG KÝ HỘ KINH DOANH</Text>
                  <Text style={{ color: "#000", fontWeight: '700' }}>Kính gửi:  Phòng Tài chính - Kế hoạch</Text>
                </View>
                <View>
                  <Text style={{ color: "#000", fontWeight: '700' }}>Đăng ký hộ kinh doanh do tôi là chủ hộ : </Text>
                </View>
              </View>

              <View style={styles.fixInput}>
                <Text style={styles.textCusmargin}>Tên hộ kinh doanh :</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText6}
                  placeholder="Nhập tên chủ hộ kinh doanh"
                  value={textNoiDungGiaiquyet}
                />
              </View>
              <View style={styles.fixInput}>
                <Text style={styles.textCusmargin}>Địa chỉ trụ sở hộ kinh doanh :</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText6}
                  placeholder="Địa chỉ trụ sở hộ kinh doanh"
                  value={textNoiDungGiaiquyet}
                />
              </View>
              <View style={styles.fixInput}>
                <Text style={styles.textCusmargin}>Ngành nghề kinh doanh :</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText6}
                  placeholder="Ngành nghề kinh doanh"
                  value={textNoiDungGiaiquyet}
                />
              </View>
              <View style={styles.fixInput}>
                <Text style={styles.textCusmargin}>Vốn kinh doanh :</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText6}
                  placeholder="Vốn kinh doanh"
                  value={textNoiDungGiaiquyet}
                />
              </View>
              <View style={styles.fixInput}>
                <Text style={styles.textCusmargin}>Chủ thể thành lập hộ kinh doanh :</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText6}
                  placeholder="Chủ thể thành lập hộ kinh doanh"
                  value={textNoiDungGiaiquyet}
                />
              </View>
              <Button
                title="Xác nhận đồng ý"
                onPress={() => {
                  setIsVisible(false);
                }}
              />
            </View>
          </View>
        </Modal> */}
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderWidth: 0.5,
    borderColor: '#e0e0eb',
    paddingHorizontal: 10,
  },
  customBtn: {
    backgroundColor: "#2E5AAC",
    width: 200,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: '#fff',
    borderWidth: 1,
  },
  customBtnText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  bgCusBtn: {
    flex: 1,
    alignItems: 'center'
  },
  bgThutucChitiet: {
    marginBottom: 10,
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

export default ThutucChiTietScreen;
