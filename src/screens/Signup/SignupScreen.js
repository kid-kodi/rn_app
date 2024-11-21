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

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Veuillez renseignez votre adresse e-mail !'),
  password: Yup.string().required('Mot de passe requis'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Les mots de passe doivent correspondre',
  ),
});

export default function SignupScreen() {
  const {signup} = useUser()
  const navigation = useNavigation();
  const {t} = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async values => {
      const response = await signup(values);
      if (response && response.success) {
        navigation.navigate(NavigationString.VERIFY_CODE_SCREEN, {
          activationToken: response.activationToken,
        });
      } else {
        console.log(response)
        showError(response.error.message);
      }
    },
  });

  return (
    <Screen>
      <Header leftText={t('SIGNUP')} />
      <KeyboardAvoidingView
        style={{flex: 1, margin: moderateScale(16)}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.8}}>
              <MyText style={styles.descStyle} text={t('SIGNUP_DESCRIPTION')} />

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

              <MyTextInput
                value={formik.values.confirmPassword}
                placeholder={t('CONFIRM_PASSWORD')}
                secureTextEntry={true}
                errorText={formik.errors.confirmPassword}
                onChangeText={formik.handleChange('confirmPassword')}
              />
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                marginBottom: moderateScaleVertical(16),
              }}>
              <MyButton
                text={t('CREATE_ACCOUNT')}
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
