import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../../components/Screen'
import { moderateScale, width } from '../../styles/ResponsiveSize';
import { useUser } from '../../contexts/UserProvider';
import DataItem from '../../components/DataItem';
import Colors from '../../constants/Colors';
import NavigationString from '../../constants/NavigationString';

export default function ProfileScreen({navigation}) {
  const {user, logout} = useUser();

  const onLogout = async () => {
    await logout();
  };
  return (
    <Screen>
      <View style={{flex: 1, padding: moderateScale(16)}}>
        <DataItem
          image={user?.profilePicture}
          imageStyle={{borderRadius: 50, width: 70, height: 70}}
          title={`${user?.fullName}`}
          subTitle={user?.email}
          type="link"
          onPress={() => navigation.navigate(NavigationString.EDIT_PROFILE_SCREEN)}
        />
        <View
          style={{
            height: 1,
            marginVertical: 10,
            backgroundColor: Colors.gray7,
          }}
        />
        <DataItem
          icon="settings"
          title="Settings"
          type="link"
          onPress={() => navigation.navigate(NavigationString.SETTING_SCREEN)}
        />
        <DataItem
          icon="log-out-outline"
          title="Logout"
          type="link"
          onPress={onLogout}
        />
      </View>
    </Screen>
  )
}

// define your styles
const styles = StyleSheet.create({
  boxView: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  imgStyle: {
    width: width / 3,
    height: width / 3,
    borderWidth: 0.5,
  },
});
