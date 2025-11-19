import ListItem from './listItem';
import { storage } from '../utils/storage';
import { selectLocale, selectTempUnits, selectWeightUnits, setLocale, setTempUnits, setWeightUnits } from '../storageSlice';
import { useDispatch, useSelector } from 'react-redux';
import getTranslation from '../utils/getTranslation';

export default function SettingsList() {  
  const locale = useSelector(selectLocale);
  const tempUnits = useSelector(selectTempUnits);
  const weightUnits = useSelector(selectWeightUnits);
  const useTranslate = (string) => getTranslation(string, locale);
  const dispatch = useDispatch();

  const settingsList = [
    { title: 'weight', storageKey: 'weightUnits', onSet: setWeightUnits, isSelected: weightUnits === 'weight_lbs', data: [{ text: useTranslate('weight_gr'), id: 'weight_gr' }, { text: useTranslate('weight_lbs'), id: 'weight_lbs' }] },
    { title: 'temp', storageKey: 'tempUnits', onSet: setTempUnits, isSelected: tempUnits === 'temp_fahrenheit', data: [{ text: 'ºC', id: 'temp_celsius' }, { text: 'ºF', id: 'temp_fahrenheit' }] },
    { title: 'lang', storageKey: 'locale', onSet: setLocale, isSelected: locale === 'en_US', data: [{ text: 'Español', id: 'es_PE' }, { text: 'English', id: 'en_US' }] }
  ];

  return settingsList.map((item, i) => {
    const { title, storageKey, onSet, isSelected, data } = item;
    return (
      <ListItem
        key={ i }
        title={ useTranslate(title) }
        onSelect={ (selected) => {
          storage.set(storageKey, selected);
          dispatch(onSet(selected));
        }}
        selected={ isSelected ? 1 : 0 }
        data={ data }
      />
    );
  });
}
