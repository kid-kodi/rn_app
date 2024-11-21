import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/ResponsiveSize';
import MyText from '../../components/MyText';
import OTPTextView from 'react-native-otp-textinput';
import Colors from '../../constants/Colors';
import MyButton from '../../components/MyButton';
import FontFamily from '../../constants/FontFamily';
import NavigationString from '../../constants/NavigationString';
import {useTranslation} from 'react-i18next';
import {showError, storeData} from '../../helpers/Utils';
import { useUser } from '../../contexts/UserProvider';

export default function VerifyCodeScreen({navigation, route}) {
  const {otpActivation} = useUser();
  const {t} = useTranslation();

  const [timer, setTimer] = useState(59);
  const [isLoading, setLoading] = useState(false);

  const {activationToken, isSignin} = route?.params || {};

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timer]);

  const [otpInput, setOtpInput] = useState('');

  const input = useRef(null);

  const handleCellTextChange = async (text, i) => {};

  const onResendCode = () => {
    setTimer(59);
  };

  const onDone = async () => {
    const response = await otpActivation({
      activation_token: activationToken,
      activation_code: otpInput,
    });
    if (response && response.success) {
      await storeData('user', response.token);
      navigation.navigate(NavigationString.PROFILE_SETUP_SCREEN);
    } else {
      console.log(response);
      showError(response.error.message);
    }
  };

  return (
    <Screen>
      <Header leftText={t('VERIFY_CODE_SCREEN_TITLE')} />

      <KeyboardAvoidingView
        style={{flex: 1, margin: moderateScale(16)}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.8}}>
              <MyText
                style={styles.headerStyle}
                text={t('ENTER_THE_FOUR_DIGIT') + ` xyz@gmail.com`}
              />
              <MyText
                onPress={() => navigation.goBack()}
                style={{
                  ...styles.descStyle,
                  color: Colors.blueColor,
                  fontFamily: FontFamily.semiBold,
                }}
                text={t('EDIT_MY_EMAIL')}
              />

              <OTPTextView
                ref={input}
                textInputStyle={styles.textInputContainer}
                handleTextChange={setOtpInput}
                handleCellTextChange={handleCellTextChange}
                inputCount={4}
                keyboardType="numeric"
                autoFocus
                tintColor={Colors.whiteColor}
                offTintColor={Colors.whiteColorOpacity40}
              />
            </View>

            <View
              style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                marginBottom: moderateScaleVertical(16),
              }}>
              {timer > 0 ? (
                <MyText
                  style={{
                    ...styles.descStyle,
                    marginBottom: 12,
                  }}
                  text={t('RESEND_CODE') + ' ' + t('RESEND_CODE_IN')}>
                  <Text>{timer}</Text>
                </MyText>
              ) : (
                <MyText
                  onPress={onResendCode}
                  style={styles.resendCodeStyle}
                  text={t('RESEND_CODE')}
                />
              )}
              <MyButton
                text={t('DONE_TXT')}
                onPress={onDone}
                isLoading={isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(24),
    fontFamily: FontFamily.medium,
  },
  descStyle: {
    fontSize: textScale(12),
    fontFamily: FontFamily.regular,
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(52),
  },
  textInputContainer: {
    backgroundColor: Colors.gray2,
    borderBottomWidth: 0,
    borderRadius: 8,
    color: Colors.whiteColor,
  },
  resendCodeStyle: {
    fontSize: textScale(14),
    fontFamily: FontFamily.regular,
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },
});
