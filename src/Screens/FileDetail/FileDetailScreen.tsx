import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header } from '../../Components/Headers';
import { AppLoader } from '../../Components/Loaders';
import { MediumText, RegularText } from '../../Components/Texts';
import { useAppDispatch, useAppSelector } from '../../Hooks/RTKHooks';
import { HomeRouteProps } from '../../Navigators/Stack/HomeStack';
import { fileGetDetail } from '../../Store/FileSlice';
import Colors from '../../Themes/Colors';
import Layout from '../../Themes/Layout';
import { formatDateMonth } from '../../Utils/Common';
import { kSpacing, kTextSizes } from '../../Utils/Constants';
import { FileFields } from '../Home/Type';

const FileDetailScreen: React.FC = () => {
  const route: HomeRouteProps<'FileDetailScreen'> = useRoute();
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { error, fileDetail } = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();
  const item: FileFields = route.params.item;
  const onGetDetail = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await dispatch(fileGetDetail({ code: item.code })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onRate = (): void => {
    navigation.navigate('RatingScreen', { item: fileDetail });
  };
  useEffect(() => {
    onGetDetail();
  }, []);
  return (
    <View style={[Layout.fill]}>
      <Header name="Chi tiết hồ sơ" />
      {isLoading ? (
        <AppLoader />
      ) : error ? (
        <RegularText>Có lỗi xẩy ra, vui lòng thử lại</RegularText>
      ) : (
        <View style={[Layout.fill, styles.container]}>
          <View style={[Layout.rowBetween]}>
            <View
              style={[
                styles.result,
                { backgroundColor: fileDetail.dossierStatus.id === 4 ? Colors.primary : Colors.orange },
              ]}
            >
              <RegularText style={Layout.whiteText}>
                {fileDetail.dossierStatus.id === 4 ? 'Đã trả hồ sơ' : 'Chưa trả hồ sơ'}
              </RegularText>
            </View>
            {/* Nếu đã nhận hồ sơ thì mới cho hiện nút đánh giá */}
            {fileDetail.dossierStatus.id === 4 && (
              <TouchableOpacity onPress={onRate} style={[styles.result, { backgroundColor: Colors.green1 }]}>
                <RegularText style={Layout.whiteText}>Đánh giá cón bộ</RegularText>
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.content, Layout.shadow]}>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Mã hồ sơ</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>{fileDetail.code}</MediumText>
            </View>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Tên thủ tục</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>
                {fileDetail.procedure.translate.name}
              </MediumText>
            </View>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Đơn vị nhận hồ sơ</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>{fileDetail.agency.name}</MediumText>
            </View>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Ngày nộp</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>
                {formatDateMonth(fileDetail.appliedDate)}
              </MediumText>
            </View>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Ngày tiếp nhận</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>
                {formatDateMonth(fileDetail.acceptedDate)}
              </MediumText>
            </View>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Ngày hẹn trả</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>
                {formatDateMonth(fileDetail.appointmentDate)}
              </MediumText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    textAlign: 'right',
    flex: 1,
    marginLeft: kSpacing.kSpacing10,
  },
  detail: {
    paddingVertical: kSpacing.kSpacing15,
    borderBottomWidth: 0.5,
    borderColor: Colors.grey7,
  },
});

export default FileDetailScreen;
