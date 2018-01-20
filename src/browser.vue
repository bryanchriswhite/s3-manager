<template>
  <VerticalDivide id="vertical" :width="vertical">
    <template slot="left">
      <HorizontalDivide :id="'horizontal1'"
                        :height="horizontal1"
                        :top-id="'buckets'"
                        :bottom-id="'files'">
        <template slot="top">
          <ul>
            <li>Bucket 1</li>
            <li>Bucket 2</li>
            <li>Bucket 3</li>
          </ul>
        </template>
        <template slot="bottom">
          <ul>
            <li>File 1</li>
            <li>File 2</li>
            <li>File 3</li>
          </ul>
        </template>
      </HorizontalDivide>
    </template>
    <template slot="right">
      <HorizontalDivide :id="'horizontal2'"
                        :height="horizontal2"
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
          <!--<img src="https://placehold.it/300x300" alt="placeholder image"/>-->
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
        horizontal2: state => state.dividers.horizontal2
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
