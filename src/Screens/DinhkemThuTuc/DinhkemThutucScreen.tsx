import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, ScrollView, Dimensions, Alert, Text, Modal } from "react-native";
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
import { fileGetDataThuTucDetail, postThutuc, fileGetNation, fileGetNation_District, fileGetCodePattern, fileGetEformId, getNewCode, uploadFile } from '../../Store/DichvucongSlice';
import { Button } from '../../Components/Buttons';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker'
// Constants
//PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';
//Import String file pdf
import DangkyKinhDoanhForm from '../../FormHtmlConvert/dangkykinhdoanh/dangkykinhdoanh';
import ChamdutKinhDoanhForm from '../../FormHtmlConvert/chamdutkinhdoanh/chamdutkinhdoanh';
import KhuyenmaiForm from '../../FormHtmlConvert/hoatdongkhuyenmai/khuyenmai';



const DinhkemThutucScreen: React.FC = () => {
  const route: any = useRoute();
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);
  const { fileThutucDetail, eformId, uploaddataresponse, nationid, nationdistrict, dataCodePattern, newcode } = useAppSelector((state) => state.dichvucong);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);
  console.log('User Id ', userData);
  const id: string = route.params.id;
  console.log('route.params', route.params);
  console.log('gias tri chi tiet nhap vao', route.params.valueTenChuHoso)
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
  //Lấy Id Eform
  //const procedureId = fileThutucDetail.id;
  const onGetEformId = async (): Promise<void> => {
    console.log('fileThutucDetailprocedure@@', fileThutucDetail.id);
    try {
      setIsLoading(true);
      await dispatch(fileGetEformId({ procedureId: fileThutucDetail.id })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log('.....eformId123', eformId);

  //KHOI TAO FORM PDF BIEU MAU và xử lí thông tin
  const [textTenNguoiDangky, onChangeText9] = React.useState<string>("");
  const FormDangKy = DangkyKinhDoanhForm;
  console.log('test textTenNguoiDangky', textTenNguoiDangky);
  // const newFormDangKyhaveInput = FormDangKy.replace('isNameTest', textTenNguoiDangky);
  const newFormDangKyhaveInput = FormDangKy.replace('isFullName', route.params.valueTenChuHoso).replace('isBirthday', route.params.valueNgaySinh).replace('isEmail', route.params.valueEmail);
  //Create PDF
  const createPDF = async () => {
    let options = {
      // html: '<h1>PDF TEST</h1>',
      // html: FormDangKy,
      html: newFormDangKyhaveInput,
      fileName: 'dangkykinhdoanh',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    //console.log(file.filePath);
    //alert(file.filePath);
    //truyền filepath ở local sang màn PDF
    navigation.navigate("PDFExample", { source: file.filePath })
  }
  //XEM FILE PDF vừa tạo
  const navigatelookatPDF = () => {
    // navigation.navigate("PDFExample", {})
  }



  // const onPostThutucTest = () => {
  //   console.log('có chạy vô on post');
  // }
  const onPostThutuc = async (): Promise<void> => {
    // xử lí dữ liệu trước khi Post lên
    console.log('uploaddataresponse', uploaddataresponse);
    try {
      setIsLoading(true);
      //DATA API LƯỢT BỎ
      const data = {
        "userId": userData.id,
        "appliciant":
        {
          "address": route.params.valueDiachi,//"1",
          "birthday": route.params.valueNgaySinh,//"1989-12-31T17:00:00.000+0000",
          "email": route.params.valueEmail,//"admin_test@gmail.com",
          "fullname": route.params.valueTenChuHoso,//"Qu\u1ea3n tr\u1ecb app",
          "gender": userData.gender,//1,
          "ownerFullname": route.params.valueTenChuHoso,
          "identityAgency":
          {
            "id": userData.identity.agency.id,//"000050000191c4e1bd300024",
            "name": userData.identity.agency.name//"Công an T\u1ec9nh Gia Lai"
          },
          "identityDate": userData.identity.date,//"2004-12-31T17:00:00.000+0000",
          "identityNumber": userData.identity.number,//"351442015",
          "nation":
          {
            "label": "Việt Nam",
            "value": "5f39f4a95224cf235e134c5c"
          },
          "district":
          {
            "label": "Tỉnh Quảng Ngãi",//"Huy\u1ec7n Phong \u0110i\u1ec1n",
            "value": "5def47c5f47614018c000051"//"5def47c5f47614018c001926"
          },
          "organization": "",
          "phoneNumber": userData.phoneNumber[0].value,//"+84900010508",
          "province":
          {
            "label": "Thành phố Quảng Ngãi",// TP qng
            "value": "5def47c5f47614018c001522"//id tp qng
          },
          "village":
          {
            "label": "Phường Lê Hồng Phong",//"Xã Giai Xuân",
            "value": "5def47c5f47614018c121010"//"5def47c5f47614018c131303"
          }
        },
        "paymentMethod": {
          "id": "5f7fca83b80e603d5300dcf4",// gắn cứng
          "name": "Trực tiếp"
        },
        "dossierFormFile":
          [{
            "idProcedureForm": "5def47c5f47614018c131303",
            "file":
              [
                {
                  "filename": uploaddataresponse && uploaddataresponse[0].filename,//"512x512bb.jpg",
                  "id": uploaddataresponse && uploaddataresponse[0].id,//"62e23d0aeaa3695e58271140",
                  "size": uploaddataresponse && uploaddataresponse[0].size//133781
                },
                {
                  "filename": uploaddataresponse && uploaddataresponse[1].filename,//"512x512bb.jpg",
                  "id": uploaddataresponse && uploaddataresponse[1].id,//"62e23d0aeaa3695e58271140",
                  "size": uploaddataresponse && uploaddataresponse[1].size//133781
                }
              ],
          }],
        //"procedureId": fileThutucDetail.id//"abcxyz"
        "procedureId": "6215fc5acfa6484e420b67d8"
      }

      console.log("DATA POSTLeNNN", data);
      await dispatch(postThutuc(data)).unwrap();
      handleAlert({
        message: "Cảm ơn bạn đã nộp hồ sơ trực tuyến thành công",
        onPress1: () => {
          navigation.goBack();
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetDetail();
    // onGetNation();
  }, []);
  useEffect(() => {
    if (fileThutucDetail !== null) {
      onGetEformId();
    }
  }, [fileThutucDetail]);


  // useEffect(() => {
  //   if (fileThutucDetail !== null) {
  //     onGetPattern();
  //   }
  // }, [fileThutucDetail]);
  // useEffect(() => {
  //   if (dataCodePattern !== null) {
  //     onNewcode();
  //   }
  // }, [dataCodePattern]);

  console.log("fileThutucDetail dinhkem", fileThutucDetail);
  // console.log("newcode", newcode);
  // console.log("thutuc id", fileThutucDetail?.agency[0].id);
  // console.log("code id", fileThutucDetail?.code);



  const [textchuHoso, onChangeText1] = React.useState<string>("");
  const [textngaySinh, onChangeText2] = React.useState<string>("");
  const [texteMail, onChangeText3] = React.useState<string>("");
  const [textgioiTinh, onChangeText4] = React.useState<string>("");
  const [textSdt, onChangeText5] = React.useState<string>("");
  const [textNoiDungGiaiquyet, onChangeText6] = React.useState<string>("");
  //state upload show va hien thi o frontend
  //bt thì state ở dạng any hoặc null ( đối với đính kèm 1 phần tử)
  //đây truyền vào array nên mặc định ban đầu là mảng rỗng.
  const [fileUploadShow, setfileUploadShow] = React.useState<any>([]);
  // const [fileUploadShow1, setfileUploadShow1] = React.useState<any>(null);
  console.log('text', textchuHoso);
  const documentUploadPicker = async () => {
    const file = await DocumentPicker.pickSingle();
    // await dispatch(uploadFile({ file: file, accountId: '632d7fbc94807e2c42b645f1' })).unwrap();
    const files = [...fileUploadShow, file]
    setfileUploadShow(files)
    console.log('file', file);
    console.log('files', files);
  }
  const onPostDinhkem = async () => {
    // await dispatch(uploadFile({ files: fileUploadShow, accountId: '632d7fbc94807e2c42b645f1' })).unwrap();
    await dispatch(uploadFile({ files: fileUploadShow, accountId: userData.id })).unwrap();
    console.log('dữ liệu return', uploaddataresponse);
  }

  return (
    <ScrollView style={[Layout.fill]}>
      <View style={styles.container}>
        <Header name="Đính kèm thông tin hồ sơ" />
        {/* <View style={styles.fixInput}>
          <TouchableOpacity style={{ backgroundColor: "#fc5a03", borderRadius: 10, padding: 5, alignSelf: 'center' }} onPress={() => {
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
        {/**Bản sao biên bản họp thành viên hộ gia đình về việc thành lập hộ kinh doanh trong trường hợp các thành viên hộ gia đình đăng ký hộ kinh doanh */}
        <View style={styles.backgroundItemAttach}>
          <View>
            <Text style={{ color: "#000", fontWeight: '700' }}>Bản sao biên bản họp thành viên hộ gia đình về việc thành lập hộ kinh doanh trong trường hợp các thành viên hộ gia đình đăng ký hộ kinh doanh: </Text>
          </View>
          <View>
            <TouchableOpacity style={{ backgroundColor: "#fc5a03", borderRadius: 10, padding: 5, alignSelf: 'center' }} onPress={documentUploadPicker}>
              <Text style={styles.textCusmargin}>Chọn tệp tin đính kèm </Text>
            </TouchableOpacity>
          </View>
          <View>
            <MediumText style={styles.nameFileDinhkem}>{fileUploadShow[0] && fileUploadShow[0].name}</MediumText>
          </View>
        </View>

        {/**Danh sách các cá nhân góp vốn thành lập hộ kinh doanh */}
        <View style={styles.backgroundItemAttach}>
          <View>
            <Text style={{ color: "#000", fontWeight: '700' }}>Danh sách các cá nhân góp vốn thành lập hộ kinh doanh (nếu có): </Text>
          </View>
          <View>
            <TouchableOpacity style={{ backgroundColor: "#fc5a03", borderRadius: 10, padding: 5, alignSelf: 'center' }} onPress={documentUploadPicker}>
              <Text style={styles.textCusmargin}>Chọn tệp tin đính kèm</Text>
            </TouchableOpacity>
          </View>
          <View>
            <MediumText style={styles.nameFileDinhkem}>{fileUploadShow[1] && fileUploadShow[1].name}</MediumText>
          </View>
        </View>

        {/**CMND/Căn Cước/Hộ Chiếu */}
        <View style={styles.backgroundItemAttach}>
          <View>
            <Text style={{ color: "#000", fontWeight: '700' }}>CMND/Căn Cước/Hộ Chiếu: </Text>
          </View>
          <View>
            <TouchableOpacity style={{ backgroundColor: "#fc5a03", borderRadius: 10, padding: 5, alignSelf: 'center' }} onPress={documentUploadPicker}>
              <Text style={styles.textCusmargin}>Chọn tệp tin đính kèm</Text>
            </TouchableOpacity>
          </View>
          <View>
            <MediumText style={styles.nameFileDinhkem}>{fileUploadShow[2] && fileUploadShow[2].name}</MediumText>
          </View>
        </View>

        {/**Bản sao văn bản ủy quyền của thành viên hộ gia đình cho một thành viên làm chủ hộ kinh doanh đối với trường hợp các thành viên hộ gia đình đăng ký hộ kinh doanh */}
        <View style={styles.backgroundItemAttach}>
          <View>
            <Text style={{ color: "#000", fontWeight: '700' }}>Bản sao văn bản ủy quyền của thành viên hộ gia đình cho một thành viên làm chủ hộ kinh doanh đối với trường hợp các thành viên hộ gia đình đăng ký hộ kinh doanh: </Text>
          </View>
          <View>
            <TouchableOpacity style={{ backgroundColor: "#fc5a03", borderRadius: 10, padding: 5, alignSelf: 'center' }} onPress={documentUploadPicker}>
              <Text style={styles.textCusmargin}>Chọn tệp tin đính kèm</Text>
            </TouchableOpacity>
          </View>
          <View>
            <MediumText style={styles.nameFileDinhkem}>{fileUploadShow[3] && fileUploadShow[3].name}</MediumText>
          </View>
        </View>

        {/**Biên bản họp nhóm cá nhân về việc thành lập hộ kinh doanh đối với trường hợp hộ kinh doanh do một nhóm cá nhân thành lập */}
        <View style={styles.backgroundItemAttach}>
          <View>
            <Text style={{ color: "#000", fontWeight: '700' }}>Biên bản họp nhóm cá nhân về việc thành lập hộ kinh doanh đối với trường hợp hộ kinh doanh do một nhóm cá nhân thành lập: </Text>
          </View>
          <View>
            <TouchableOpacity style={{ backgroundColor: "#fc5a03", borderRadius: 10, padding: 5, alignSelf: 'center' }} onPress={documentUploadPicker}>
              <Text style={styles.textCusmargin}>Chọn tệp tin đính kèm</Text>
            </TouchableOpacity>
          </View>
          <View>
            <MediumText style={styles.nameFileDinhkem}>{fileUploadShow[4] && fileUploadShow[4].name}</MediumText>
          </View>
        </View>

        {/**Giấy uỷ quyền */}
        <View style={styles.backgroundItemAttach}>
          <View>
            <Text style={{ color: "#000", fontWeight: '700' }}>Giấy uỷ quyền: </Text>
          </View>
          <View>
            <TouchableOpacity style={{ backgroundColor: "#fc5a03", borderRadius: 10, padding: 5, alignSelf: 'center' }} onPress={documentUploadPicker}>
              <Text style={styles.textCusmargin}>Chọn tệp tin đính kèm</Text>
            </TouchableOpacity>
          </View>
          <View>
            <MediumText style={styles.nameFileDinhkem}>{fileUploadShow[5] && fileUploadShow[5].name}</MediumText>
          </View>
        </View>


        <View style={styles.bgCusBtn}>
          <TouchableOpacity style={styles.customBtn} onPress={createPDF}>
            <Text style={styles.customBtnText}>Xem và khởi tạo thông tin biểu mẫu đính kèm</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.customBtn} onPress={onsubMitTest}>
          <Text style={styles.customBtnText}>Hoàn thành</Text>
        </TouchableOpacity> */}
          <TouchableOpacity style={styles.customBtn} onPress={() => { onPostDinhkem(), onPostThutuc() }}>
            <Text style={styles.customBtnText}>Nộp hồ sơ</Text>
            {/* <Button onPress={onPostThutuc} title="Nộp Hồ Sơ" /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.customBtn} onPress={onPostDinhkem}>
            <Text style={styles.customBtnText}>onPostDinhkem</Text>
            {/* <Button onPress={onPostThutuc} title="Nộp Hồ Sơ" /> */}
          </TouchableOpacity>


          {/* <TouchableOpacity style={styles.customBtn} onPress={navigatelookatPDF}>
            <Text style={styles.customBtnText}>Xem file PDF vừa tạo</Text>
          </TouchableOpacity> */}
        </View>

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
    // width: 300,
  },
  customBtnText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  backgroundItemAttach: {
    marginBottom: 15,
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
  bgCusBtn: {
    // flex: 1,
    alignItems: 'center'
  },
  bgThutucChitiet: {
    marginBottom: 10,
  },
  nameFileDinhkem: {
    color: '#f52314',
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
    // marginBottom: 8,
    color: '#fff',
    fontWeight: '700'
  },
  container: {
    // marginTop: kSpacing.kSpacing15,
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
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default DinhkemThutucScreen;
