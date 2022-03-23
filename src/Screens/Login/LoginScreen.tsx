import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../Hooks/RTKHooks';
import { Header } from '../../Components/Headers';
import Layout from '../../Themes/Layout';
import { Button } from '../../Components/Buttons';
import { AppLoader } from '../../Components/Loaders';
import { authGetToken } from '../../Store/AuthSlice';

const LoginScreen: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const onGetToken = async (): Promise<void> => {
    const details = {
      client_id: 'svc-adapter',
      grant_type: 'client_credentials',
      client_secret: '62ca3e28-2878-473c-8956-22f5cf288b3a',
      scope: 'openid',
    };
    await dispatch(authGetToken(details)).unwrap();
  };

  return (
    <View style={styles.container}>
      <Header name="VNPT iGate Review" showBackButton={false} />
      {isLoading && <AppLoader />}
      <View style={[Layout.fill, Layout.center]}>
        <Button title="Lấy Token" onPress={onGetToken} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
