# Animations
- RN Reanimated gives following hooks:

| Purpose                                 | Hook                                           |
| --------------------------------------- | ---------------------------------------------- |
| useSharedValue() & useDerivedValue()    | Create Values (similar to useState())          |
| useAnimatedGestureHandler()             | Bind to Gestures                               |
| useAnimatedStyle() & useAnimatedProps() | Animate styles and Properties                  |
| useAnimatedReaction()                   | Apply to side-effects (similar to useEffect()) |

- Bable Plugin responsible for packaging animation worklets and run on UI thread

- When creating gestures and animations:
  - Create animation values
  - Bind Gesture handlers with animation values
  - Assign animation values throught properties of RN Components (ex. Animated Styles for Views)

- Transitions

|        | React State | Animation Value |
| ------ | ----------- | --------------- |
| Timing | useTiming() | withTiminng()   |
| Spring | useSpting() | withSpring()    |
