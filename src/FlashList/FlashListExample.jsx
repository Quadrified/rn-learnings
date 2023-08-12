import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, StatusBar, Button } from 'react-native';
import { FlashList } from '@shopify/flash-list';

export const FlashListExample = () => {
  const [data, setData] = useState();

  const listRef = useRef(0);

  useEffect(() => {
    const fetcData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/'
      );
      const posts = await response.json();
      setData(posts);
    };
    fetcData();
  }, []);

  const onSnapToItem = () => {
    const index = Math.floor(Math.random() * 100);
    console.log('>>>index<<<', index);
    listRef.current.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item?.title}</Text>
      <Text style={styles.itemText}>{item?.body}</Text>
    </View>
  );

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container?.backgroundColor}
      />
      <View style={styles.container}>
        <FlashList
          ref={listRef}
          data={data}
          keyExtractor={(item) => item?.id}
          estimatedItemSize={200}
          renderItem={renderItem}
        />
        <Button title="Snap to item" onPress={onSnapToItem} />
        <View style={{ height: 20 }} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
  },
  itemContainer: {
    padding: 7,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  itemText: {
    paddingVertical: 5,
  },
});
