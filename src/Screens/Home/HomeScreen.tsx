import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../Components/Headers';
import { MediumText } from '../../Components/Texts';
import Layout from '../../Themes/Layout';

const HomeScreen: React.FC = () => {
  return (
    <View style={[Layout.fill]}>
      <Header name="Danh sách hồ sơ" showBackButton={false} />
      <View style={[Layout.fill]}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
