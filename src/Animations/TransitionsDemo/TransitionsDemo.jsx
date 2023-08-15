import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AnimatedCard } from './AnimatedCard';

export const TransitionDemo = () => {
  const [toggled, setToggle] = useState(false);

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, toggled }} />
      ))}
      <Button
        label={toggled ? 'Reset' : 'Start'}
        primary
        onPress={() => setToggle((prev) => !prev)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'flex-end',
  },
});
