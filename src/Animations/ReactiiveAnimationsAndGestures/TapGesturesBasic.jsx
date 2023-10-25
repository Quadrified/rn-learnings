import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import HeartImage from './assets/heart.png';
import InstaImage from './assets/image.jpeg';
import { width } from '../utils';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const TapGesturesBasic = (props) => {
  const doubleTapRef = useRef();

  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const rTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
        <TapGestureHandler
          ref={doubleTapRef}
          maxDelayMs={250}
          numberOfTaps={2}
          onActivated={onDoubleTap}
        >
          <Animated.View>
            <ImageBackground source={InstaImage} style={styles.image}>
              <Animated.Image
                source={HeartImage}
                style={[styles.image, rStyle]}
                resizeMode="center"
              />
            </ImageBackground>
            <Animated.Text style={[styles.text, rTextStyle]}>
              👨🏻‍💻👨🏻‍💻👨🏻‍💻👨🏻‍💻👨🏻‍💻👨🏻‍💻👨🏻‍💻
            </Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
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
  image: {
    width: width,
    height: width,
  },
  text: {
    fontSize: 30,
    marginVertical: 20,
    textAlign: 'center',
  },
});
