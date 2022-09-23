import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Alert, Text } from "react-native";
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
import { fileGetDataThuTucDetail, postThutuc, fileGetCodePattern, getNewCode } from '../../Store/DichvucongSlice';
import { Button } from '../../Components/Buttons';
// Constants

const ThutucChiTietScreen: React.FC = () => {
  const route: any = useRoute();
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { fileThutucDetail, dataCodePattern, newcode } = useAppSelector((state) => state.dichvucong);
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.auth);
  console.log("userData THỦ TUC CHI TIẾT", userData);
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
  //Lay code Pattern
  const onNewcode = async (): Promise<void> => {
    // console.log('ifileThutucDetail', dataCodePattern);
    try {
      setIsLoading(true);
      await dispatch(getNewCode({
        codePattern: dataCodePattern,
        code: fileThutucDetail?.code,
      })).unwrap();
      console.log('co chay voo dday')
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log('id dia danh', id);

  const onPostThutuc = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = {
        //CÓ AGENCY ID + PROCEDURE ID CHI TIẾT => CALL RA ĐƯỢC CÁI ID (CODEPATTERN)
        //https://apiquangngai.vnptigate.vn/bd/config/get-pattern?agency-id=62174f6f378b3c2a7563a00b&procedure-id=6243fed45b82236f1d1c21fe
        // TRUYỀN ID ĐÓ VÀO API https://apiquangngai.vnptigate.vn/bt/pattern/62a5b245a21aef4ae8daef2b/--get-next-value?code=1.001612.000.00.00.H48
        // LẤY RA ĐC MÃ CODE MỚI
        "code": "000.00.53.H48-220921-0099",// CODE MỚI.
        "codePattern": {
          "id": dataCodePattern,//"62a5b244eb1b8f76b46069a5"
        },
        "procedure": {
          "id": id,// id cua dia danh"6243fed45b82236f1d1c21d2",
          "code": fileThutucDetail.code,//"1.001612.000.00.00.H48",
          "translate": [
            {
              "languageId": 228,
              "name": fileThutucDetail.name//"Đăng ký thành lập hộ kinh doanh"
            }
          ],
          "sector": {
            "id": fileThutucDetail.sector.id,//"6218a2a1f5b1b47c066e13b4",
            "code": fileThutucDetail.sector.code,//"TLHDH",
            "name": [
              {
                "languageId": 228,
                "name": fileThutucDetail.sector.name//"Lĩnh vực thành lập và hoạt động của hộ kinh doanh"
              }
            ]
          }
        },
        "dossierFormFile": [],
        "dossierFee": [],
        "dossierReceivingKind": {
          "id": "5f8968888fffa53e4c073ded",
          "name": [
            {
              "languageId": 228,
              "name": "Nhận trực tiếp"
            }
          ]
        },
        "applicant": {
          "userId": userData.id,//"62a9989a2466600857581c2d",
          "eformId": "60d990f88e6893001e5a7b42",
          "data": {
            "ownerFullname": textchuHoso,//'test',//text,
            "birthday": "1994-10-23T17:00:00.000+0000",
            "gender": "",
            "email": "hoannk.qni@vnpt.vn",
            "phoneNumber": "+84943087654",
            "fullname": "Nguyễn Kim Hoàn",
            "identityNumber": "212571363",
            "identityDate": "2011-06-09T17:00:00.000+0000",
            "identityAgency": {
              "id": "000050000191c4e1bd300049",
              "name": "Công an Tỉnh Quảng Ngãi",
              "code": null,
              "parent": null,
              "ancestors": null
            },
            "note": "",
            "noidungyeucaugiaiquyet": textNoiDungGiaiquyet,//"codePattern",
            "chonDoiTuong": 1,
            "chonDoiTuong1": 2,
            "nation": {
              "label": "Việt Nam",
              "value": "5f39f4a95224cf235e134c5c"
            },
            "province": {
              "label": "Tỉnh Quảng Ngãi",
              "value": "5def47c5f47614018c000051"
            },
            "district": {
              "label": "Thành phố Quảng Ngãi",
              "value": "5def47c5f47614018c001522"
            },
            "village": {
              "label": "Phường Nguyễn Nghiêm",
              "value": "5def47c5f47614018c121025"
            },
            "address": "28/16 Hùng Vương,TP Quảng Ngãi",
            "diaChiThuaDat": "",
            "province2": {
              "label": "Tỉnh Quảng Ngãi",
              "value": "5def47c5f47614018c000051"
            },
            "nation2": {
              "label": "Việt Nam",
              "value": "5f39f4a95224cf235e134c5c"
            },
            "district2": {},
            "village2": {}
          }
        },
        "eForm": {
          "id": "60da89698e6893001e5a7b48",
          "data": {}
        },
        "agency": {
          "parent": {
            "id": "62174f6c378b3c2a75639fcc",
            "code": "000.00.53.H48",
            "name": [
              {
                "languageId": 228,
                "name": "UBND huyện Bình Sơn"
              }
            ],// lấy từ api https://apiquangngai.vnptigate.vn/ba/agency/62174f6c378b3c2a75639fcc(truyền id chi tiết agency.id trong thủ tục chi tiết vào)
            "tag": [
              //https://apiquangngai.vnptigate.vn/ba/agency/--by-parent-id?parent-id=62174f67378b3c2a75639f86
              //LẤY CONTENT ĐẦU TIÊN RA ĐC ID CƠ QUAN CON + TAG ID
              //TRUYỀN ID VÀO ĐỂ LẤY TÊN Phòng ban chức năng
              //https://apiquangngai.vnptigate.vn/bt/tag/0000591c4e1bd312a6f00004
              {

                "id": "0000591c4e1bd312a6f00004",
                "name": [
                  {
                    "languageId": 228,
                    "name": "Phòng ban chức năng",
                    "description": null
                  },
                  {
                    "languageId": 46,
                    "name": "Function room, funtion Department",
                    "description": null
                  }
                ]
              },
              {
                "id": "623fcedb64ba9749a03473f3",
                "name": [
                  {
                    "languageId": 228,
                    "name": "Bộ phận tiếp nhận cấp huyện",
                    "description": null
                  }
                ]
              }
            ]
          },
          "ancestors": [
            {
              "id": "000000000191c4e1bd300048",
              "name": [
                {
                  "languageId": 228,
                  "name": "UBND Tỉnh Quảng Ngãi"
                },
                {
                  "languageId": 46,
                  "name": "People's Committee of Quang Ngai Province"
                }
              ]
            }
          ]
        },
        "paymentData": {
          "Ip": "113.165.45.51",
          "MaTienTe": ""
        },
        "paymentMethod": {
          "id": "5f7fca83b80e603d5300dcf4",
          "name": "Trực tuyến",
          "code": null
        },
        "procedureProcessDefinition": {
          "id": "624a6d5a7038ae5a4ae8a824",
          "processDefinition": {
            "id": "624a49b8b516233d3a4a7ac5",
            "name": "Quy trình kết thúc tại Phòng - 3 ngày làm việc",
            "activiti": {
              "id": "Process_NeFMq9Pts:304:85aba0e6-b3b6-11ec-9eef-2e79af14f824",
              "model": {
                "id": "a7aab8bc-9258-4f12-a024-739047238f63",
                "name": "huyen-quytrinhphong",
                "project": {
                  "id": "0a306829-49a3-4b72-bd16-2384ddf429d7"
                }
              }
            },
            "processingTime": 3,
            "processingTimeUnit": "d",
            "reportTemplate": [],
            "applicantEForm": {
              "id": "60d990f88e6893001e5a7b42",
              "name": "HCC Mẫu nhập thông tin"
            },
            "timesheet": {
              "id": "623849e3e63b54793b9ff57e",
              "name": "Ngày làm việc"
            },
            "appliedAgency": [
              {
                "id": "6242b60a3f451d43e13ef5fe",
                "name": "Bộ phận tiếp nhận và trả kết quả huyện Bình Sơn"
              }
            ],
            "definedTask": [
              {
                "id": "root",
                "status": true
              },
              {
                "id": "UserTask_08ydbij",
                "status": true
              },
              {
                "id": "UserTask_01w8ld7",
                "status": true
              },
              {
                "id": "UserTask_1jbjw7t",
                "status": true
              },
              {
                "id": "UserTask_0dxw7ei",
                "status": true
              },
              {
                "id": "UserTask_0jf34f6",
                "status": true
              }
            ],
            "startDate": null,
            "endDate": null,
            "eForm": {
              "id": "60da89698e6893001e5a7b48",
              "name": "HCC Ghi chú , Thửa đất"
            },
            "dynamicVariable": {
              "isProcessingTimeUnitType": false
            },
            "firstTask": {
              "agencyType": {
                "id": "623fcedb64ba9749a03473f3"
              }
            }
          }
        },
        "agencyLevel": {
          "id": "5f39f4155224cf235e134c59",
          "name": [
            {
              "languageId": 228,
              "name": "Quận/ Huyện"
            },
            {
              "languageId": 46,
              "name": "District"
            }
          ],
          "status": 1,
          "code": "QUANHUYEN"
        },
        "procedureLevel": {
          "id": "5f5b2c4b4e1bd312a6f3ae24",
          "name": [
            {
              "languageId": 228,
              "name": "Mức độ 3"
            }
          ]
        },
        "dossierTaskStatus": {
          "id": "60e409823dfc9609723e493c",
          "name": [
            {
              "languageId": 228,
              "name": "Mới đăng ký",
              "description": null
            }
          ]
        },
        "dossierMenuTaskRemind": {
          "id": "60f52e0d09cbf91d41f88834",
          "name": [
            {
              "languageId": 228,
              "name": "Mới đăng ký",
              "description": "Mới đăng ký"
            },
            {
              "languageId": 46,
              "name": "Just registered",
              "description": "Just registered"
            }
          ]
        },
        "dossierStatus": 0
      }

      await dispatch(postThutuc(data)).unwrap();
      handleAlert({
        message: "Cảm ơn bạn đã nộp hồ sơ trực tuyến thành công",
        onPress1: () => {
          navigation.goBack();
        },
      });
      // Alert.alert('Cảm ơn bạn đã nộp hồ sơ trực tuyến thành công',

      //   onPress: () => navigation.navigate('DichvucongScreen')
      // );
      // navigation.navigate("DichvucongScreen");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    onGetDetail();

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

  console.log("fileThutucDetail", fileThutucDetail);
  console.log("newcode", newcode);
  // console.log("thutuc id", fileThutucDetail?.agency[0].id);
  // console.log("code id", fileThutucDetail?.code);


  const [textchuHoso, onChangeText1] = React.useState<string>("");
  const [textngaySinh, onChangeText2] = React.useState<string>("");
  const [texteMail, onChangeText3] = React.useState<string>("");
  const [textgioiTinh, onChangeText4] = React.useState<string>("");
  const [textSdt, onChangeText5] = React.useState<string>("");
  const [textNoiDungGiaiquyet, onChangeText6] = React.useState<string>("");
  // const [number, onChangeNumber] = React.useState<any>(null);
  console.log('text', textchuHoso);
  return (
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

      {/*chủ hồ sơ*/}
      <View style={styles.fixInput}>
        <Text style={styles.textCusmargin}>Thông tin chủ hồ sơ :</Text>
        <TextInput
          style={styles.input}
          placeholder="Thông tin chủ hồ sơ"
          onChangeText={onChangeText1}
          value={textchuHoso}
        />
      </View>
      {/*ngay sinh*/}
      <View style={styles.fixInput}>
        <Text style={styles.textCusmargin}>Ngày tháng năm sinh :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ngày tháng năm sinh"
          onChangeText={onChangeText2}
          value={textngaySinh}
        />
      </View>
      {/*ngay sinh*/}
      <View style={styles.fixInput}>
        <Text style={styles.textCusmargin}>Email :</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={onChangeText3}
          value={texteMail}
        />
      </View>
      {/*Giới tính*/}
      <View style={styles.fixInput}>
        <Text style={styles.textCusmargin}>Giới tính :</Text>
        <TextInput
          style={styles.input}
          placeholder="Giới tính"
          onChangeText={onChangeText4}
          value={textgioiTinh}
        />
      </View>
      {/*Số điện thoại*/}
      <View style={styles.fixInput}>
        <Text style={styles.textCusmargin}>Số điện thoại :</Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          onChangeText={onChangeText5}
          value={textSdt}
        />
      </View>
      {/*noi dung giai quyet*/}
      <View style={styles.fixInput}>
        <Text style={styles.textCusmargin}>Nội dung yêu cầu giải quyết :</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText6}
          placeholder="Nội dung yêu cầu giải quyết"
          value={textNoiDungGiaiquyet}
        />
      </View>


      {/* <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      /> */}
      <Button onPress={onPostThutuc} title="Nộp Hồ Sơ" />
    </View>
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
  detail: {
    paddingVertical: kSpacing.kSpacing15,
    borderBottomWidth: 0.5,
    borderColor: Colors.grey7,
  },
});

export default ThutucChiTietScreen;
