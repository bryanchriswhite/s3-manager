<template>
  <form id="config">
      <select name="region"
              v-model="selectedRegion">
        <option v-for="region in regions"
                v-bind:value="region.region">
          {{region.name}}
        </option>
      </select>
      <input type="text"
             name="key-id"
             placeholder="Secret Key Id"
             v-model="keyId"/>
      <input type="password"
             name="secret-key"
             placeholder="Access Secret Key"
             v-model="secretKey"/>
  </form>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'config',
    computed: {
      ...mapState({
        regions: state => state.aws.s3Regions
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
      }
    }
  }
</script>

<style>
  #config {
    margin-top: 20px;
  }
</style>
