import _ from 'lodash'

function parseValue(string) {
  const valueRegex = /[\d.]+/
    , valueMatch = string.match(valueRegex)
    , valueString = valueMatch && valueMatch[0];

  return parseInt(valueString, 10) || '';
}

function buildConfig(state) {
  return {
    credentials: state.aws.credentials,
    region: state.aws.selectedRegion
  };
}

function buildS3Options(state) {
  return {
    region: state.aws.region,
    accessKeyId: state.aws.credentials.keyId,
    secretAccessKey: state.aws.credentials.secretKey
  };
}

function formatSize(bytes) {
  const formats = new function () {
    this.B = {unit: 'B', value: bytes};
    this.KB = {unit: 'KB', value: this.B.value / 1024};
    this.MB = {unit: 'MB', value: this.KB.value / 1024};
    this.GB = {unit: 'GB', value: this.MB.value / 1024};
  };

  const format = _.find(formats, (f => {
    const count = Math.floor(f.value);
    return count > 0 && String(count).length < 4;
  }));

  return format ?
    `${Math.round(format.value, 2)}${format.unit}` :
    `${bytes}B`;
}

export {
  parseValue,
  buildConfig,
  buildS3Options,
  formatSize
}
