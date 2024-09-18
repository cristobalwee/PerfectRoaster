import { StyleSheet, Text, View, Dimensions, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontFamilies, colors, textSizes, spacing, circleRadius } from '../constants/styles';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, ZoomIn } from 'react-native-reanimated';
import { Fragment } from 'react';

// https://medium.com/timeless/building-the-animated-sticky-spotify-collapsible-header-with-react-native-and-reanimated-part-i-e47222dfcb85

const windowDimensions = Dimensions.get('window');
const PressAnimated = Animated.createAnimatedComponent(Pressable);

export default function Hero({ eyebrow, title, back, background, size = 'lg', rightAction, children, bottomOffset }) {
  const insets = useSafeAreaInsets();
  const heroHeight = windowDimensions.height * (size === 'sm' ? 0.32 : 0.4);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      marginBottom: bottomOffset
    },
    imageContainer: { 
      width: '100%',
      height: heroHeight,
      position: 'absolute',
      top: -50,
      left: 0,
      right: 0
    },
    image: {
      width: '100%',
      height: '150%'
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: spacing.md,
      height: heroHeight
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      height: '150%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    },
    heading: {
      fontFamily: fontFamilies.headline,
      fontSize: textSizes.header1,
      color: colors.white,
      maxWidth: '90%'
    },
    eyebrow: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.body,
      color: colors.border,
      marginBottom: spacing.sm
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor:
      colors.black,
      padding: spacing.md,
      paddingTop: insets.top
    },
    headerText: {
      fontFamily: fontFamilies.subhead,
      fontSize: textSizes.navHeader,
      color: colors.white,
      textAlign: 'center'
    },
    back: {
      ...StyleSheet.absoluteFill,
      width: 36,
      height: 36,
      backgroundColor: colors.white,
      borderRadius: circleRadius,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      left: spacing.md,
      top: insets.top,
      zIndex: 1
    },
    backIcon: {
      width: 18,
      height: 18
    },
    stickyBack: {
      width: 24,
      height: 24,
      position: 'absolute',
      left: spacing.md,
      top: insets.top,
      transform: 'rotate(180deg)'
    },
    rightAction: {
      position: 'absolute',
      width: 52,
      height: 52,
      backgroundColor: colors.white,
      borderRadius: circleRadius,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      right: spacing.md,
      top: insets.top + spacing.xs,
      zIndex: 1
    },
    rightActionIcon: {
      width: 24,
      height: 24
    }
  });
  const opacityOffset = size === 'lg' ? 100 : 0;
  const scrollValue = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      'worklet';
      scrollValue.value = event.contentOffset.y;
    },
  });
  const opacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value - opacityOffset,
        [0, 50],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });
  const reverseOpacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value - heroHeight + 100,
        [75, 0],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });
  const scaleAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollValue.value, [-50, 0], [1.1, 1], {
            extrapolateLeft: 'extend',
            extrapolateRight: 'clamp',
          }),
        },
      ],
    };
  });

  return (
    <Fragment>
      <View style={ styles.imageContainer }>
        <Animated.Image
          style={[styles.image, scaleAnim]}
          source={background}
        />
        <Animated.View style={ [styles.overlay, scaleAnim] }></Animated.View>
      </View>
      { back && (
        <PressAnimated style={ [styles.back, opacityAnim] } onPress={ back }>
          <Image style={ styles.backIcon } source={ require('../assets/images/icons/chevron-left.png') } />
        </PressAnimated>
      )}
      { rightAction && (
        <PressAnimated style={ [styles.rightAction, opacityAnim] } onPress={ rightAction }>
          <Image style={ styles.rightActionIcon } source={ require('../assets/images/icons/settings.png') } />
        </PressAnimated>
      )}
      <Animated.ScrollView style={ styles.container } onScroll={ scrollHandler }>
        <View style={styles.contentContainer}>
          <Text style={styles.eyebrow}>{ eyebrow }</Text>
          <Text style={styles.heading}>{ title }</Text>
        </View>
        <View style={{ backgroundColor: colors.boxBackground }}>
          { children }
        </View>
      </Animated.ScrollView>
      { back && (
        <Animated.View style={ [styles.header, reverseOpacityAnim] }>
          <Image style={ styles.stickyBack } source={ require('../assets/images/icons/chevron-right-light.png') } />
          <Text style={ styles.headerText }>{ title }</Text>
        </Animated.View>
      )}
    </Fragment>
  );
}
