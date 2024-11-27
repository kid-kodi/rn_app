import {StyleSheet, Text, FlatList, View, Alert} from 'react-native';
import React, {useState} from 'react';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import {
  height,
  moderateScale,
  moderateScaleVertical,
} from '../../styles/ResponsiveSize';
import {useTranslation} from 'react-i18next';
import Fab from '../../components/Fab';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import NavigationString from '../../constants/NavigationString';
import MyImage from '../../components/MyImage';
import {TouchableOpacity} from 'react-native';
import {useChat} from '../../contexts/ChatProvider';
import LastMessage from '../../components/LastMessage';

export default function ChatListScreen() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {chats, removeChats} = useChat();

  const [selectedItems, setSelectedItems] = useState([]);
  const [isMultiSelectMode, setMultiSelectMode] = useState(false);

  // Toggle selection of items
  const toggleSelection = item => {
    setSelectedItems(prev => {
      const alreadySelected = prev.find(i => i._id === item._id);
      if (alreadySelected) {
        return prev.filter(i => i._id !== item._id); // Remove from selection
      } else {
        return [...prev, item]; // Add to selection
      }
    });
  };

  // Handle long press to enable multi-select mode
  const handleLongPress = item => {
    setMultiSelectMode(true);
    toggleSelection(item); // Select the item
  };

  // Bulk delete selected items
  const handleDelete = () => {
    if (selectedItems.length === 0) return;

    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${selectedItems.length} item(s)?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeChats(selectedItems);
            setSelectedItems([]);
            setMultiSelectMode(false);
          },
        },
      ],
    );
  };

  // Exit multi-select mode
  const cancelMultiSelect = () => {
    setSelectedItems([]);
    setMultiSelectMode(false);
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{t('NO_ITEMS')}</Text>
    </View>
  );

  const renderItem = ({item}) => {
    const isSelected = selectedItems.some(sel => sel._id === item._id);
    return (
      <>
        {item.isGroupChat ? (
          <TouchableOpacity
            onPress={() => {
              isMultiSelectMode
                ? toggleSelection(item)
                : navigation.navigate(NavigationString.CHAT_SCREEN, {
                    chatId: item._id,
                  });
            }}
            onLongPress={() => handleLongPress(item)}
            style={[
              styles.itemWrapperStyle,
              isSelected && {backgroundColor: '#d3f4ff'},
            ]}>
            <MyImage
              imageStyle={styles.itemImageStyle}
              url={item?.image?.name}
            />
            <View style={styles.contentWrapperStyle}>
              <Text style={styles.txtNameStyle}>{`${item.chatName}`}</Text>
              {item.lastMessage && (
                <LastMessage
                  type={item.lastMessage.type}
                  content={item.lastMessage.content}
                />
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              isMultiSelectMode
                ? toggleSelection(item)
                : navigation.navigate(NavigationString.CHAT_SCREEN, {
                    chatId: item._id,
                  });
            }}
            onLongPress={() => handleLongPress(item)}
            style={[
              styles.itemWrapperStyle,
              isSelected && {backgroundColor: '#d3f4ff'},
            ]}>
            <MyImage
              imageStyle={styles.itemImageStyle}
              url={item?.users[0].profilePicture}
            />
            <View style={styles.contentWrapperStyle}>
              <Text
                style={styles.txtNameStyle}>{`${item.users[0].fullName}`}</Text>
              {item.lastMessage && (
                <LastMessage
                  type={item.lastMessage.type}
                  content={item.lastMessage.content}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <Screen>
      <Header isLeftImage={false} leftText="Chats" />
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={renderEmptyComponent}
        style={styles.FlatList}
      />
      <Fab
        icon={'add-outline'}
        onPress={() => navigation.navigate(NavigationString.NEW_CHAT_SCREEN)}
        color={Colors.whiteColor}
      />
      {/* Action Buttons */}
      {isMultiSelectMode && (
        <View style={styles.actionBar}>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={cancelMultiSelect}
            style={styles.actionButton}>
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  FlatList: {
    flex: 1,
  },
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'center',
    gap: 5,
  },
  txtNameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: moderateScaleVertical(16),
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    height: height - 125,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(16),
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
