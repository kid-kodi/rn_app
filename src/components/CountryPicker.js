import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useCallback, useState} from 'react';

import countries from '../constants/Countries';
import {TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import FontFamily from '../constants/FontFamily';
import ImagePath from '../constants/ImagePath';
import Header from './Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {textScale} from '../styles/ResponsiveSize';
import Modal from 'react-native-modal';
import HorizontalLine from './HorizontalLine';
import Screen from './Screen';

export default function CountryPicker({fetchCountry = () => {}, value = ''}) {
  const [data, setData] = useState(countries);
  const [showModal, setShowModal] = useState(false);

  const renderItem = useCallback(
    ({item, index}) => {
      let isSelected = value == item.name;
      return (
        <TouchableOpacity
          style={{marginHorizontal: 16}}
          activeOpacity={0.7}
          onPress={() => onSelectCountry(item)}>
          <Text
            style={{
              ...styles.nameStyle,
              color: isSelected ? Colors.lightBlue : Colors.black,
              fontFamily: isSelected ? FontFamily.bold : FontFamily.regular,
            }}>
            {item?.name} ({item?.dialCode})
          </Text>
        </TouchableOpacity>
      );
    },
    [data, value],
  );

  const onSelectCountry = item => {
    fetchCountry(item);
    setShowModal(false);
  };

  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={() => setShowModal(true)}>
        <Text style={styles.valueStyle}>{value}</Text>
        <Image style={styles.icForward} source={ImagePath.icForward} />
      </TouchableOpacity>
      <Modal
        style={{backgroundColor: Colors.whiteColor, margin: 0}}
        isVisible={showModal}>
        <Screen style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Header
              leftText="Select your country"
              onPressLeft={() => setShowModal(false)}
            />

            <View>
              <FlatList
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={() => (
                  <HorizontalLine lineStyle={{marginVertical: 12}} />
                )}
                ListHeaderComponent={() => <View style={{height: 20}} />}
              />
            </View>
          </View>
        </Screen>
      </Modal>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.gray2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  valueStyle: {
    color: Colors.blueLight,
    fontFamily: FontFamily.bold,
    fontSize: textScale(18),
  },
  nameStyle: {
    color: Colors.blueLight,
    fontFamily: FontFamily.regular,
    fontSize: textScale(16),
  },
  icForward : {
    width:15,
    height:15
  }
});
