export default getValues = (val) => {
  return Array.isArray(val) ? val[1] : val;
};