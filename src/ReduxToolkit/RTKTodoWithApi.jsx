import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, selectAllTodos } from './store/slices/todoSlice';

export const RTKTodoWithApi = (props) => {
  const dispatch = useDispatch();

  //   const todos = useSelector((state) => state.todos.todos);

  const todos = useSelector(selectAllTodos);
  console.log('>>>todos<<<', todos);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container?.backgroundColor}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Button mode="contained" onPress={() => dispatch(fetchTodos())}>
          Fetch Todos
        </Button>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
});
