function convertName(name) {
  const convertedName = name.replace(/\b\w/g, function (word) {
    return word.toUpperCase();
  });
  return convertedName;
}

function convertPlace(place) {
  const convertedFormat = place.replace(
    /^(.+),\s*(\w{2})$/,
    function (match, city, state) {
      const capitalizedCity = city.replace(/\b\w/g, function (word) {
        return word.toUpperCase();
      });
      const uppercaseState = state.toUpperCase();
      return capitalizedCity + ', ' + uppercaseState;
    }
  );
  return convertedFormat;
}

export { convertName, convertPlace };
