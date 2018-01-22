import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import aws from './aws.js'
import {buildConfig, buildS3Options, embedFormats} from './utils.js'

Vue.use(Vuex);

const {region: selectedRegion, credentials, buckets} = aws.loadConfig();
const initialState = {
  selectedBucket: null,
  selectedFile: {},
  embedFormats,
  selectedEmbedFormat: embedFormats[0],
  aws: {
    credentials,
    selectedRegion,
    s3: new aws.S3({
      region: selectedRegion,
      accessKeyId: credentials.keyId,
      secretAccessKey: credentials.secretKey
    }),
    s3Regions: aws.s3Regions,
    buckets,
    files: [],
  },
  dividers: {
    vertical: [
      '40%',
      'calc(60% - var(--divider-thickness)'
    ],
    horizontal1: [
      '30%',
      'calc(70% - var(--divider-thickness)'
    ],
    horizontal2: [
      '40%',
      'calc(60% - var(--divider-thickness)'
    ]
  },
  contextMenu: {
    x: null,
    y: null,
    visible: false,
    context: null,
    item: null
  }
};

const mutations = {
  resize(state, payload) {
    state.dividers = {
      ...state.dividers,
      ...payload
    }
  },
  selectRegion(state, region) {
    state.aws.selectedRegion = region;
    aws.saveConfig(buildConfig(state));
    state.aws.s3 = new aws.S3(buildS3Options(state));
  },
  updateCredentials(state, credentials) {
    state.aws.credentials = {
      ...state.aws.credentials,
      ...credentials
    };

    aws.saveConfig(buildConfig(state));
    state.aws.s3 = new aws.S3(buildS3Options(state));
  },
  openContextMenu(state, payload) {
    state.contextMenu = {
      ...state.contextMenu,
      ...payload,
      visible: true
    }
  },
  closeContextMenu(state) {
    state.contextMenu.visible = false;
  },
  updateBuckets(state, buckets) {
    buckets = _.compact(buckets);
    state.aws.buckets = buckets;
    aws.saveConfig(buildConfig(state));
  },
  updateFiles(state, payload) {
    state.aws.files = aws.parseFiles(payload);
  },
  selectBucket(state, bucket) {
    state.selectedBucket = bucket;
  },
  selectFile(state, payload) {
    state.selectedFile = aws.parseFile(payload);
  },
  updateEmbedFormat(state, format) {
    state.selectedEmbedFormat = format;
  }
};

const actions = {
  refreshBuckets({commit, dispatch, state}) {
    // NB: type coercion is intentional
    if (state.selectedBucket == null) {
      if (state.aws.buckets.length <= 0) return;

      commit('selectBucket', state.aws.buckets[0]);
    }

    dispatch('refreshFiles', state.selectedBucket);
    /*
     * CORS isn't supported for the `listBuckets` operation - FML
     * state.aws.s3.listBuckets((err, data) => {
     *   console.log(err || data);
     * });
     *
     */
  },
  refreshFiles({commit, state}, bucket) {
    state.aws.s3.listObjects({
      Bucket: bucket
    }, (err, data) => {
      if (err) return console.error('Listing objects for bucket %s failed:', bucket, err);

      commit('updateFiles', data)
    });
  },
  selectBucket({commit, dispatch}, bucket) {
    commit('selectBucket', bucket);
    dispatch('refreshFiles', bucket);
  },
  selectFile({commit, state}, file) {
    // const url = state.aws.s3.getSignedUrl('getObject', {
    //   Bucket: state.aws.selectedBucket,
    //   Key: name
    // });
    const bucket = state.selectedBucket;
    const url = `http://${bucket}/${file.name}`;

    // NB: pretty much just used to get content-type currently
    state.aws.s3.headObject({
      Bucket: bucket,
      Key: file.name
    }, (err, data) => {
      if (err) return console.error('Retrieving object metadata for key %s in bucket %s failed:', file.name, bucket, err);

      commit('selectFile', {file, data, url});
    });
  }
};

export default new Vuex.Store({
  state: Object.assign({}, initialState),
  mutations,
  actions
});

export {
  initialState
}
