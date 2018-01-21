<template>
  <VerticalDivide id="vertical" :widths="vertical">
    <template slot="left">
      <HorizontalDivide :id="'horizontal1'"
                        :heights="horizontal1"
                        :top-id="'buckets'"
                        :bottom-id="'files'">
        <template slot="top">
          <ul>
            <li v-for="bucket in buckets">{{bucket}}</li>
          </ul>
        </template>
        <template slot="bottom">
          <ul>
            <li v-for="file in files">
              {{file}}
            </li>
          </ul>
        </template>
      </HorizontalDivide>
    </template>
    <template slot="right">
      <HorizontalDivide :id="'horizontal2'"
                        :heights="horizontal2"
                        :top-id="'properties'"
                        :bottom-id="'preview'">
        <template slot="top">
          <ul>
            <li>Property 1</li>
            <li>Property 2</li>
            <li>Property 3</li>
          </ul>
        </template>
        <template slot="bottom">
          <div class="img"
               style="background-image: url('https://placehold.it/300x300')"
          ></div>
        </template>
      </HorizontalDivide>
    </template>
  </VerticalDivide>
</template>

<script>
  import {mapState} from 'vuex'
  import VerticalDivide from './vertical-divide.vue'
  import HorizontalDivide from './horizontal-divide.vue'

  export default {
    name: 'browser',
    computed: {
      ...mapState({
        vertical: state => state.dividers.vertical,
        horizontal1: state => state.dividers.horizontal1,
        horizontal2: state => state.dividers.horizontal2,
        buckets: state => state.aws.buckets,
        files: state => state.aws.files
      })
    },
    components: {
      VerticalDivide,
      HorizontalDivide
    }
  }
</script>

<style>
  #preview .img {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
</style>
