import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); 

const Spinner = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000, 
        useNativeDriver: true, 
      })
    ).start();
  }, [rotateAnim]);

 
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.overlay}>
      <Animated.Text
        style={[styles.text, { transform: [{ rotate }] }]} 
      >
        T
      </Animated.Text>
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, 
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 80, 
    color: 'white', 
    fontWeight: 'bold', 
  },
});
