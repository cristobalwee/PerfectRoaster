import { StyleSheet, ScrollView, Button, View, Text, Image } from 'react-native';
import { borderRadius, colors } from '../constants/styles';

const styles = StyleSheet.create({
  pivotImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius,
    backgroundColor: colors.boxBackground
  }
});

export const cuts = {
  'pollo': [
    { 
      id: 'pollo_entero',
      weights: [1800, 2300],
      media: require('../assets/images/pollo_entero.png'),
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'pollo_entero' })
    },
    { 
      id: 'pollo_pechuga',
      weights: [500, 700],
      media: require('../assets/images/pollo_pechuga.png'),
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'pollo_pechuga' })
    },
    { 
      id: 'pollo_pierna',
      weights: 300,
      media: require('../assets/images/pollo_pierna.png'),
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'pollo_pierna' })
    }
  ],
  'res': [
    { 
      id: 'res_t_bone',
      weights: 500,
      media: require('../assets/images/res_t_bone.png'),
      link: (navigation) => navigation.navigate('CookSelection', { cut: 'res_t_bone', weight: 'sm' })
    },
    { 
      id: 'res_bife_ancho',
      weights: [500, 1000],
      media: require('../assets/images/res_bife_ancho.png'),
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'res_bife_ancho' })
    },
    { 
      id: 'res_lomo',
      weights: [600, 800],
      media: require('../assets/images/res_lomo.png'),
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'res_lomo' })
    },
    { 
      id: 'res_cuadril',
      weights: 1100,
      media: require('../assets/images/res_cuadril.png'),
      link: (navigation) => navigation.navigate('CookSelection', { cut: 'res_cuadril', weight: 'sm' })
    },
    { 
      id: 'res_picanha',
      weights: [1000, 1500],
      media: require('../assets/images/res_picana.png'),
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'res_picanha' })
    }
  ],
  'cerdo': [
    { 
      id: 'cerdo_solomillo',
      weights: [300, 700],
      media: require('../assets/images/cerdo_solomillo.png'),
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'cerdo_solomillo' })
    },
    { 
      id: 'cerdo_bondiola',
      weights: 1900,
      media: require('../assets/images/cerdo_bondiola.png'),
      link: (navigation) => navigation.navigate('Timer', { cut: 'cerdo_bondiola', weight: 'sm' })
    },
    { 
      id: 'cerdo_panceta',
      weights: [400, 600],
      media: require('../assets/images/cerdo_panceta.png'),
      link: (navigation) => navigation.navigate('WeightSelection', { cut: 'cerdo_panceta' })
    },
    { 
      id: 'cerdo_costillas',
      weights: 1000,
      media: require('../assets/images/cerdo_costillas.png'),
      link: (navigation) => navigation.navigate('MultiStep', { cut: 'cerdo_costillas', weight: 'sm' })
    },
    { 
      id: 'cerdo_picana',
      weights: [400, 600],
      media: require('../assets/images/cerdo_picana.png'),
      link: (navigation) => navigation.navigate('Timer', { cut: 'cerdo_picana', weight: 'sm' })
    },
  ],
  'cordero': [
    { 
      id: 'cordero_costillar',
      weights: 800,
      media: require('../assets/images/cordero_costillar.png'),
      link: (navigation) => navigation.navigate('CookSelection', { cut: 'cordero_costillar', weight: 'sm'})
    }
  ],
  'cuy': [
    { 
      id: 'cuy_entero',
      weights: 400,
      media: require('../assets/images/cuy_entero.webp'),
      link: (navigation) => navigation.navigate('Timer', { cut: 'cuy_entero', weight: 'sm' })
    }
  ],
  'pato': [
    { 
      id: 'pato_magret',
      weights: 300,
      media: require('../assets/images/pato_magret.png'),
      link: (navigation) => navigation.navigate('CookSelection', { cut: 'pato_magret', weight: 'sm' })
    }
  ]
};