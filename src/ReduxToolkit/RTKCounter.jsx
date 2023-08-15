import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  decrementByAmount,
  incrementByAmount,
  reset,
} from './store/slices/counterSlice';

export const RTKCounter = (props) => {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.counter.count);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container?.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={{ fontSize: 30, marginVertical: 10 }}>
          Redux Toolkit Counter
        </Text>
        <Text style={{ fontSize: 30, marginVertical: 10 }}>{count}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onPress={() => dispatch(decrement())}
            mode="contained"
            labelStyle={{ fontSize: 25 }}
            contentStyle={{
              padding: 10,
            }}
            style={{
              marginHorizontal: 10,
            }}
          >
            -
          </Button>
          <Button
            onPress={() => dispatch(increment())}
            mode="contained"
            labelStyle={{ fontSize: 25 }}
            contentStyle={{
              padding: 10,
            }}
            style={{
              marginHorizontal: 10,
            }}
          >
            +
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            onPress={() => dispatch(decrementByAmount(5))}
            mode="contained"
            style={{
              margin: 20,
            }}
          >
            Decrement by 5
          </Button>
          <Button
            onPress={() => dispatch(incrementByAmount(5))}
            mode="contained"
            style={{
              margin: 20,
            }}
          >
            Increment by 5
          </Button>
        </View>

        <Button
          onPress={() => dispatch(reset())}
          mode="contained"
          style={{
            margin: 20,
          }}
        >
          RESET
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
});
