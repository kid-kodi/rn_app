import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import MyText from '../../components/MyText';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/ResponsiveSize';
import {useTranslation} from 'react-i18next';

import FontFamily from '../../constants/FontFamily';
import RoundImage from '../../components/RoundImage';
import MyTextInput from '../../components/MyTextInput';
import MyButton from '../../components/MyButton';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {getData, showError} from '../../helpers/Utils';
import { useUser } from '../../contexts/UserProvider';

const ProfileSetupSchema = Yup.object().shape({
  fullName: Yup.string().required('Entrer votre nom requis'),
});

export default function ProfileSetupScreen() {
  const {editProfile, uploadPhoto} = useUser();
  const {t} = useTranslation();

  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const selectPhoto = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      setIsLoading(true);
      const response = await uploadPhoto(image);
      console.log(response)
      setImage(response.data.name);
      setIsLoading(false);
    });
  };

  const formik = useFormik({
    initialValues: {
      profilePicture: '',
      fullName: '',
    },
    validationSchema: ProfileSetupSchema,
    onSubmit: async values => {
      values.profilePicture = image;
      values.isAccounSet = true;
      const response = await editProfile(values);
      if (!response.success) {
        showError(response.error.message);
      }
    },
  });

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

              <MyTextInput
                placeholder="Votre nom (pour des notifications)"
                value={formik.values.fullName}
                errorText={formik.errors.fullName}
                onChangeText={formik.handleChange('fullName')}
              />
            </View>

            <View
              style={{
                flex: 0.2,
                justifyContent: 'flex-end',
                marginBottom: moderateScaleVertical(16),
              }}>
              <MyButton
                text={t('DONE_TXT')}
                disabled={formik.errors.fullName || formik.isSubmitting}
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
    flex: 1,
    flexWrap: 'wrap',
  },
});
