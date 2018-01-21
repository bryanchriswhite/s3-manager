function parseValue(string) {
  const valueRegex = /[\d.]+/
    , valueMatch = string.match(valueRegex)
    , valueString = valueMatch && valueMatch[0];

  console.table({
    string,
    valueMatch,
    valueString
  });
  return parseInt(valueString, 10) || '';
}

export {
  parseValue
}
