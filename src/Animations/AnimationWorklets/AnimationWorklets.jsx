import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { runOnUI } from 'react-native-reanimated';

export const AnimationWorklets = (props) => {
  const sayHello = (who) => {
    'worklet';
    console.log(`Hello from the ${who} thread!`);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container?.backgroundColor}
      />
      <View style={styles.container}>
        <View style={styles.container}>
          <Button
            mode="contained"
            style={{ marginVertical: 20 }}
            onPress={() => sayHello('JS')}
          >
            Say Hello from JS Thread
          </Button>
          <Button mode="contained" onPress={() => runOnUI(sayHello)('UI')}>
            Say Hello on UI Thread
          </Button>
        </View>
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
