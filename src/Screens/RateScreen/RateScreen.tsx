import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../Components/Buttons";
import { Header } from "../../Components/Headers";
import { AppLoader } from "../../Components/Loaders";
import { MediumText, RegularText } from "../../Components/Texts";
import { useAppDispatch, useAppSelector } from "../../Hooks/RTKHooks";
import { fileGetData, fileGetDetail } from "../../Store/FileSlice";
import { FileDetailFields } from "../../Models/File";
import {
  rateCheckFile,
  rateGetData,
  rateOfficer,
  rateOfficerParams,
} from "../../Store/RateSlice";
import { authGetUserData } from "../../Store/AuthSlice";
import Colors from "../../Themes/Colors";
import Layout from "../../Themes/Layout";
import { formatDate, formatDateMonth } from "../../Utils/Common";
import {
  kScaledSize,
  kSpacing,
  kTextSizes,
  kWidth,
} from "../../Utils/Constants";
import { handleAlert } from "../../Utils/Notification";
import QuestionItem from "./QuestionItem";
import moment from "moment";
import SoundPlayer from "react-native-sound-player";

const QuestionAnswer = [
  {
    id: 1,
    name: "Không hài lòng",
    icon: require("../../Assets/Images/notSatisfied.png"),
  },
  {
    id: 2,
    name: "Bình thường",
    icon: require("../../Assets/Images/normal.png"),
  },
  {
    id: 3,
    name: "Hài lòng",
    icon: require("../../Assets/Images/satisfied.png"),
  },
  {
    id: 4,
    name: "Rất hài lòng",
    icon: require("../../Assets/Images/verySatisfied.png"),
  },
];
//logic màn rating -->
const RateScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { params } = useRoute<any>();
  const navigation = useNavigation<any>();

  const {
    fileList,
    isLoading: fileLoading,
    totalPages,
  } = useAppSelector((state) => state.files);

  const [page, setPage] = useState<number>(0);

  // const fileDetail: FileDetailFields = params.item;
  const { fileDetail } = useAppSelector((state) => state.files);
  console.log("dữ liệu test", fileDetail);
  const filetest: FileDetailFields = params;
  const { data, isLoading, error } = useAppSelector((state) => state.rate);

  const { userData } = useAppSelector((state) => state.auth);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const questionData = data?.questionGroup[0].question[0];
  const [selectAnswer, setSelectAnswer] = useState<number | null>(null);
  const [answerType, setAnswerType] = useState<number | null>(null);
  console.log("datan@@ ", data);

  const ref = useRef<any>(null);

  const onGetFileList = async (reload?: boolean): Promise<void> => {
    const response = await dispatch(
      fileGetData({
        page: reload ? 0 : page,
        size: 10,
        spec: "page",
        "user-id": userData.user_id,
        userId: userData.id,
        agencyId: userData.experience[0].agency.id,
      }),
    ).unwrap();
    //console.log('..user..', userData);
    // const latestItem = response.content.reduce(
    //   (
    //     a: { completedDate: string | number | Date },
    //     b: { completedDate: string | number | Date },
    //   ) => {
    //     return moment(a.completedDate) > moment(b.completedDate) ? a : b;
    //   },
    // );
    await dispatch(fileGetDetail({ code: response.content[0].code })).unwrap();
  };

  useEffect(() => {
    //lấy dữ liệu hồ sơ
    onGetFileList();
    const intervalId = setInterval(() => {
      onGetFileList();
    }, 5000);
    return () => clearInterval(intervalId);
    // setOnEndReachedCalledDuringMomentum(false);
  }, []);

  const renderIcon = (type: number): any => {
    switch (type) {
      case 0:
        return require("../../Assets/Images/normal.png");
      case 2:
        return require("../../Assets/Images/verySatisfied.png");
      case -1:
        return require("../../Assets/Images/notSatisfied.png");
      case 1:
        return require("../../Assets/Images/satisfied.png");

      default:
        return require("../../Assets/Images/normal.png");
      // test
      // case -1:
      //   return require("../../Assets/Images/normal.png");
      // case 0:
      //   return require("../../Assets/Images/verySatisfied.png");
      // case 1:
      //   return require("../../Assets/Images/notSatisfied.png");
      // case 2:
      //   return require("../../Assets/Images/satisfied.png");

      // default:
      //   return require("../../Assets/Images/normal.png");
    }
  };

  const onRating = async (): Promise<void> => {
    if (fileDetail) {
      console.log('detail', fileDetail);
      const fileCheck = await dispatch(
        rateCheckFile({
          "officer-id": fileDetail?.applicant.userId,
          "dossier-id": fileDetail?.code,
        }),
      ).unwrap();
      console.log('filechec ->', fileCheck);
      if (fileCheck.content.length > 0) {
        handleAlert({ message: "Hồ sơ này đã được đánh giá" });
        navigation.navigate("UserScreen");
        return;
      }
    }
    if (selectAnswer === null) {
      handleAlert({ message: "Vui lòng chọn ý kiến đánh giá" });
      return;
    }
    let formatAnswer: Array<any> = [];
    // console.log('formatanswer@@', formatAnswer);
    questionData?.answer.map((item, index) =>
      formatAnswer.push({
        ...item,
        chosen: item.answerType === answerType ? 1 : 0,
      }),
    );
    // data bộ câu hỏi console.log('questiondata', questionData);
    // console.log('data', data);

    let body: rateOfficerParams;
    if (data) {
      body = {
        formData: {
          participantName: fileDetail?.applicant.data.fullname,
          identityNumber: fileDetail?.applicant.data.identityNumber,
          profileNumber: fileDetail?.code,
        },
        ratingOfficer: {
          id: data?.id,
          name: data?.name,
          agency: {
            id: fileDetail?.agency.id,
          },
          userGroup: data?.userGroup,
          startDate: data?.startDate,
          endDate: data?.endDate,
        },
        officer: {
          // id: fileDetail?.task[0].assignee.id,
          // name: fileDetail?.task[0].assignee.fullname,
          id: fileDetail?.task[fileDetail.task.length - 1].assignee.id,
          name: fileDetail?.task[fileDetail.task.length - 1].assignee.fullname,
        },
        detail: [
          {
            answer: formatAnswer,
            status: questionData?.status,
            question: {
              id: questionData?.id,
              content: questionData?.content,
              multipleChoice: questionData?.multipleChoice,
              requiredChoice: questionData?.requiredChoice,
            },
          },
        ],
        deploymentId: data.deploymentId,
      };
      await dispatch(rateOfficer(body)).unwrap();
      if (Platform.OS === "android") {
        SoundPlayer.playSoundFile("tone", "mp3");
      }
      // handleAlert({
      //   message: "Cảm ơn bạn đã đánh giá và giúp chúng tôi hoàn thiện hơn",
      //   onPress1: () => {
      //     navigation.goBack();
      //   },
      // });
      navigation.navigate("UserScreen");
    }
  };
  // data bộ câu hỏi cần push console.log("DATA status ####", questionData);
  console.log("selection ->", selectAnswer, answerType);
  const onScrollToIndex = (type: string): void => {
    if (
      type === "next" &&
      data &&
      questionIndex < data?.questionGroup[0].question.length - 1
    ) {
      ref.current?.scrollToIndex({ animated: true, index: questionIndex + 1 });
      setQuestionIndex(questionIndex + 1);
    } else if (type === "previous" && questionIndex > 0) {
      ref.current?.scrollToIndex({ animated: true, index: questionIndex - 1 });
      setQuestionIndex(questionIndex - 1);
    }
  };

  const onGetData = async (): Promise<void> => {
    dispatch(rateGetData({ page: 0, size: 1, status: 1 })).unwrap();
  };

  useEffect(() => {
    onGetData();
  }, []);
  // console.log('task', fileDetail)
  // console.log('fullname cuối //đúng', fileDetail.task[fileDetail.task.length - 1].assignee.fullname);
  return (
    <View style={[Layout.fill]}>
      <Header name="ĐÁNH GIÁ ĐỘ HÀI LÒNG" />
      {(isLoading || fileLoading) && <AppLoader />}
      {fileList.length > 0 && fileDetail !== null && !error ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View
              style={[
                styles.officer,
                {
                  marginTop: kSpacing.kSpacing5,
                  marginBottom: kSpacing.kSpacing5,
                },
              ]}
            >
              <View style={[Layout.rowBetween, styles.mb]}>
                <RegularText>Cán bộ</RegularText>
                <MediumText style={styles.name}>
                  {
                    fileDetail.task[fileDetail.task.length - 1].assignee
                      .fullname
                  }
                </MediumText>
              </View>
              {/* <View style={[Layout.rowBetween, styles.mb]}>
                <RegularText>Chức vụ</RegularText>
                <MediumText style={styles.detail}>Chuyên viên</MediumText>
              </View> */}
              <View style={[Layout.rowBetween, styles.mb]}>
                <RegularText>Đơn vị</RegularText>
                <MediumText style={styles.detail}>
                  {fileDetail.agency.name}
                </MediumText>
              </View>
            </View>
            <View style={styles.officer}>
              {/* <MediumText style={[styles.title]}>
                Đợt đánh giá cán bộ {formatDate(data?.startDate)}
              </MediumText> */}
              <View style={[Layout.rowBetween, styles.mb]}>
                <RegularText>Người đánh giá</RegularText>
                <MediumText style={styles.detail}>
                  {fileDetail.applicant.data.fullname}
                </MediumText>
              </View>
              <View style={[Layout.rowBetween, styles.mb]}>
                <RegularText>CMND</RegularText>
                <MediumText style={styles.detail}>
                  {fileDetail.applicant.data.identityNumber}
                </MediumText>
              </View>
              <View style={[Layout.rowBetween, styles.mb]}>
                <RegularText>Mã hồ sơ</RegularText>
                <MediumText style={styles.detail}>{fileDetail.code}</MediumText>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: kSpacing.kSpacing16,
                marginVertical: kSpacing.kSpacing10,
              }}
            >
              <MediumText style={[styles.title]}>
                MỜI CHẠM VÀO BIỂU TƯỢNG ĐỂ ĐÁNH GIÁ
              </MediumText>
            </View>
            <View
              style={[
                Layout.center,
                {
                  marginBottom: kSpacing.kSpacing20,
                  marginHorizontal: kSpacing.kSpacing10,
                },
              ]}
            >
              {questionData &&
                questionData.answer
                  .slice()
                  .sort((a, b) => a.answerType - b.answerType)
                  .map((item, index) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        setSelectAnswer(index);
                        setAnswerType(item.answerType);
                      }}
                      style={[
                        styles.moodv2,
                        {
                          backgroundColor:
                            selectAnswer === index
                              ? Colors.primary
                              : Colors.white,
                        },
                        Layout.shadow,
                      ]}
                    >
                      <Image
                        source={renderIcon(item.answerType)}
                        style={styles.moodIconv2}
                      />
                      <RegularText
                        style={[
                          styles.moodTextv2,
                          {
                            color:
                              selectAnswer === index
                                ? Colors.white
                                : Colors.black,
                          },
                        ]}
                      >
                        {item.content}
                      </RegularText>
                    </TouchableOpacity>
                  ))}
            </View>
          </ScrollView>
          <View style={styles.buttonGroup}>
            <Button title="Hoàn tất" onPress={onRating} />
          </View>
        </>
      ) : (
          <View style={[Layout.fill, Layout.center]}>
            <MediumText>Không có hồ sơ đánh giá</MediumText>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    marginVertical: kSpacing.kSpacing10,
    color: Colors.primary,
    textAlign: "center",
    fontSize: kTextSizes.medium,
  },
  detail: {
    flex: 1,
    textAlign: "right",
  },
  buttonGroup: {
    paddingHorizontal: kSpacing.kSpacing20,
    marginBottom: kScaledSize(20),
    marginTop: kScaledSize(5),
  },
  officer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: Colors.grey7,
    marginHorizontal: kSpacing.kSpacing10,
    backgroundColor: Colors.white,
  },
  name: {
    color: Colors.orange2,
  },
  mb: {
    marginBottom: kSpacing.kSpacing10,
  },
  mood: {
    width: (kWidth - kScaledSize(40)) / 4,
    borderRadius: 5,
  },
  moodv2: {
    width: kWidth - kScaledSize(40),
    paddingVertical: kScaledSize(6),
    marginBottom: kSpacing.kSpacing10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  moodText: {
    fontSize: kTextSizes.xmini,
    textAlign: "center",
    marginTop: kSpacing.kSpacing10,
  },
  moodTextv2: {
    fontSize: kTextSizes.medium,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  moodIcon: {
    width: (kWidth - kScaledSize(60)) / 4,
    height: kScaledSize(45),
    resizeMode: "contain",
  },
  moodIconv2: {
    width: (kWidth - kScaledSize(60)) / 3,
    height: kScaledSize(60),
    resizeMode: "contain",
  },
});

export default RateScreen;
