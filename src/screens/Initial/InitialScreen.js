import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/ResponsiveSize';
import ImagePath from '../../constants/ImagePath';
import MyText from '../../components/MyText';
import Colors from '../../constants/Colors';
import {useTranslation} from 'react-i18next';
import MyButton from '../../components/MyButton';
import NavigationString from '../../constants/NavigationString';
import FontFamily from '../../constants/FontFamily';
import { useNavigation } from '@react-navigation/native';

export default function InitialScreen() {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const privacyPolicy = () => {};

  return (
    <Screen>
      <View style={{flex: 1, padding: moderateScale(16), alignItems: 'center'}}>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <Image style={styles.logoStyle} source={ImagePath.icLogo} />
        </View>

        <View style={{flex: 0.7, justifyContent: 'flex-end'}}>
          <MyText
            text={t('BY_CLICKING_LOG_IN')}
            style={{marginVertical: moderateScale(42)}}>
            <Text
              style={{color: Colors.blueColor}}
              onPress={() => privacyPolicy(1)}>
              {t('TERMS')}
            </Text>
            . {t('LEARN_HOW_WE_PRCOESS')}
            <Text
              style={{color: Colors.blueColor}}
              onPress={() => privacyPolicy(2)}>
              {' '}{t('PRIVACY_POLICY')}
            </Text>
          </MyText>

          <MyButton
            text={t('LOG_IN_WITH_PHONE_NUMBER')}
            onPress={() => navigation.navigate(NavigationString.LOGIN_SCREEN)}
          />

          <MyText
            text={t('OR')}
            style={{
              alignSelf: 'center',
              marginVertical: moderateScaleVertical(16),
            }}
          />

          <MyButton
            text={t('LOG_IN_WITH_GOOGLE')}
            textStyle={{color: Colors.blackColor}}
            style={{
              backgroundColor: Colors.gray4,
            }}
            leftImg={ImagePath.icGoogle}
          />
          <MyButton
            text={t('LOG_IN_WITH_FACEBOOK')}
            style={{
              marginVertical: moderateScaleVertical(16),
              backgroundColor: Colors.gray4,
            }}
            textStyle={{color: Colors.blackColor}}
            leftImg={ImagePath.icFacebook}
          />
          <MyButton
            text={t('LOG_IN_WITH_APPLE')}
            textStyle={{color: Colors.blackColor}}
            style={{
              backgroundColor: Colors.gray4,
            }}
            leftImg={ImagePath.icApple}
          />

          <MyText
            style={{
              textAlign: 'center',
              fontFamily: FontFamily.medium,
              marginVertical: 16,
            }}>
            {t('NEW_HERE')}
            <Text
              onPress={() => navigation.navigate(NavigationString.SIGNUP)}
              style={{
                color: Colors.blueColor,
                fontFamily: FontFamily.semiBold,
              }}>
              {t('SIGN_UP')}
            </Text>
          </MyText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoStyle: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(150 / 2),
  },
});
