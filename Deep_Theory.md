# Day 35 – Frontend Task (23/01/2026)

## Deep Theory: Animations in React Native

---

## 1. React Native Animated API

The Animated API in React Native is used to create smooth and interactive animations.

### Key Concepts:

* Provides declarative animation system.
* Works with `Animated.Value` to store animation values.
* Supports animations like:

  * `timing()` – time-based animation
  * `spring()` – physics-based animation
  * `decay()` – momentum-based animation

### Example:

```js
import { Animated } from 'react-native';
import { useRef } from 'react';

const fadeAnim = useRef(new Animated.Value(0)).current;

Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 1000,
  useNativeDriver: true,
}).start();
```

### Advantages:

* Built-in and easy to use
* Native driver improves performance

### Limitations:

* Complex animations can be harder to manage
* Less flexible compared to Reanimated

---

## 2. Reanimated 2 Architecture

Reanimated 2 is an advanced animation library that provides better performance and flexibility.

### Key Features:

* Runs animations on **UI thread (not JS thread)**
* Uses **worklets** (functions executed on UI thread)
* Eliminates lag caused by JS thread blocking

### Architecture Flow:

1. JavaScript defines animation logic
2. Worklets execute directly on UI thread
3. Smooth and high-performance animations

### Benefits:

* No frame drops
* Better for complex gestures and animations
* Smooth 60 FPS experience

---

## 3. Shared Values & Animated Styles

### Shared Values:

* Special variables used in Reanimated
* Stored in UI thread
* Created using `useSharedValue()`

```js
import { useSharedValue } from 'react-native-reanimated';

const translateX = useSharedValue(0);
```

### Animated Styles:

* Styles that react to shared values
* Created using `useAnimatedStyle()`

```js
import { useAnimatedStyle } from 'react-native-reanimated';

const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ translateX: translateX.value }],
  };
});
```

### Key Points:

* Updates happen instantly on UI thread
* No re-render required
* Used for smooth animations

---

## 4. Gesture-Based Animations

Gesture-based animations allow interaction like drag, swipe, pinch, etc.

### Libraries Used:

* `react-native-gesture-handler`
* `react-native-reanimated`

### Example (Drag Gesture):

```js
import { useSharedValue } from 'react-native-reanimated';
import { useAnimatedGestureHandler } from 'react-native-reanimated';

const pan = useSharedValue(0);

const gestureHandler = useAnimatedGestureHandler({
  onActive: (event) => {
    pan.value = event.translationX;
  },
});
```

### Use Cases:

* Swipe cards (like Tinder)
* Drag & drop UI
* Bottom sheets
* Interactive sliders

### Benefits:

* Real-time interaction
* Smooth user experience
* Works directly on UI thread

---

## 5. Layout Animations for Smooth UI

Layout animations automatically animate changes in layout (position, size).

### In React Native:

* `LayoutAnimation` API

### Example:

```js
import { LayoutAnimation } from 'react-native';

LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
setExpanded(!expanded);
```

### In Reanimated:

```js
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

<Animated.View entering={FadeIn} exiting={FadeOut} />
```

### Use Cases:

* Expanding cards
* List item addition/removal
* Screen transitions

### Benefits:

* Minimal code
* Smooth UI transitions
* Improves user experience

---

## Conclusion

Animations in React Native enhance UI/UX significantly:

* Animated API is simple and built-in
* Reanimated 2 provides high performance
* Shared values enable smooth updates
* Gesture-based animations improve interactivity
* Layout animations make transitions seamless

These tools help in building **production-level, smooth, and interactive mobile applications**.
