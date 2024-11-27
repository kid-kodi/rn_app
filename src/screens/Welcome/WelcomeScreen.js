import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import {useTranslation} from 'react-i18next';
import Colors from '../../constants/Colors';
import {TouchableOpacity} from 'react-native';
import {
  moderateScale,
  width,
  height,
  textScale,
  moderateScaleVertical,
} from '../../styles/ResponsiveSize';
import ImagePath from '../../constants/ImagePath';
import FontFamily from '../../constants/FontFamily';
import NavigationString from '../../constants/NavigationString';

export default function WelcomeScreen({navigation}) {
  const {t, i18n} = useTranslation();
  return (
    <Screen>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.logoStyle}
          source={ImagePath.icLogo}
        />
        <Text style={styles.headingStyle}>{t('WELCOME_TO_CHATBES')}</Text>
        <Text style={styles.descStyle}>
          {t('READ_OUR')}
          <Text style={{color: Colors.blueLight}}> {t('PRIVACY_POLICY')}</Text>
          {t('TAP_AGREE_AND_CONTINUE_TO_ACCEEPT_THE')}
          <Text style={{color: Colors.blueLight}}>
            {' '}
            {t('TERMS_OF_SERVICE')}
          </Text>
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationString.SIGNUP_SCREEN)}
          activeOpacity={0.7}>
          <Text style={styles.agreeStyle}>{t('AGREE_AND_CONTINUE')}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoStyle: {width: 100, height: 100, alignSelf: 'center'},
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(16),
    alignItems: 'center',
  },
  logoStyle: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(150 / 2),
  },
  headingStyle: {
    fontSize: textScale(32),
    fontFamily: FontFamily.bold,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  descStyle: {
    fontSize: textScale(16),
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginTop: moderateScaleVertical(32),
  },
  agreeStyle: {
    fontSize: textScale(22),
    fontFamily: FontFamily.bold,
    fontWeight: 'bold',
    marginTop: moderateScaleVertical(32),
    color: Colors.blueLight,
    alignSelf: 'center',
  },
});
