require('dotenv').config();

const S3Plugin = require('webpack-s3-plugin');
const defaultConfig = require('./webpack.config');

const s3PluginOptions = {
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  },
  s3UploadOptions: {
    Bucket: process.env.AWS_BUCKET
  },
  progress: true
};

// NB: type coercion is intentional
if (process.env.CLOUDFRONT_DISTRIBUTION_ID != null) {
  s3PluginOptions.cloudfrontInvalidateOptions = {
    DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
    Items: ["/index.html"]
  };
}

module.exports = Object.assign(defaultConfig, {
  plugins: (defaultConfig.plugins || []).concat([
    new S3Plugin(s3PluginOptions)
  ])
});

