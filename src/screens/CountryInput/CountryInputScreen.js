import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/ResponsiveSize';
import MyText from '../../components/MyText';
import FontFamily from '../../constants/FontFamily';
import CountryPicker from '../../components/CountryPicker';
import MyButton from '../../components/MyButton';
import {useNavigation} from '@react-navigation/native';
import NavigationString from '../../constants/NavigationString';

export default function CountryInputScreen() {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [selectedCountry, setSelectedCountry] = useState({
    name: 'India',
    dialCode: '+91',
    isoCode: 'IN',
    flag: 'https://cdn.kcak11.com/CountryFlags/countries/in.svg',
  });

  const fetchCountry = data => {
    setSelectedCountry(data);
  };

  return (
    <Screen>
      <Header leftText={t('COUNTRY_INPUT_SCREEN_TITLE')} />

      <KeyboardAvoidingView
        style={{flex: 1, margin: moderateScale(16)}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.8}}>
              <MyText
                style={styles.descStyle}
                text={t('COUNTRY_INPUT_SCREEN_DESCRIPTION')}
              />
              <CountryPicker
                fetchCountry={fetchCountry}
                value={selectedCountry?.name}
              />
            </View>
            <View style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                marginBottom: moderateScaleVertical(16),
              }}>
              <MyButton
                text={t('NEXT_TXT')}
                onPress={() =>
                  navigation.navigate(NavigationString.EMAIL_INPUT_SCREEN)
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  descStyle: {
    fontSize: textScale(16),
    fontFamily: FontFamily.regular,
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(32),
  },
});
