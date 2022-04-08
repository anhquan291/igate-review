import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Header } from '../../Components/Headers';
import { AppLoader, FooterLoader } from '../../Components/Loaders';
import { useAppDispatch, useAppSelector } from '../../Hooks/RTKHooks';
import { fileGetData } from '../../Store/FileSlice';
import Layout from '../../Themes/Layout';
import { kSpacing } from '../../Utils/Constants';
import HomeItem from './HomeItem';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const scrollRef = useRef<any>(null);
  const { fileList, isLoading, totalPages } = useAppSelector((state) => state.files);
  const [page, setPage] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] =
    useState<boolean>(true);

  const onGetFileList = async (reload?: boolean): Promise<void> => {
    await dispatch(
      fileGetData({ page: reload ? 0 : page, size: 10, spec: 'page' }),
    ).unwrap();
  };

  const onLoadMore = (): void => {
    if (totalPages !== null && totalPages <= page) return;
    setPage(page + 1);
  };

  const onReload = (reload?: boolean): void => {
    setPage(0);
    onGetFileList(true);
  };

  const onRefresh = async (): Promise<void> => {
    setRefresh(true);
    setPage(0);
    await dispatch(fileGetData({ page: 0, size: 10, spec: 'page' }));
    setRefresh(false);
  };

  useEffect(() => {
    onGetFileList();
    setOnEndReachedCalledDuringMomentum(false);
  }, [page]);
  console.log(onEndReachedCalledDuringMomentum);
  return (
    <View style={[Layout.fill]}>
      <Header name="Danh sách hồ sơ" showBackButton={false} />
      {isLoading && <AppLoader />}
      <View style={[Layout.fill, styles.container]}>
        <FlatList
          data={fileList}
          initialNumToRender={10}
          removeClippedSubviews
          onRefresh={onRefresh}
          refreshing={refresh}
          renderItem={({ item }) => <HomeItem item={item} />}
          ListFooterComponent={<FooterLoader loading={isLoading} page={page} />}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum) {
              onLoadMore();
              setOnEndReachedCalledDuringMomentum(true);
            }
          }}
          // onMomentumScrollBegin={() => console.log('scroll ne')}
          onEndReachedThreshold={0.01}
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
