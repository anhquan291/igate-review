import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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

const FileDetailScreen: React.FC = () => {
  const route: HomeRouteProps<"FileDetailScreen"> = useRoute();
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { error, fileDetail } = useAppSelector((state) => state.files);
  const { userData } = useAppSelector((state) => state.auth);
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

  const onRate = async (): Promise<void> => {
    try {
      // Check nếu hồ sơ đã được đánh giá.
      if (fileDetail) {
        const fileCheck = await dispatch(
          rateCheckFile({
            "officer-id": fileDetail?.applicant.userId,
            "dossier-id": fileDetail?.code,
          }),
        ).unwrap();
        if (fileCheck.content.length > 0) {
          handleAlert({ message: "Hồ sơ này đã được đánh giá" });
          return;
        }
      }
      // Check chưa thì chuyển tới trang đánh giá.
      navigation.navigate("RatingScreen", { item: fileDetail });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    onGetDetail();
  }, []);
  console.log("fileDetail", fileDetail);
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
                {
                  backgroundColor:
                    fileDetail?.dossierStatus.id === 4 ||
                    fileDetail?.dossierStatus.id === 5
                      ? Colors.primary
                      : Colors.orange,
                },
              ]}
            >
              <RegularText style={Layout.whiteText}>
                {fileDetail?.dossierStatus.id === 4 ||
                fileDetail?.dossierStatus.id === 5
                  ? "Đã trả hồ sơ"
                  : "Chưa trả hồ sơ"}
              </RegularText>
            </View>
            {/* Nếu đã nhận hồ sơ thì mới cho hiện nút đánh giá */}
            {/* fileDetail.applicant.userId === userData.user_id && */}
            {(fileDetail?.dossierStatus.id === 4 ||
              fileDetail?.dossierStatus.id === 5) && (
              <TouchableOpacity
                onPress={onRate}
                style={[styles.result, { backgroundColor: Colors.green1 }]}
              >
                <RegularText style={Layout.whiteText}>
                  Đánh giá cán bộ
                </RegularText>
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.content, Layout.shadow]}>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Mã hồ sơ</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>
                {fileDetail?.code}
              </MediumText>
            </View>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Tên thủ tục</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>
                {fileDetail?.procedure.translate.name}
              </MediumText>
            </View>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>
                Đơn vị nhận hồ sơ
              </RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>
                {fileDetail?.agency.name}
              </MediumText>
            </View>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Ngày nộp</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>
                {formatDateMonth(fileDetail?.appliedDate)}
              </MediumText>
            </View>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Ngày tiếp nhận</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>
                {formatDateMonth(fileDetail?.acceptedDate)}
              </MediumText>
            </View>
            <View style={[Layout.rowBetween, styles.detail]}>
              <RegularText style={styles.fieldName}>Ngày hẹn trả</RegularText>
              <MediumText style={[styles.text, styles.textLeft]}>
                {formatDateMonth(fileDetail?.appointmentDate)}
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

export default FileDetailScreen;
