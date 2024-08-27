export const cookData = {
  'pollo_entero': {
    'lg': { 
      weight: 2300, 
      cooks: [4500, 4800], 
      rest: 420
    },
    'md': { 
      weight: 2100, 
      cooks: [4200, 4500], 
      rest: 420
    },
    'sm': { 
      weight: 1800, 
      cooks: [3960, 4200], 
      rest: 540
    }
  },
  'pollo_pechuga': {
    'lg': { 
      weight: 650, 
      cooks: 3000, 
      rest: 240
    },
    'sm': { 
      weight: 500, 
      cooks: 2700, 
      rest: 240
    }
  },
  'pollo_pierna': {
    'lg': { 
      weight: 350, 
      cooks: [2700, 2940], 
      rest: 240
    },
    'sm': { 
      weight: 300, 
      cooks: [2400, 2700], 
      rest: 240
    }
  },
  'res_t_bone': {
    'sm': {
      weight: 550,
      cooks: {
        'well': 1260,
        'med_well': 1140,
        'med': 960,
        'med_rare': 840
      },
      rest: 480,
      temps: { 
        'well': { temp_celsius: '72-76', temp_fahrenheit: '162-169' },
        'med_well': { temp_celsius: '66-71', temp_fahrenheit: '151-160' },
        'med': { temp_celsius: '60-65', temp_fahrenheit: '140-149' },
        'med_rare': { temp_celsius: '55-59', temp_fahrenheit: '131-138' }
      }
    }
  },
  'res_bife_ancho': {
    'lg': {
      weight: 1000,
      cooks: {
        'well': [3000, 3300],
        'med_well': [2880, 2700],
        'med': [2400, 2520],
        'med_rare': 2040
      },
      rest: 600,
      temps: { 
        'well': { temp_celsius: '72-76', temp_fahrenheit: '162-169' },
        'med_well': { temp_celsius: '66-71', temp_fahrenheit: '151-160' },
        'med': { temp_celsius: '60-65', temp_fahrenheit: '140-149' },
        'med_rare': { temp_celsius: '55-59', temp_fahrenheit: '131-138' }
      }
    },
    'sm': {
      weight: 500,
      cooks: {
        'well': [1320, 1260],
        'med_well': [1140, 1140],
        'med': [1020, 960],
        'med_rare': 840
      },
      rest: 480,
      temps: { 
        'well': { temp_celsius: '72-76', temp_fahrenheit: '162-169' },
        'med_well': { temp_celsius: '66-71', temp_fahrenheit: '151-160' },
        'med': { temp_celsius: '60-65', temp_fahrenheit: '140-149' },
        'med_rare': { temp_celsius: '55-59', temp_fahrenheit: '131-138' }
      }
    }
  },
  'res_lomo': {
    'lg': {
      weight: 800,
      cooks: {
        'well': [3720, 3420],
        'med_well': [3360, 3000],
        'med': [3000, 2760],
        'med_rare': [2400, 2160]
      },
      rest: 600,
      temps: { 
        'well': { temp_celsius: '72-76', temp_fahrenheit: '162-169' },
        'med_well': { temp_celsius: '66-71', temp_fahrenheit: '151-160' },
        'med': { temp_celsius: '60-65', temp_fahrenheit: '140-149' },
        'med_rare': { temp_celsius: '55-59', temp_fahrenheit: '131-138' }
      }
    },
    'sm': {
      weight: 600,
      cooks: {
        'well': [3540, 3240],
        'med_well': [3180, 2880],
        'med': [2880, 2640],
        'med_rare': [2280, 2040]
      },
      rest: 480,
      temps: { 
        'well': { temp_celsius: '72-76', temp_fahrenheit: '162-169' },
        'med_well': { temp_celsius: '66-71', temp_fahrenheit: '151-160' },
        'med': { temp_celsius: '60-65', temp_fahrenheit: '140-149' },
        'med_rare': { temp_celsius: '55-59', temp_fahrenheit: '131-138' }
      }
    }
  },
  'res_cuadril': {
    'sm': {
      weight: 1100,
      cooks: {
        'well': [3720, 4200],
        'med_well': [3600, 3000],
        'med': [2880, 2520],
        'med_rare': [2520, 2400]
      },
      rest: 600,
      temps: { 
        'well': { temp_celsius: '72-76', temp_fahrenheit: '162-169' },
        'med_well': { temp_celsius: '66-71', temp_fahrenheit: '151-160' },
        'med': { temp_celsius: '60-65', temp_fahrenheit: '140-149' },
        'med_rare': { temp_celsius: '55-59', temp_fahrenheit: '131-138' }
      }
    }
  },
  'res_picanha': {
    'lg': {
      weight: 1500,
      cooks: {
        'well': [3600, 3900],
        'med_well': [3300, 3600],
        'med': [3000, 3000],
        'med_rare': 2700
      },
      rest: 720,
      temps: { 
        'well': { temp_celsius: '72-76', temp_fahrenheit: '162-169' },
        'med_well': { temp_celsius: '66-71', temp_fahrenheit: '151-160' },
        'med': { temp_celsius: '60-65', temp_fahrenheit: '140-149' },
        'med_rare': { temp_celsius: '55-59', temp_fahrenheit: '131-138' }
      }
    },
    'sm': {
      weight: 1000,
      cooks: {
        'well': [3480, 3300],
        'med_well': [3120, 3000],
        'med': 2880,
        'med_rare': 2520
      },
      rest: 540,
      temps: { 
        'well': { temp_celsius: '72-76', temp_fahrenheit: '162-169' },
        'med_well': { temp_celsius: '66-71', temp_fahrenheit: '151-160' },
        'med': { temp_celsius: '60-65', temp_fahrenheit: '140-149' },
        'med_rare': { temp_celsius: '55-59', temp_fahrenheit: '131-138' }
      }
    }
  },
  'cerdo_solomillo': {
    'lg': { 
      weight: 600, 
      cooks: [2040, 2640], 
      rest: 360
    },
    'md': { 
      weight: 500, 
      cooks: [1560, 1920], 
      rest: 300
    },
    'sm': { 
      weight: 350, 
      cooks: [1320, 1560], 
      rest: 300
    }
  },
  'cerdo_bondiola': {
    'sm': { 
      weight: 1900, 
      cooks: 6000, 
      rest: 480
    }
  },
  'cerdo_costillas': {
    'sm': { 
      weight: 1000, 
      cooks: {
        'step1': [12, 5400], 
        'step2': [10, 3600]
      },
      rest: 420
    }
  },
  'cerdo_picana': {
    'sm': { 
      weight: 1500, 
      cooks: [3900, 4200], 
      rest: 360
    }
  },
  'cerdo_panceta': {
    'lg': { 
      weight: 600,
      cooks: {
        'step1': [12, 2700], 
        'step2': [10, 3000]
      },
      rest: 360
    },
    'sm': { 
      weight: 450,
      cooks: {
        'step1': [2700, 3000], 
        'step2': [2400, 2700]
      },
      rest: 360
    }
  },
  'cordero_costillar': {
    'sm': {
      weight: 0,
      cooks: {
        'well': [1080, 1200],
        'med_well': [960, 1020],
        'med': [900, 960],
        'med_rare': [720, 840]
      },
      rest: 240,
      temps: { 
        'well': { temp_celsius: '72-76', temp_fahrenheit: '162-169' },
        'med_well': { temp_celsius: '66-71', temp_fahrenheit: '151-160' },
        'med': { temp_celsius: '60-65', temp_fahrenheit: '140-149' },
        'med_rare': { temp_celsius: '55-59', temp_fahrenheit: '131-138' }
      }
    }
  },
  'cuy_entero': {
    'sm': {
      weight: 430,
      cooks: 10,
      rest: 12
    }
  },
  'pato_magret': {
    'sm': {
      weight: 300,
      cooks: {
        'med': [1920, 1800],
        'med_rare': [1680, 1440]
      },
      rest: 360,
      temps: {
        'med': { temp_celsius: '60-66', temp_fahrenheit: '140-151' },
        'med_rare': { temp_celsius: '55-59', temp_fahrenheit: '131-138' }
      }
    }
  },
  'cuadril_cafe': {
    'sm': {
      weight: 1100,
      cooks: 2520,
      rest: 720
    }
  },
  'pollo_brasa': {
    'sm': {
      weight: 1800,
      cooks: 4200,
      rest: 420
    }
  }
};
