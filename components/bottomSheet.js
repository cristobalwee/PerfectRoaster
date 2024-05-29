import React, {Fragment, ReactNode, useEffect, useState} from 'react';
import {Pressable, StyleSheet, View, Text, Image} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  Easing
} from 'react-native-reanimated';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';

const PressAnimated = Animated.createAnimatedComponent(Pressable);

export default function BottomSheet({ offsetBottom, title, children, isOpen, backdropOnPress, hasActions }) {
  const offset = useSharedValue(0);
  const [animOffset, setAnimOffset] = useState(0);
  const styles = StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(17, 17, 17, 0.6)'
    },
    view: {
      backgroundColor: 'white',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    header: {
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      padding: spacing.md
    },
    title: {
      fontSize: textSizes.navHeader,
      fontFamily: fontFamilies.subhead,
      textAlign: 'center',
      display: 'inline',
    },
    close: {
      position: 'absolute',
      top: spacing.md,
      right: spacing.lg,
      zIndex: 2
    },
    closeIcon: {
      height: 24,
      width: 24
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: hasActions ? 0 : spacing.lg,
      gap: spacing.md,
      marginBottom: offsetBottom
    }
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
    if (children) setAnimOffset(children.length);
    function onOpen() {
      if (isOpen) {
        offset.value = 0;
      }
    }

    onOpen();
  }, [isOpen]);

  if (!isOpen) {
    return <Fragment />;
  }
  return (
    <Fragment>
      <PressAnimated
        onPress={backdropOnPress}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(600)}
        style={styles.backdrop}
      />
      <Animated.View
        entering={SlideInDown.duration(400).easing(Easing.bezier(0.16, 1, 0.3, 1))}
        exiting={SlideOutDown.duration(850 - (animOffset * 100)).easing(Easing.bezier(0.6, 1, 0.6, 1))}
        style={[styles.view, translateY]}>
        <Pressable style={ styles.close } onPress={backdropOnPress}>
          <Image style={ styles.closeIcon } source={ require('../assets/images/icons/close.png') } />
        </Pressable>
        <View style={styles.header}>
          <Text style={styles.title}>{ title[0].toUpperCase() + title.slice(1) }</Text>
        </View>
        <View style={styles.content}>
          { children }
        </View>
      </Animated.View>
    </Fragment>
  );
};