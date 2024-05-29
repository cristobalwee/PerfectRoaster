import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import { startTimer, selectActiveCookTime, selectActiveCut, selectStarted, selectStopped, stopTimer } from '../timerSlice';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getElapsedTime } from '../utils/getElapsed';
import { useDispatch, useSelector } from 'react-redux';

export default function BottomBar({ offsetBottom, onLink, onBlur, onDone }) {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: spacing.lg,
      paddingVertical: offsetBottom ? spacing.md : spacing.sm,
      paddingBottom: offsetBottom || spacing.sm,
      backgroundColor: '#1E1717',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    },
    subtitle: {
      fontFamily: fontFamilies.paragraph,
      fontSize: textSizes.bodySmall,
      color: colors.white
    },
    time: {
      fontFamily: fontFamilies.subhead,
      fontSize: textSizes.header2,
      color: colors.white
    },
    actions: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    iconButton: {
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      backgroundColor: colors.white,
      marginLeft: spacing.sm
    }
  });

  const dispatch = useDispatch();
  const startedAt = useSelector(selectStarted);
  const stoppedAt = useSelector(selectStopped);
  const elapsed = getElapsedTime(startedAt, stoppedAt);
  const activeCut = useSelector(selectActiveCut);
  const activeCookTime = useSelector(selectActiveCookTime);

  const [time, setTime] = useState(activeCookTime - elapsed/1000);
  const [firstLoad, setFirstLoad] = useState(true);
  const [done, setDone] = useState(false);
  const isFocused = useIsFocused();
  const isStopped = !!stoppedAt;
  const sliceIdx = time / 60 > 60 ? 11 : 14;
  const formattedTime = new Date(time * 1000).toISOString().substring(sliceIdx, 19);

  useEffect(() => {
    if (time < 0.25 && !done) {
      setDone(true);
      onDone();
    }

    const interval = setInterval(() => {
      if (time > 0.25 && !isStopped && isFocused) {
        setTime(activeCookTime - elapsed / 1000);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [elapsed, time, done, isFocused, isStopped, activeCookTime]);

  useEffect(() => {
    if (isFocused && firstLoad) {
      setTime(activeCookTime - elapsed/1000);
      setFirstLoad(false);
    }

    const unsubscribe = onBlur(setFirstLoad);
    return unsubscribe;
  });

  return (
    <View style={ styles.container }>
      <View style={ styles.timeContainer }>
        <Text style={styles.subtitle}>{ activeCut }</Text>
        <Text style={ styles.time }>{ formattedTime } </Text>
      </View>
      <View style={ styles.actions }>
        <Pressable
          style={ styles.iconButton }
          onPress={ () => {
            if (isStopped) {
              dispatch(startTimer({ cut: activeCut, finalCookTime: activeCookTime, reset: time === activeCookTime }))
            } else {
              dispatch(stopTimer())
            }
          }}
        >
          { isStopped 
              ? <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/play.png') } />
              : <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/pause.png') } />
          }
        </Pressable>
        <Pressable style={ styles.iconButton } onPress={ () => onLink() }>
          <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icons/chevron-right.png') } />
        </Pressable>
      </View>
    </View>
  );
}
