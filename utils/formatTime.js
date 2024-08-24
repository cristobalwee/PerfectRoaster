export default formatTime = time => {
  if (!time) return null;

  const sliceIdx = time / 60 > 60 ? 11 : 14;
  return new Date(time * 1000).toISOString().substring(sliceIdx, 19);
};