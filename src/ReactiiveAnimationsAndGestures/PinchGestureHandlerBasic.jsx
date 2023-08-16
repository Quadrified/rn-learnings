import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { height, width } from '../Animations/utils';

const IMAGE_URI =
  'https://images.unsplash.com/photo-1691663477014-165c5f1d5fe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=788&q=80';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const PinchGestureHandlerBasic = (props) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      // Setting bound: returning size to original size on end of pinch
      scale.value = withTiming(1);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={{ flex: 1 }}>
        <AnimatedImage
          source={{ uri: IMAGE_URI }}
          style={[styles.image, rStyle]}
        />
        <Animated.View style={[styles.focalPoint, focalPointStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  focalPoint: {
    ...StyleSheet.absoluteFill,
    width: 20,
    height: 20,
    backgroundColor: 'navy',
    borderRadius: 10,
  },
});
