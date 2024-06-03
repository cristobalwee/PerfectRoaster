const days = {
  'es_PE': ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  'en_US': ['Sunday', 'Monday', 'Tuesdya', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
const months = {
  'es_PE': ['ene.', 'feb.', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
  'en_US': ['Jan.', 'Feb.', 'Mar.', 'April', 'Kay', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dic.']
};

export default function getDay(locale = 'es_PE') {
  const today = new Date();
  const month = months[locale][today.getMonth()];
  const day = days[locale][today.getDay()];
  const date = today.getDate();

  if (locale === 'en_US') return `${day}, ${month} ${date}`;

  return `${day}, ${date} de ${month}`;
};