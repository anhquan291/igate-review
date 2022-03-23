import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import Colors from '../../Themes/Colors';
import Layout from '../../Themes/Layout';
import { kScaledSize } from '../../Utils/Constants';

const AppLoader = (props: any) => {
  return (
    <View
      style={[
        Layout.fillAbsolute,
        Layout.center,
        Layout.fullSize,
        { ...props.style },
      ]}
    >
      <View style={[styles.loader, Layout.center]}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  loader: {
    padding: kScaledSize(15),
    backgroundColor: Colors.white,
    borderRadius: 5,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
});
