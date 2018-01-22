<template>
  <section id="config">
    <select name="region"
            v-model="selectedRegion">
      <option value="" disabled selected hidden>
        Select a region
      </option>
      <option v-for="region in regions"
              v-bind:value="region.region">
        {{region.name}}
      </option>
    </select>
    <input type="text"
           name="key-id"
           placeholder="Access Key Id"
           v-model="keyId"/>
    <input type="password"
           name="secret-key"
           placeholder="Access Secret Key"
           v-model="secretKey"/>
    <textarea name="buckets"
              cols="35"
              placeholder="Buckets (new-line delimited)"
              v-model="bucketsText"></textarea>
    <section id="instructions">
      <h3>Ensure your buckets are configured correctly:</h3>
      <ol>
        <li>
          <h4>Open the bucket permissions page:</h4>
          <div id="bucket-selection">
            <select v-model="selectedBucket"
                    name="bucket">
              <option value="" disabled selected hidden>
                Select a bucket
              </option>
              <option v-for="bucket in buckets"
                      v-bind:value="bucket">
                {{bucket}}
              </option>
            </select>
            <a target="_blank"
               v-bind:href="bucketPermissionsUrl(selectedBucket)">
              edit permissions
            </a>
          </div>
        </li>
        <li>
          <h4>Copy/paste bucket policy:</h4>
          <div>
            <textarea name="bucketPolicyTemplate"
                      cols="67" rows="5"
                      v-model="bucketPolicy"
                      v-on:click="selectTextArea"
                      readonly></textarea>
          </div>
        </li>
        <li>
          <h4>Copy/paste CORS configuration:</h4>
          <div>
            <textarea name="corsPolicyTemplate"
                      cols="67" rows="5"
                      v-model="corsPolicy"
                      v-on:click="selectTextArea"
                      readonly></textarea>
          </div>
        </li>
      </ol>
    </section>
  </section>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'config',
    data: () => ({
      selectedBucket: ''
    }),
    methods: {
      bucketPermissionsUrl(bucket) {
        const urlTemplate = _.template(`https://s3.console.aws.amazon.com/s3/buckets/<%= bucket %>/?region=<%= region %>&tab=permissions`);
        return urlTemplate({
          bucket,
          region: this.$store.state.aws.selectedRegion
        });
      },
      selectTextArea(event) {
        event.target.setSelectionRange(0, event.target.value.length);
      },
    },
    computed: {
      ...mapState({
        regions: state => state.aws.s3Regions,
        buckets: state => state.aws.buckets
      }),
      selectedRegion: {
        get() {
          return this.$store.state.aws.selectedRegion;
        },
        set(value) {
          this.$store.commit('selectRegion', value);
        }
      },
      keyId: {
        get() {
          return this.$store.state.aws.credentials.keyId;
        },
        set(keyId) {
          this.$store.commit('updateCredentials', {
            keyId
          });
        }
      },
      secretKey: {
        get() {
          return this.$store.state.aws.credentials.secretKey;
        },
        set(secretKey) {
          this.$store.commit('updateCredentials', {
            secretKey
          });
        }
      },
      bucketsText: {
        get() {
          const bucketsArray = this.$store.state.aws.buckets;
          return bucketsArray.reduce((bucketsString, bucket) => {
            if (bucketsString === '') return bucket;

            return `${bucketsString}\n${bucket}`;
          }, '')
        },
        set(bucketsString) {
          const lastChar = bucketsString[bucketsString.length - 1];
          if (lastChar === '\n') return;

          const buckets = bucketsString.split('\n').map(b => b.trim());
          this.$store.commit('updateBuckets', buckets);
        }
      },
      bucketPolicy: {
        get() {
          const d = new Date();
          return `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
          "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${this.selectedBucket}/*"
    }
  ]
}
          `.trim();
        }
      },
      corsPolicy: {
        get() {
          return `
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
  <AllowedOrigin>*</AllowedOrigin>
  <AllowedMethod>GET</AllowedMethod>
  <AllowedMethod>HEAD</AllowedMethod>
  <MaxAgeSeconds>3000</MaxAgeSeconds>
  <AllowedHeader>authorization</AllowedHeader>
  <AllowedHeader>x-amz-content-sha256</AllowedHeader>
  <AllowedHeader>x-amz-date</AllowedHeader>
  <AllowedHeader>x-amz-user-agent</AllowedHeader>
</CORSRule>
</CORSConfiguration>`.trim();
        }
      }
    }
  }
</script>

<style>
  #config {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #instructions {
    display: flex;
    flex-direction: column;
  }

  #instructions > h3 {
    margin: 20px 0 0 0;
  }

  #instructions > ol {
    list-style-position: inside;
    margin: 0;
  }

  #instructions h4 {
    display: inline-block;
  }
</style>
