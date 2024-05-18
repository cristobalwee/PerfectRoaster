import { StyleSheet, ScrollView, Button, View, Text, Image } from 'react-native';
import { borderRadius } from '../constants/styles';

const styles = StyleSheet.create({
  pivotImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius
  }
});

export const cuts = {
  'pollo': [
    { 
      id: 'pollo_entero',
      title: 'Pollo entero',
      subtitle: '1800-2300g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'pollo_entero' })
    },
    { 
      id: 'pollo_pechuga',
      title: 'Pechuga',
      subtitle: '500-700g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'pollo_pechuga' })
    },
    { 
      id: 'pollo_pierna',
      title: 'Pierna con Encuentro',
      subtitle: '300g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'pollo_pierna' })
    }
  ],
  'res': [
    { 
      id: 'res_t_bone',
      title: 'T-Bone',
      subtitle: '500g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('CookSelection', { cut: 'res_t_bone', weight: 'sm' })
    },
    { 
      id: 'res_bife_ancho',
      title: 'Bife Ancho',
      subtitle: '500-1000g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'res_bife_ancho' })
    },
    { 
      id: 'res_lomo',
      title: 'Lomo Fino',
      subtitle: '600-800g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'res_lomo' })
    },
    { 
      id: 'res_cuadril',
      title: 'Cola de Cuadril',
      subtitle: '1100g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('CookSelection', { cut: 'res_cuadril', weight: 'sm' })
    },
    { 
      id: 'res_picanha',
      title: 'Picanha',
      subtitle: '1000-1500g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'res_picanha' })
    }
  ],
  'cerdo': [
    { 
      id: 'cerdo_solomillo',
      title: 'Solomillo',
      subtitle: '300-700g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'cerdo_solomillo' })
    },
    { 
      id: 'cerdo_bondiola',
      title: 'Bondiola',
      subtitle: '1900g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('Timer', { cut: 'cerdo_bondiola', weight: 'sm' })
    },
    { 
      id: 'cerdo_panceta',
      title: 'Panceta sin piel',
      subtitle: '400-600g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'cerdo_panceta' })
    },
    { 
      id: 'cerdo_costillas',
      title: 'Costillas',
      subtitle: '1000g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('Timer', { cut: 'cerdo_costillas', weight: 'sm' })
    },
    { 
      id: 'cerdo_picana',
      title: 'Picaña',
      subtitle: '400-600g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('Timer', { cut: 'cerdo_picana', weight: 'sm' })
    },
  ],
  'cordero': [
    { 
      id: 'cordero_costillar',
      title: 'Costillar',
      subtitle: '800g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('CookSelection', { cut: 'cordero_costillar', weight: 'sm'})
    }
  ],
  'cuy': [
    { 
      id: 'cuy_entero',
      title: 'Cuy entero',
      subtitle: '400g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('Timer', { cut: 'cuy_entero', weight: 'sm' })
    }
  ],
  'pato': [
    { 
      id: 'pato_magret',
      title: 'Magret',
      subtitle: '300g',
      media: <Image style={ styles.pivotImage } source={ require('../assets/images/hero_home.jpg') } />,
      link: (navigation) => navigation.navigate('CookSelection', { cut: 'pato_magret', weight: 'sm' })
    }
  ]
};