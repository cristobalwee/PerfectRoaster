export default getValues = (val) => {
  return Array.isArray(val) ? val[0] : val;
};