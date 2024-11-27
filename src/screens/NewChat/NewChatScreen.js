import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import useDebounce from '../../hooks/useDebounce';
import {useChat} from '../../contexts/ChatProvider';
import {useUser} from '../../contexts/UserProvider';

import Icon from 'react-native-vector-icons/Feather';
import {moderateScale} from '../../styles/ResponsiveSize';
import DataItem from '../../components/DataItem';
import NavigationString from '../../constants/NavigationString';
import {useNavigation} from '@react-navigation/native';

export default function NewChatScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigation = useNavigation();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {searchUsers, user} = useUser();
  const {createChat} = useChat();
  

  useEffect(() => {
    (async () => {
      if (debouncedSearchTerm) {
        // Call API or filter list
        setIsLoading(true);

        const response = await searchUsers({q: searchTerm});
        if (response.users.length > 0) {
          setUsers(response.users);
          setNoResultsFound(false);
        } else if (response.users.length == 0) {
          setUsers([]);
          setNoResultsFound(true);
        }

        setIsLoading(false);
      }
    })();
  }, [debouncedSearchTerm]);

  const userPressed = async _user => {
    const chatUsers = [_user._id, user._id];
    const response = await createChat({
      users: chatUsers,
      isGroupChat : false,
    });
    
    if (response.success) {
      // socket.emit('new_chat', {room: response.data, userId: _user._id});
      navigation.navigate(NavigationString.CHAT_SCREEN, {
        chatId: response.data._id,
      });
    }
  };

  return (
    <Screen>
      <Header leftText="Nouvelle Conversation" />
      <KeyboardAvoidingView
        style={{flex: 1, margin: moderateScale(16)}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={styles.searchContainer}>
              <Icon name="search" size={15} color={Colors.lightGrey} />

              <TextInput
                placeholder={'Rechercher'}
                style={styles.searchBox}
                onChangeText={text => setSearchTerm(text)}
              />
            </View>

            {isLoading && (
              <View style={styles.loadingStyles}>
                <ActivityIndicator size={'large'} color={Colors.primary} />
              </View>
            )}

            {searchTerm === '' && (
              <View>
                <DataItem
                  icon="people"
                  title="New Group"
                  onPress={() =>
                    navigation.navigate(NavigationString.NEW_GROUP_SCREEN)
                  }
                />
              </View>
            )}

            {!isLoading && noResultsFound && (
              <View style={styles.noResultsFoundStyles}>
                <Icon
                  name="cloud-off"
                  size={55}
                  color={Colors.lightGrey}
                  style={styles.noResultsIcon}
                />
                <Text style={styles.noResultsText}>
                  Aucun utilisateur trouvé!
                </Text>
              </View>
            )}

            {!isLoading && !noResultsFound && users && (
              <FlatList
                data={users}
                renderItem={({item}) => {
                  return (
                    <DataItem
                      title={item.fullName}
                      subTitle={item.about}
                      image={item.profilePicture}
                      onPress={() => userPressed(item)}
                    />
                  );
                }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blackOpacity10,
    height: 32,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  searchBox: {
    marginLeft: 8,
    fontSize: 15,
    width: '100%',
    height: 50,
  },
  noResultsFoundStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsIcon: {
    marginBottom: 20,
  },
  noResultsText: {
    color: Colors.textColor,
    fontFamily: 'regular',
    letterSpacing: 0.3,
  },
  chatNameContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.nearlyWhite,
    flexDirection: 'row',
    borderRadius: 5,
  },
  textbox: {
    color: Colors.textColor,
    width: '100%',
    fontFamily: 'regular',
    letterSpacing: 0.3,
  },
  selectedUsersContainer: {
    paddingHorizontal: 20,
    height: 50,
    justifyContent: 'center',
  },
  selectedUsersList: {
    height: '100%',
    paddingTop: 10,
  },
  selectedUserStyle: {
    marginRight: 10,
    marginBottom: 10,
  },
  loadingStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
