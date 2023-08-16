import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Switch,
  Dimensions,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFFFFF',
    text: '#1E1E1E',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256,0,256, 0.2)',
  false: 'rgba(0,0,0, 0.1)',
};

const SIZE = Dimensions.get('window').width * 0.7;

export const InterpolateColorsBasic = () => {
  const [theme, setTheme] = useState('light');

  const progress = useDerivedValue(() => {
    // Returns "Shared Value" and allows calculations before returning
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );

    return { backgroundColor };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );

    return { backgroundColor };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );

    return { color };
  });

  return (
    <>
      <StatusBar
        animated
        backgroundColor={
          theme === 'light' ? Colors.light.background : Colors.dark.background
        }
      />
      <Animated.View style={[styles.container, rStyle]}>
        <Animated.Text style={[styles.text, rTextStyle]}>THEME</Animated.Text>
        <Animated.View style={[styles.circle, rCircleStyle]}>
          <Switch
            value={theme === 'dark'}
            onValueChange={(toggled) => {
              setTheme(toggled ? 'dark' : 'light');
            }}
            trackColor={SWITCH_TRACK_COLOR}
            thumbColor="violet"
          />
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: Colors.light.circle,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    elevation: 8,
  },
  text: {
    fontSize: 50,
    fontWeight: '700',
    letterSpacing: 15,
    marginVertical: 10,
  },
});
