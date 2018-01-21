function parseValue(string) {
  const valueRegex = /^[\d.]+/
    , valueMatch = string.match(valueRegex)
    , valueString = valueMatch && valueMatch[0];

  return parseInt(valueString, 10) || '';
}

export {
  parseValue
}
