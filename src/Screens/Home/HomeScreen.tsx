import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
// Components
import { Header } from "../../Components/Headers";
import { AppLoader, FooterLoader } from "../../Components/Loaders";
import HomeItem from "./HomeItem";
// Redux
import { useAppDispatch, useAppSelector } from "../../Hooks/RTKHooks";
import { fileGetData } from "../../Store/FileSlice";
// Layout
import Layout from "../../Themes/Layout";
import { kScaledSize, kSpacing } from "../../Utils/Constants";
import Colors from "../../Themes/Colors";

const AnimatedList = Animated.createAnimatedComponent(FlatList);

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const scrollRef = useRef<any>(null);
  const { fileList, isLoading, totalPages } = useAppSelector(
    (state) => state.files,
  );
  const { userData } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState<boolean>(true);
  const scrollY = new Animated.Value(0);
  const onScrollToTop = () => {
    scrollRef.current.scrollToOffset(0, 0, true);
  };
  const opacityStyle = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolateRight: "clamp",
  });

  const onGetFileList = async (reload?: boolean): Promise<void> => {
    await dispatch(
      fileGetData({
        page: reload ? 0 : page,
        size: 10,
        spec: "page",
        "user-id": userData.user_id,
      }),
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
    await dispatch(
      fileGetData({
        page: 0,
        size: 10,
        spec: "page",
        "user-id": userData.user_id,
      }),
    );
    setRefresh(false);
  };

  useEffect(() => {
    onGetFileList();
    const intervalId = setInterval(() => {
      // this will be executed every 200 ms
      // even when app is the the background
      onGetFileList();
    }, 4000);
    return () => clearInterval(intervalId);
    // setOnEndReachedCalledDuringMomentum(false);
  }, []);

  return (
    <View style={[Layout.fill]}>
      <Header name="Danh sách hồ sơ" showBackButton={false} />
      {isLoading && <AppLoader />}
      <View style={[Layout.fill, styles.container]}>
        <AnimatedList
          ref={scrollRef}
          data={fileList}
          initialNumToRender={10}
          removeClippedSubviews
          onRefresh={onRefresh}
          refreshing={refresh}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } },
              },
            ],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          renderItem={({ item }: any) => <HomeItem item={item} />}
          // ListFooterComponent={<FooterLoader loading={isLoading} page={page} />}
          // onEndReached={() => {
          //   if (!onEndReachedCalledDuringMomentum) {
          //     onLoadMore();
          //     setOnEndReachedCalledDuringMomentum(true);
          //   }
          // }}
          // onEndReachedThreshold={0.01}
        />
        <Animated.View
          style={[
            styles.floatButton,
            Layout.shadow,
            Layout.center,
            { opacity: opacityStyle },
          ]}
        >
          <TouchableOpacity
            style={[Layout.center, styles.button]}
            onPress={onScrollToTop}
          >
            <AntDesign
              name="arrowup"
              size={kScaledSize(24)}
              color={Colors.white}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: kSpacing.kSpacing10,
  },
  floatButton: {
    position: "absolute",
    bottom: 35,
    right: 15,
  },
  button: {
    height: kScaledSize(50),
    width: kScaledSize(50),
    borderRadius: kScaledSize(25),
    backgroundColor: Colors.primary,
  },
});

export default HomeScreen;
