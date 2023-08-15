import React from 'react';
import { enableLatestRenderer } from 'react-native-maps';

import { FlashListExample } from './src/FlashList';
import { ExpoLocalAuthentication } from './src/BiometricAuthentication';
import { HapticsExample } from './src/Haptics';
import { RNMaps } from './src/RNMaps';
import { RTKCounter, RTKColor, RTKTodoWithApi } from './src/ReduxToolkit';

import { Provider } from 'react-redux';
import { store } from './src/ReduxToolkit/store/store';

// enableLatestRenderer();

const App = () => {
  return (
    <Provider store={store}>
      <RTKTodoWithApi />
    </Provider>
  );
};

export default App;
