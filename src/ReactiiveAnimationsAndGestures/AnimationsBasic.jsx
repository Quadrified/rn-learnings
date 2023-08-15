import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export const AnimationsBasic = (props) => {
  const progress = useSharedValue(0.5);
  const scale = useSharedValue(1);

  const handleRotation = (progress) => {
    // using "worklet" to run function on UI thread to use in
    // Reanimated hooks like useAnimatedStyle
    'worklet';
    return `${progress * 2 * Math.PI}rad`;
  };

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * 100) / 2,
      transform: [
        { scale: scale.value },
        { rotate: handleRotation(progress.value) },
      ],
    };
  }, []);

  useEffect(() => {
    // progress.value = withTiming(1);
    // scale.value = withTiming(2);
    // -1 for infinite
    progress.value = withRepeat(withSpring(1), 3, true);
    scale.value = withRepeat(withSpring(2), 3, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.square, reanimatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'navy',
    borderRadius: 12,
  },
});
