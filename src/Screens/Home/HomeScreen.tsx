import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../Components/Headers';
import { AppLoader } from '../../Components/Loaders';
import { MediumText } from '../../Components/Texts';
import { useAppDispatch, useAppSelector } from '../../Hooks/RTKHooks';
import { taskGetData } from '../../Store/TaskSlice';
import Layout from '../../Themes/Layout';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.tasks);
  const onGetTaskList = async () => {
    await dispatch(taskGetData({ page: 0, size: 10, spec: 'page' }));
  };
  useEffect(() => {
    onGetTaskList();
  }, []);
  return (
    <View style={[Layout.fill]}>
      <Header name="Danh sách hồ sơ" showBackButton={false} />
      {isLoading && <AppLoader />}
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
