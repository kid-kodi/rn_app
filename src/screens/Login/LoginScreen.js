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
import { useUser } from '../../contexts/UserProvider';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Veuillez renseignez votre adresse e-mail !'),
  password: Yup.string().required('Mot de passe requis'),
});

export default function LoginScreen() {
  const {login} = useUser()
  const {t} = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async values => {
      const response = await login(values);
      if (!response.success) {
        showError(response.error.message);
      }
    },
  });

  return (
    <Screen>
      <Header leftText={t('LOGIN')} />
      <KeyboardAvoidingView
        style={{flex: 1, margin: moderateScale(16)}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.8}}>
              <MyText style={styles.descStyle} text={t('LOGIN_DESCRIPTION')} />

              <MyTextInput
                value={formik.values.email}
                placeholder={t('ADRESS_EMAIL_TXT')}
                errorText={formik.errors.email}
                onChangeText={formik.handleChange('email')}
              />

              <MyTextInput
                value={formik.values.password}
                placeholder={t('PASSWORD')}
                secureTextEntry={true}
                errorText={formik.errors.password}
                onChangeText={formik.handleChange('password')}
              />

            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                marginBottom: moderateScaleVertical(16),
              }}>
              <MyButton
                text={t('LOGIN_ACCOUNT')}
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