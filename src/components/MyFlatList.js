import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

export default function MyFlatList({
  data,
  renderItem,
  keyExtractor,
  onEndReached,
  isLoading,
  onEndReachedThreshold = 0.5,
  ListFooterComponent,
  ListHeaderComponent,
}) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
