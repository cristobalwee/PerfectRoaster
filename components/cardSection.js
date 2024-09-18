import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { spacing } from '../constants/styles';
import meatIcons from '../data/meatIcons';
import getTranslation from '../utils/getTranslation';
import CardButton from '../components/cardButton';
import { selectLocale } from '../storageSlice';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8
  }
});

export default function CardSection({ onPress }) {
  const locale = useSelector(selectLocale);
  const useTranslate = (string) => getTranslation(string, locale);
  const cardRows = [
    ['pollo', 'res', 'cerdo'],
    ['cordero', 'pato', 'cuy']
  ];
  return cardRows.map((row, i) => (
    <View style={ styles.row } key={ i }>
      { row.map(meat => {
        return (
          <CardButton
            key={ meat }
            text={ useTranslate(meat) }
            icon={ meatIcons[meat] }
            onPress={ () => onPress(meat) }
          />
        );
      })}
    </View>
  ));
}
