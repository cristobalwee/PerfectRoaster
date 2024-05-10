import React, {Fragment, ReactNode, useEffect} from 'react';

// modules
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  Easing
} from 'react-native-reanimated';
import { spacing } from '../constants/styles';

const PressAnimated = Animated.createAnimatedComponent(Pressable);
const HEIGHT = 300;
const CLAMP = 20;

export default function BottomSheet(props) {
  const { offsetBottom } = props;
  const offset = useSharedValue(0);
  const styles = StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(17, 17, 17, 0.6)',
      zIndex: 1,
    },
    view: {
      backgroundColor: 'white',
      width: '100%',
      position: 'absolute',
      bottom: -CLAMP * 1.1,
      zIndex: 1,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: spacing.lg,
      paddingBottom: offsetBottom * 2
    },
  });
  const translateY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offset.value,
        },
      ],
    };
  }, []);

  useEffect(() => {
    function onOpen() {
      if (props.isOpen) {
        offset.value = 0;
      }
    }

    onOpen();
  }, [props.isOpen]);

  if (!props.isOpen) {
    return <Fragment />;
  }
  return (
    <Fragment>
      <PressAnimated
        onPress={props.backdropOnPress}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
        style={styles.backdrop}
      />
      <Animated.View
        entering={SlideInDown.duration(500).easing(Easing.bezier(0.16, 1, 0.3, 1))}
        exiting={SlideOutDown.duration(800).easing(Easing.bezier(0.1, 0.25, 0.3, 1))}
        style={[styles.view, translateY]}>
        {props.children}
      </Animated.View>
    </Fragment>
  );
};