import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useTranslation } from 'react-i18next';
import Screen from '../../components/Screen';
import Header from '../../components/Header';

export default function PhoneInputScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <Header leftText={t('ENTER_YOUR_PHONE_NUMBER')}/>
      <Text style={styles.text}>{t('welcome')}</Text>
      <Text>PhoneInputScreen</Text>
    </Screen>
  )
}

const styles = StyleSheet.create({})