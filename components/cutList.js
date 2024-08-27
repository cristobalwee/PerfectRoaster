import { selectLocale, selectWeightUnits } from '../storageSlice';
import { useSelector } from 'react-redux';
import { cuts } from '../data/cuts';
import getTranslation from '../utils/getTranslation';
import Pivot from './pivot';

export default function CutList({ sheet, onPress }) {  
  const locale = useSelector(selectLocale);
  const weightUnits = useSelector(selectWeightUnits);
  const weightUnitVals = { 'weight_gr' : 'g', 'weight_lbs': 'lbs' };
  const weightMultiplier = weightUnits === 'weight_lbs' ? 0.0022 : 1;
  const useTranslate = (string) => getTranslation(string, locale);

  return cuts[sheet]
  ? cuts[sheet].map(cut => {
    let weight = `${Math.round(cut.weights * weightMultiplier * 10) / 10}`;
    if (Array.isArray(cut.weights)) {
      weight = `${Math.round(cut.weights[0] * weightMultiplier * 10) / 10}-${Math.round(cut.weights[1] * weightMultiplier * 10) / 10}`;
    };

    const subtitle = `${weight}${weightUnitVals[weightUnits]}`;
    return (
      <Pivot
        { ...cut }
        title={ useTranslate(cut.id) }
        subtitle={ subtitle }
        onPress={ () => onPress(cut.link) }
        key={ cut.id }
      />
    )
  })
  : null;
}
