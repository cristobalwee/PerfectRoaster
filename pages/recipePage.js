import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, FlatList, View } from 'react-native';
import Hero from '../components/hero';
import { colors, fontFamilies, spacing, textSizes } from '../constants/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocale } from '../storageSlice';
import getTranslation from '../utils/getTranslation';
import { Fragment, useEffect, useState } from 'react';
import { notifTapListener } from '../utils/notifications';
import FloatingBar from '../components/floatingBar';
import BottomSheet from '../components/bottomSheet';
import { cookData } from '../data/cookData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/button';
import { startTimer } from '../timerSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.boxBackground
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 108
  },
  sectionTitle: {
    fontFamily: fontFamilies.subhead,
    fontSize: textSizes.body,
    marginBottom: spacing.md
  },
  subSection: {
    flex: 1,
    gap: spacing.xs,
    marginBottom: spacing.lg
  },
  item: {
    fontFamily: fontFamilies.body,
    fontSize: textSizes.body
  },
  body: {
    fontFamily: fontFamilies.paragraph,
    fontSize: textSizes.body
  },
  doneModalButtonContainer: {
    gap: spacing.sm,
    marginTop: spacing.lg
  }
});

export default function RecipeScreen({ route, navigation }) {
  const { recipe: { id, title, img, time, ingredients, procedure } } = route.params;
  const dispatch = useDispatch();
  const locale = useSelector(selectLocale);
  const useTranslate = (string) => getTranslation(string, locale);
  const insets = useSafeAreaInsets();
  const { cooks, rest } = cookData[id]['sm'];
  const [sheet, setSheet] = useState(false);
  const onSheetClose = () => {
    setSheet(null);
  };

  return (
    <Fragment>
      <ScrollView style={styles.container}>
        <Hero
          background={ img }
          title={ title }
          eyebrow={ `${time}min` }
          back={ () => navigation.goBack() }
          size='sm'
        />
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{ useTranslate('ingredients') }</Text>
          <View style={styles.subSection}>
            <Text style={styles.item}>{ useTranslate('meat') }</Text>
            <Text style={[styles.item, { paddingLeft: spacing.xs }]}>{`\u2022 ${ingredients.meat}`}</Text>
          </View>
          <View style={styles.subSection}>
            <Text style={styles.item}>Rub</Text>
            { ingredients.rub.map(item => (
              <Text key={item} style={[styles.item, { paddingLeft: spacing.xs }]}>{`\u2022 ${item}`}</Text>
            ))}
          </View>
          <Text style={[styles.sectionTitle, { marginBottom: spacing.sm }]}>{ useTranslate('procedure') }</Text>
          <View style={styles.subSection}>
            { procedure.map((item, i) => (
              <Text key={i} style={[styles.item, { paddingLeft: spacing.xs }]}>{`${i + 1}. ${item}`}</Text>
            ))}
          </View>
        </View>
        <StatusBar style="light" />
      </ScrollView>
      <FloatingBar content={ useTranslate('start_recipe') } onPress={ () => setSheet(true) } isRecipe />
      <BottomSheet
        backdropOnPress={ onSheetClose }
        isOpen={ sheet }
        offsetBottom={ insets.bottom }
        title='start_recipe'
        hasActions
      >
        <View>
          <Text style={ styles.body }>{ useTranslate('start_recipe_info')(cooks, rest) }</Text>
          <View style={ styles.doneModalButtonContainer }>
            <Button
              as='primary'
              text={ useTranslate('begin') }
              onPress={ () => {
                navigation.navigate('Timer', { cut: id, cookTime: cooks, shouldStart: true });
                dispatch(startTimer({ cut: id, finalCookTime: cooks, nextTimer: rest, type: 'cook', nextTimerType: 'rest', activeWeight: 'sm' }));
                setSheet(false);
              }}
            />
            <Button
              as='secondary_alt'
              text={ useTranslate('cancelar') }
              onPress={ () => {
                setSheet(false);
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </Fragment>
  );
}
