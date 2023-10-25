import React from 'react';

import { FlashListExample } from './src/FlashList';

import { ExpoLocalAuthentication } from './src/BiometricAuthentication';

import { HapticsExample } from './src/Haptics';

import { enableLatestRenderer } from 'react-native-maps';
import { RNMaps } from './src/RNMaps';

import { Provider } from 'react-redux';
import { store } from './src/ReduxToolkit/store/store';
import { RTKCounter, RTKColor, RTKTodoWithApi } from './src/ReduxToolkit';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  AnimationWorklets,
  PanGestureHandlerDemo,
  TransitionsDemo,
} from './src/Animations/WilliamCandillonAnimations';

import {
  AnimationsBasic,
  InterpolateColorsBasic,
  PanGestureBasic,
  PinchGestureHandlerBasic,
  ScrollViewInterpolate,
  TapGesturesBasic,
} from './src/Animations/ReactiiveAnimationsAndGestures';

// enableLatestRenderer();

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TapGesturesBasic />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
