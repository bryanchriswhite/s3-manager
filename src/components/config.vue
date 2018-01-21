<template>
  <form id="config">
    <label for="region">Region:</label>
    <select name="region"
            v-model="selectedRegion">
      <option v-for="_region in regions"
              v-bind:value="_region.region">
        {{_region.name}}
      </option>
    </select>
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
      }
    }
  }
</script>

<style>
  #config {
    margin-top: 20px;
  }
</style>
