import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Screen from '../../components/Screen';
import {height, moderateScale, width} from '../../styles/ResponsiveSize';
import ImagePath from '../../constants/ImagePath';
import {useUser} from '../../contexts/UserProvider';
import { useNavigation } from '@react-navigation/native';
import NavigationString from '../../constants/NavigationString';

export default function SplashScreen() {
  const navigation = useNavigation();
  const {autoLogin} = useUser();

  useEffect(() => {
    (async () => {
      const response = await autoLogin();
      // if(!response){
      //   navigation.navigate(NavigationString.INITIAL_SCREEN)
      // }
    })();
  }, []);

  return (
    <Screen>
      <View
        style={{
          flex: 1,
          padding: moderateScale(16),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={styles.logoStyle}
          source={ImagePath.icLogo}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoStyle: {width: 80, height: 80, alignSelf: 'center'},
});
