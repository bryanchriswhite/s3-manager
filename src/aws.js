import AWS from 'aws-sdk'
import s3Regions from './assets/s3regions.json'


const aws = {};
const CONFIG_STORAGE_KEY = 'aws-config';

aws.s3Regions = s3Regions;

aws.loadConfig = () => {
  const configString = window.localStorage.getItem(CONFIG_STORAGE_KEY);
  let config = {
    credentials: {},
    region: ''
  };

  try {
    if (configString) config = JSON.parse(configString);
  } catch (err) {
    console.error('Unable to load AWS config from localstorage!');
  }

  return config;
};

aws.saveConfig = (config) => {
  const configString = JSON.stringify(config);
  window.localStorage.setItem(CONFIG_STORAGE_KEY, configString);
};

aws.parseFiles = (data) => {
  return data.Contents.map(file => ({
    name: file.Key,
    lastModified: file.LastModified,
    size: file.Size
  }))
};

aws.parseFile = ({file, data, url}) => {
  return {
    name: file.name,
    url,
    size: file.size,
    lastModified: data.LastModified,
    contentType: data.ContentType
  }
};

aws.S3 = AWS.S3;

export default aws;
