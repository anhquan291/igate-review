import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button } from '../../Components/Buttons';
import { Header } from '../../Components/Headers';
import { AppLoader } from '../../Components/Loaders';
import { RegularText } from '../../Components/Texts';
import { useAppDispatch, useAppSelector } from '../../Hooks/RTKHooks';
import { rateGetData } from '../../Store/RateSlice';
import Layout from '../../Themes/Layout';
import { kScaledSize, kSpacing, kWidth } from '../../Utils/Constants';
import QuestionItem from './QuestionItem';

const RateScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.rate);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const ref = useRef<any>(null);
  const onScrollToIndex = (type: string): void => {
    if (type === 'next' && questionIndex < data?.questionGroup[0].question.length - 1) {
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
    <View style={[Layout.fill, { paddingBottom: kScaledSize(30) }]}>
      <Header name="Đánh giá độ hài lòng" />
      {isLoading ? (
        <AppLoader />
      ) : error ? (
        <View />
      ) : (
        <>
          <FlatList
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
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    paddingHorizontal: kSpacing.kSpacing20,
  },
});

export default RateScreen;
