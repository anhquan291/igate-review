import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
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
import { FileDetailFields } from "../../Models/File";
import {
  rateGetData,
  rateOfficer,
  rateOfficerParams,
} from "../../Store/RateSlice";
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

const RateScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { params } = useRoute<any>();
  const navigation = useNavigation<any>();

  // const fileDetail: FileDetailFields = params.item;
  const { fileDetail } = useAppSelector((state) => state.files);
  console.log("TEST@@", fileDetail);
  const filetest: FileDetailFields = params;
  const { data, isLoading, error } = useAppSelector((state) => state.rate);

  const { userData } = useAppSelector((state) => state.auth);
  console.log('user@@ --->>>', userData);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const questionData = data?.questionGroup[0].question[0];
  const [selectAnswer, setSelectAnswer] = useState<number | null>(null);
  const ref = useRef<any>(null);
  const renderIcon = (type: number): any => {
    switch (type) {
      case -1:
        return require("../../Assets/Images/notSatisfied.png");
      case 0:
        return require("../../Assets/Images/normal.png");
      case 1:
        return require("../../Assets/Images/satisfied.png");
      case 2:
        return require("../../Assets/Images/verySatisfied.png");
      default:
        return require("../../Assets/Images/normal.png");
    }
  };

  const onRating = async (): Promise<void> => {
    if (selectAnswer === null) {
      handleAlert({ message: "Vui lòng chọn ý kiến đánh giá" });
      return;
    }
    let formatAnswer: Array<any> = [];
    questionData?.answer.map((item, index) =>
      formatAnswer.push({
        ...item,
        chosen: index === selectAnswer ? 1 : 0,
      }),
    );
    let body: rateOfficerParams;
    if (data) {
      body = {
        formData: {
          // participantName: fileDetail.applicant.data.fullname,
          // identityNumber: fileDetail.applicant.data.identityNumber,
          // profileNumber: fileDetail.code,
        },
        ratingOfficer: {
          id: data?.id,
          name: data?.name,
          agency: {
            // id: fileDetail.agency.id,
          },
          userGroup: data?.userGroup,
          startDate: data?.startDate,
          endDate: data?.endDate,
        },
        officer: {
          // id: fileDetail.task[0].assignee.id,
          // name: fileDetail.task[0].assignee.fullname,
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
      handleAlert({
        message: "Cảm ơn bạn đã đánh giá và giúp chúng tôi hoàn thiện hơn",
        onPress1: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          });
        },
      });
    }
  };

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
    // console.log("hi", onGetData())
  }, []);

  return (
    <View style={[Layout.fill]}>
      <Header name="Đánh giá độ hài lòng" />
      {isLoading ? (
        <AppLoader />
      ) : error ? (
        <View />
      ) : (
            <>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.officer}>
                  <MediumText style={styles.name}>
                    {/* {fileDetail.task[0].assignee.fullname} */}
                  </MediumText>
                  <View style={[Layout.rowBetween, styles.mb]}>
                    <RegularText>Chức vụ</RegularText>
                    <MediumText style={styles.detail}>Chuyên viên</MediumText>
                  </View>
                  <View style={[Layout.rowBetween, styles.mb]}>
                    <RegularText>Đơn vị</RegularText>
                    <MediumText style={styles.detail}>
                      {/* {fileDetail.agency.name} */}
                    </MediumText>
                  </View>
                </View>
                <View style={{ marginHorizontal: kSpacing.kSpacing16 }}>
                  <MediumText style={[styles.title]}>
                    {/* Đợt đánh giá cán bộ {formatDate(data?.startDate)} */}
                  </MediumText>
                  <View style={[Layout.rowBetween, styles.mb]}>
                    <RegularText>Người đánh giá</RegularText>
                    <MediumText style={styles.detail}>
                      {/* {fileDetail.applicant.data.fullname} */}
                    </MediumText>
                  </View>
                  <View style={[Layout.rowBetween, styles.mb]}>
                    <RegularText>CMND</RegularText>
                    <MediumText style={styles.detail}>
                      {/* {fileDetail.applicant.data.identityNumber} */}
                    </MediumText>
                  </View>
                  <View style={[Layout.rowBetween, styles.mb]}>
                    <RegularText>Mã hồ sơ</RegularText>
                    {/* <MediumText style={styles.detail}>{fileDetail.code}</MediumText> */}
                  </View>
                  <MediumText style={[styles.title]}>Ý kiến đánh giá</MediumText>
                </View>
                <View
                  style={[
                    Layout.rowBetween,
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
                          onPress={() => setSelectAnswer(index)}
                          style={[
                            styles.mood,
                            {
                              backgroundColor:
                                selectAnswer === index
                                  ? Colors.primary
                                  : Colors.white,
                            },
                            Layout.shadow,
                            Layout.center,
                          ]}
                        >
                          <Image
                            source={renderIcon(item.answerType)}
                            style={styles.moodIcon}
                          />
                          <RegularText
                            style={[
                              styles.moodText,
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
                {/* <FlatList
            ref={ref}
            data={data?.questionGroup[0].question}
            keyExtractor={(item) => item.id}
            bounces={false}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={kWidth}
            renderItem={({ item }) => <QuestionItem item={item} setQuestionIndex={setQuestionIndex} />}
          />
          <View style={[Layout.rowBetween, styles.buttonGroup]}>
            {questionIndex !== 0 ? (
              <Button title="Quay lại" onPress={() => onScrollToIndex('previous')} />
            ) : (
              <View />
            )}
            <Button title="Tiếp" onPress={() => onScrollToIndex('next')} />
          </View> */}
              </ScrollView>
              <View style={styles.buttonGroup}>
                <Button title="Hoàn tất" onPress={onRating} />
              </View>
            </>
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    marginVertical: kSpacing.kSpacing20,
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
    marginBottom: kScaledSize(30),
  },
  officer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: kSpacing.kSpacing15,
    borderColor: Colors.grey7,
    marginHorizontal: kSpacing.kSpacing16,
  },
  name: {
    color: Colors.orange2,
    marginBottom: kSpacing.kSpacing10,
  },
  mb: {
    marginBottom: kSpacing.kSpacing10,
  },
  mood: {
    width: (kWidth - kScaledSize(40)) / 4,
    height: kScaledSize(100),
    borderRadius: 5,
  },
  moodText: {
    fontSize: kTextSizes.xmini,
    textAlign: "center",
    marginTop: kSpacing.kSpacing10,
  },
  moodIcon: {
    width: (kWidth - kScaledSize(60)) / 4,
    height: kScaledSize(45),
    resizeMode: "contain",
  },
});

export default RateScreen;
