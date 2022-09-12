const reqBodyFilter = (reqBodyObj, ...allowedFields) => {
  const validFields = Object.keys(reqBodyObj).filter((key) =>
    allowedFields.includes(key)
  );

  let allowedObjects = {};
  validFields.forEach(
    (validField) => (allowedObjects[validField] = reqBodyObj[validField])
  );

  return allowedObjects;
};

export default reqBodyFilter;
