import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RegularText } from '../../Components/Texts';
import { kSpacing, kWidth } from '../../Utils/Constants';
import { Button } from '../../Components/Buttons';

interface Props {
  item: any;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionItem = ({ item, setQuestionIndex }: Props) => {
  return (
    <View style={styles.container}>
      <RegularText>{item.content}:</RegularText>
      <ScrollView>
        {item.answer.map((answer: any) => (
          <View key={answer.id}>
            <RegularText>{answer.content}</RegularText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuestionItem;

const styles = StyleSheet.create({
  container: {
    width: kWidth,
    padding: kSpacing.kSpacing10,
    flex: 1,
  },
});
