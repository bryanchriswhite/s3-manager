import AWS from 'aws-sdk'
import s3Regions from './assets/s3regions.json'


const loadConfig = () => {
  const configString = window.localStorage.getItem('aws-config');
  let config = null;

  try {
     config = JSON.parse(configString);
  } catch(err) {
    console.error('Unable to load AWS config from localstorage!');
  }

  return config;
};

const s3 = new AWS.S3({region: 'us-east-2'});

export {
  s3Regions,
  loadConfig,
  s3
}
