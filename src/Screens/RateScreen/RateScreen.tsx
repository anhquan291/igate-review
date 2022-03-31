import React from 'react';
import { View } from 'react-native';
import { Header } from '../../Components/Headers';
import { RegularText } from '../../Components/Texts';
import Layout from '../../Themes/Layout';

const RateScreen: React.FC = () => {
  return (
    <View style={Layout.fill}>
      <Header name="Đánh giá độ hài lòng" />
      <RegularText>Rating Can bo</RegularText>
    </View>
  );
};

export default RateScreen;
