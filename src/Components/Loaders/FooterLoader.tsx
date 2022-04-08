import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../Themes/Colors';

interface Props {
  loading: boolean;
  page: number;
}

const FooterLoader = ({ loading, page }: Props) => {
  if (loading && page !== 0) {
    return (
      <ActivityIndicator style={styles.indicator} size="small" color={Colors.primary} />
    );
  }
  return null;
};

export default FooterLoader;

const styles = StyleSheet.create({
  indicator: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
