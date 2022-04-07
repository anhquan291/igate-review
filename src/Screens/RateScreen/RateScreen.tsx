import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../Components/Buttons';
import { Header } from '../../Components/Headers';
import { AppLoader } from '../../Components/Loaders';
import { MediumText, RegularText } from '../../Components/Texts';
import { useAppDispatch, useAppSelector } from '../../Hooks/RTKHooks';
import { FileFields } from '../../Models/File';
import { rateGetData } from '../../Store/RateSlice';
import Colors from '../../Themes/Colors';
import Layout from '../../Themes/Layout';
import { formatDate, formatDateMonth } from '../../Utils/Common';
import { kScaledSize, kSpacing, kTextSizes, kWidth } from '../../Utils/Constants';
import QuestionItem from './QuestionItem';

const RateScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { params } = useRoute<any>();
  const fileDetail: FileFields = params.item;
  const { data, isLoading, error } = useAppSelector((state) => state.rate);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const questionData = data?.questionGroup[0].question[0];
  const ref = useRef<any>(null);
  const onScrollToIndex = (type: string): void => {
    if (type === 'next' && data && questionIndex < data?.questionGroup[0].question.length - 1) {
      ref.current?.scrollToIndex({ animated: true, index: questionIndex + 1 });
      setQuestionIndex(questionIndex + 1);
    } else if (type === 'previous' && questionIndex > 0) {
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
  return (
    <View style={[Layout.fill]}>
      <Header name="Đánh giá độ hài lòng" />
      {isLoading ? (
        <AppLoader />
      ) : error ? (
        <View />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: kSpacing.kSpacing10 }}>
          <MediumText style={[styles.title]}>Đợt đánh giá cán bộ {formatDate(data?.startDate)}</MediumText>
          <View style={[Layout.rowBetween]}>
            <RegularText>Người đánh giá</RegularText>
            <RegularText style={styles.detail}>{fileDetail.applicant.data.fullname}</RegularText>
          </View>
          <View>
            <MediumText>{questionData?.content}</MediumText>
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: kSpacing.kSpacing15,
    color: Colors.primary,
    textAlign: 'center',
    fontSize: kTextSizes.medium,
  },
  detail: {
    flex: 1,
    textAlign: 'right',
  },
  buttonGroup: {
    paddingHorizontal: kSpacing.kSpacing20,
  },
});

export default RateScreen;
