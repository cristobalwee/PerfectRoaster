const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = ['ene.', 'feb.', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'];

export default function getDay(locale = 'es-PE') {
  const today = new Date();
  const month = months[today.getMonth()];
  const day = days[today.getDay()];
  const date = today. getDate();

  return `${day}, ${date} de ${month}`;
};