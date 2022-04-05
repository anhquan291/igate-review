import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Header } from '../../Components/Headers';
import { AppLoader } from '../../Components/Loaders';
import { useAppDispatch, useAppSelector } from '../../Hooks/RTKHooks';
import { fileGetData } from '../../Store/FileSlice';
import Layout from '../../Themes/Layout';
import { kSpacing } from '../../Utils/Constants';
import HomeItem from './HomeItem';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fileList, isLoading } = useAppSelector((state) => state.files);
  const [page, setPage] = useState<number>(0);
  const onGetFileList = async () => {
    await dispatch(fileGetData({ page: page, size: 40, spec: 'page' })).unwrap();
  };
  useEffect(() => {
    onGetFileList();
  }, []);
  return (
    <View style={[Layout.fill]}>
      <Header name="Danh sách hồ sơ" showBackButton={false} />
      {isLoading && <AppLoader />}
      <View style={[Layout.fill, styles.container]}>
        <FlatList
          data={fileList}
          initialNumToRender={10}
          removeClippedSubviews
          renderItem={({ item }) => <HomeItem item={item} />}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: kSpacing.kSpacing10,
  },
});

export default HomeScreen;
