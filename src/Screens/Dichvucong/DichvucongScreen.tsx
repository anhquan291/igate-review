import { StyleSheet, TouchableOpacity, View, Alert, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../../Themes/Layout";
import { Header } from "../../Components/Headers";
import { useAppSelector, useAppDispatch } from "../../Hooks/RTKHooks";
import { MediumText, RegularText } from "../../Components/Texts";
import { kScaledSize, kSpacing, kTextSizes } from "../../Utils/Constants";
import Colors from "../../Themes/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { authLogout } from "../../Store/AuthSlice";
import { fileGetDataThuTuc, fileGetDataThuTuc2 } from '../../Store/DichvucongSlice';
import { AppLoader } from '../../Components/Loaders';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
type Props = {
  navigation: any;
};

const DichvucongScreen = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch();
  const { fileListDataThuTuc } = useAppSelector(state => state.dichvucong)
  const { fileListDataThuTuc2 } = useAppSelector(state => state.dichvucong)
  const getDvcData = async () => {
    try {
      setLoading(true);
      await dispatch(fileGetDataThuTuc({})).unwrap()
    } catch (error) {

    } finally { setLoading(false) }
  }
  const getDvcData2 = async () => {
    try {
      setLoading(true);
      await dispatch(fileGetDataThuTuc2({})).unwrap()
    } catch (error) {

    } finally { setLoading(false) }
  }
  console.log('hehe', fileListDataThuTuc);
  console.log('hihihe', fileListDataThuTuc2);
  useEffect(() => {
    getDvcData();
    getDvcData2();
  }, [])
  return (
    <ScrollView style={[Layout.fill]}>
      {loading && <AppLoader />}
      <View style={[Layout.fill, styles.container]}>
        <View style={styles.category}>
          <MediumText style={styles.textcenter}>DỊCH VỤ CÔNG TRỰC TUYẾN</MediumText>
        </View>
        <MediumText style={styles.listThutuc}>
          <MaterialCommunityIcons style={styles.iconlistThutuc} name="format-list-bulleted-square" size={18} />Đăng ký hoạt động hộ kinh doanh
          </MediumText>
        <View>
          {fileListDataThuTuc && fileListDataThuTuc.content?.map((thutuc: any) => (
            <TouchableOpacity key={thutuc.id} style={styles.bgThutuc}>
              <RegularText style={styles.nameThutuc}>{thutuc.name}</RegularText>
              <RegularText style={styles.maThutuc}>{thutuc.nationCode}</RegularText>
              <Text style={styles.agencyThutuc}>{thutuc.agencyName}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <MediumText style={styles.listThutuc}>
          <MaterialCommunityIcons style={styles.iconlistThutuc} name="format-list-bulleted-square" size={18} />Chấm dứt hoạt động hộ kinh doanh
          </MediumText>
        <View>
          {fileListDataThuTuc2 && fileListDataThuTuc2.content?.map((thutuc: any) => (
            <TouchableOpacity key={thutuc.id} style={styles.bgThutuc}>
              <RegularText style={styles.nameThutuc}>{thutuc.name}</RegularText>
              <RegularText style={styles.maThutuc}>{thutuc.nationCode}</RegularText>
              <Text style={styles.agencyThutuc}>{thutuc.agencyName}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={[Layout.rowBetween, { marginBottom: kScaledSize(10) }]}>
          <MediumText style={styles.listThutuc}>
            <MaterialCommunityIcons style={styles.iconlistThutuc} name="format-list-bulleted-square" size={18} />Thông báo hoạt động khuyến mại
          </MediumText>
        </View>
      </View>

    </ScrollView>
  );
};

export default DichvucongScreen;

const styles = StyleSheet.create({
  category: {
    marginBottom: kScaledSize(20),
  },
  listThutuc: {
    marginBottom: kScaledSize(20),
    fontWeight: '700',
    fontSize: 18,
    color: '#2E5AAC',
  },
  iconlistThutuc: {
    marginRight: kScaledSize(15),
  },
  bgThutuc: {
    marginBottom: kScaledSize(15),
    // borderWidth: 1,
    // borderRadius: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  nameThutuc: {
    fontWeight: '700',
    color: Colors.black,
  },
  maThutuc: {
    fontWeight: '500',
    color: Colors.grey,

  },
  agencyThutuc: {
    fontWeight: '500',
    color: Colors.orange,
    borderRadius: 100,
    // borderTopLeftRadius: 70,
    // borderTopRightRadius: 70,
    // borderBottomLeftRadius: 70,
    // borderBottomRightRadius: 70,
  },
  textcenter: {
    textAlign: "center",
    fontWeight: '700',
    color: '#2E5AAC',
    fontSize: 22,
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
