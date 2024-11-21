import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/ResponsiveSize';
import MyText from '../../components/MyText';
import MyButton from '../../components/MyButton';
import NavigationString from '../../constants/NavigationString';
import {useNavigation} from '@react-navigation/native';
import MyTextInput from '../../components/MyTextInput';
import FontFamily from '../../constants/FontFamily';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {showError} from '../../helpers/Utils';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Veuillez renseignez votre adresse e-mail !'),
});

export default function EmailInputScreen() {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async values => {
      // const response = await login(values);
      // if (response.data.success) {
      //   navigation.navigate(NavigationString.OTP, {
      //     isSignin: true,
      //     activationToken: response.data.activationToken,
      //   });
      // } else {
      //   showError(response.error.message);
      // }
      navigation.navigate(NavigationString.VERIFY_CODE_SCREEN);
    },
  });

  return (
    <Screen>
      <Header leftText={t('EMAIL_INPUT_SCREEN_TITLE')} />
      <KeyboardAvoidingView
        style={{flex: 1, margin: moderateScale(16)}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.8}}>
              <MyText
                style={styles.descStyle}
                text={t('EMAIL_INPUT_SCREEN_DESCRIPTION')}
              />

              <MyTextInput
                value={formik.values.email}
                placeholder={t('ADRESS_EMAIL_TXT')}
                errorText={formik.errors.email}
                onChangeText={formik.handleChange('email')}
              />
            </View>
            <View style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                marginBottom: moderateScaleVertical(16),
              }}>
              <MyButton
                text={t('NEXT_TXT')}
                disabled={formik.errors.email || formik.isSubmitting}
                onPress={formik.handleSubmit}
                isLoading={formik.isSubmitting}
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
