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
import MyText from '../../components/MyText';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/ResponsiveSize';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import FontFamily from '../../constants/FontFamily';
import RoundImage from '../../components/RoundImage';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';

export default function ProfileSetupScreen() {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [image, setImage] = useState();

  const selectPhoto = async () => {};
  const onDone = async () => {};

  return (
    <Screen>
      <Header leftText="Modifier votre profile" />
      <KeyboardAvoidingView
        style={{flex: 1, margin: moderateScale(16)}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={{flex: 0.8}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  marginBottom: 10,
                }}>
                <RoundImage onPress={selectPhoto} image={image} />
                <MyText
                  style={styles.descStyle}
                  text="Enter your name and add an optional profile picture"
                />
              </View>

              <MyTextInput placeholder="Votre nom (pour des notifications)" />
            </View>

            <View
              style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                marginBottom: moderateScaleVertical(16),
              }}>
              <MyButton text={t('DONE_TXT')} onPress={onDone} />
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
    flex: 1,
    flexWrap: 'wrap',
  },
});
