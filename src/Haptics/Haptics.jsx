import * as React from 'react';
import { StyleSheet, View, Text, Button, Vibration } from 'react-native';
import { Title } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

export const HapticsExample = () => {
  // vibrate is platform specific. default is 400ms
  const vibrate = (milliSeconds) => {
    if (Platform.OS === 'ios') {
      // this logic works in android too. you could omit the else statement
      const interval = setInterval(() => Vibration.vibrate(), milliSeconds);
      // it will vibrate for 5 seconds
      setTimeout(() => clearInterval(interval), milliSeconds);
    } else {
      Vibration.vibrate(milliSeconds);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={{ marginVertical: 10 }}>React Native Vibration API</Title>
      <View style={styles.buttonContainer}>
        <Button title="Light" onPress={() => vibrate(100)} />
        <Button title="Medium" onPress={() => vibrate(200)} />
        <Button title="Heavy" onPress={() => vibrate(400)} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Short" onPress={() => vibrate(1000)} />
        <Button title="Medium" onPress={() => vibrate(2000)} />
        <Button title="Pattern" onPress={() => vibrate([100, 400, 300])} />
      </View>

      <Title style={{ marginVertical: 10 }}>React Native Expo Haptics</Title>
      <Text style={styles.text}>Haptics.selectionAsync</Text>
      <View style={styles.buttonContainer}>
        <Button title="Selection" onPress={() => Haptics.selectionAsync()} />
      </View>
      <Text style={styles.text}>Haptics.notificationAsync</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Success"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          }
        />
        <Button
          title="Error"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
          }
        />
        <Button
          title="Warning"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
          }
        />
      </View>
      <Text style={styles.text}>Haptics.impactAsync</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Light"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        />
        <Button
          title="Medium"
          onPress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        />
        <Button
          title="Heavy"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
});
