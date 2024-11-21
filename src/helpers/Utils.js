import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

export const storeData = async (key, value) => {
  try {
    var jsonValue = value;
    if (typeof value !== 'string') {
      jsonValue = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    return e;
  }
};

export const getData = async key => {
  try {
    const res = await AsyncStorage.getItem(key);
    return res != null
      ? typeof res !== 'string'
        ? JSON.parse(res)
        : res
      : null;
  } catch (e) {
    return e;
    // error reading value
  }
};

export const showError = message => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
    duration: 2500,
  });
};

export const showSucess = message => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
    duration: 2500,
  });
};

export const formatToDate = timestamp => {
  return moment(timestamp).format('LL');
};

export const formatToTime = timestamp => {
  return moment(timestamp).format('h:mm A');
};

export const formatChatDate = date => {
  const now = moment();
  const inputDate = moment(date);

  if (inputDate.isSame(now, 'day')) {
    return inputDate.format('h:mm'); // Today
  } else if (inputDate.isSame(now.subtract(1, 'days'), 'day')) {
    return 'Hier';
  } else if (inputDate.isSame(now, 'week')) {
    return inputDate.format('dddd'); // Same week
  } else {
    return inputDate.format('MMM D, YYYY'); // Older
  }
};

export const formatDate = rawDate => {
  let date = new Date(rawDate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${day}/${month}/${year}`;
};

export const TimeAgo = timestamp => {
  return moment(timestamp).fromNow();
};
