import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Pager from './components/Pager';

const SCREEN_TITLES = ['Howw', 'Youu', 'Doinnn', 'Omer', 'Quadri?'];

export const ScrollViewInterpolate = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    // Value needed to calulate horizontal screen offset
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      horizontal
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {SCREEN_TITLES.map((word, idx) => (
        <Pager key={idx} title={word} index={idx} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
