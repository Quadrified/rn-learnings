import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  Vibration,
  Platform,
} from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';

export const ExpoLocalAuthentication = (props) => {
  const [hasBiometrics, setHasBiometrics] = useState(false);
  const [hasSavedBiometrics, setHasSavedBiometrics] = useState(false);
  const [isBiometricValidated, setIsBiometricValidated] = useState(false);

  useEffect(() => {
    const supportedBiometrics = async () => {
      // Checking if Fingerprint scanner exists
      const biometricTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      console.log('>>>biometricTypes<<<', biometricTypes);
    };

    const getBiometricEnrolledLevel = async () => {
      // Checking what level of biometric Auth exists
      const biometricEnrolledLevel =
        await LocalAuthentication.getEnrolledLevelAsync();
      console.log('>>>biometricEnrolledLevel<<<', biometricEnrolledLevel);
    };

    const checkDeviceHasBiometrics = async () => {
      // Checking if Fingerprint scanner exists
      const hasBiometrics = await LocalAuthentication.hasHardwareAsync();
      console.log('>>>hasBiometrics<<<', hasBiometrics);
      setHasBiometrics(hasBiometrics);
    };

    const checkDeviceHasSavedBiometrics = async () => {
      // Checking if there any saved facial or Fingerprint data
      const hasSavedBiometrics = await LocalAuthentication.isEnrolledAsync();
      console.log('>>>hasSavedBiometrics<<<', hasSavedBiometrics);
      setHasSavedBiometrics(hasSavedBiometrics);
    };

    getBiometricEnrolledLevel();
    supportedBiometrics();
    checkDeviceHasBiometrics();
    checkDeviceHasSavedBiometrics();
  }, []);

  const LeftContent = (props) => <Avatar.Icon {...props} icon="fingerprint" />;

  const onValidateFingerPrint = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const localAuthenticationOptions = {
      cancelLabel: 'Cancel',
      promptMessage: 'Validate RN Learning App',
      disableDeviceFallback: false, // When set to true, PIN input will be disabled
    };

    const biometricResult = await LocalAuthentication.authenticateAsync(
      localAuthenticationOptions
    );
    if (biometricResult?.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsBiometricValidated(true);
    } else {
      // Can be used to exit the app when user cancels biometric auth
      //   BackHandler.exitApp();

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    console.log('>>>biometricResult<<<', biometricResult);
  };

  const onReset = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsBiometricValidated(false);
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container?.backgroundColor}
      />
      <View style={styles.container}>
        {hasBiometrics && hasSavedBiometrics && !isBiometricValidated && (
          <Button
            icon="fingerprint"
            mode="contained"
            onPress={onValidateFingerPrint}
          >
            Validate With Fingerprint
          </Button>
        )}
        {!hasBiometrics && <Text>No Fingerprint hardware found</Text>}

        {isBiometricValidated && (
          <Card style={styles.card}>
            <Card.Title
              title="Fingerprint Hardware Exists"
              subtitle="Fingerprint Validated"
              left={LeftContent}
            />
            <Card.Content>
              <Text variant="titleLarge">Wohoo!</Text>
              <Text variant="bodyMedium">
                This card shows when validated with fingerprint
              </Text>
            </Card.Content>
          </Card>
        )}

        {isBiometricValidated && (
          <Button
            icon="fingerprint"
            mode="contained"
            onPress={onReset}
            style={styles.button}
          >
            Reset Biometrics
          </Button>
        )}
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
  card: {
    width: '90%',
    margin: 10,
  },
  button: {
    marginVertical: 15,
  },
});
