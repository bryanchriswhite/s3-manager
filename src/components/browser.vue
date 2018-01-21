<template>
  <VerticalDivide id="vertical" :widths="vertical">
    <template slot="left">
      <HorizontalDivide :id="'horizontal1'"
                        :heights="horizontal1"
                        :top-id="'buckets'"
                        :bottom-id="'files'">
        <template slot="top">
          <ul>
            <li v-for="bucket in buckets"
                v-on:contextmenu="handleContextmenu($event, 'bucket', bucket)">
              {{bucket}}
            </li>
          </ul>
        </template>
        <template slot="bottom">
          <ul>
            <li v-for="file in files"
                v-on:contextmenu="handleContextmenu($event, 'file', file)">
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
  import {mapState, mapMutations} from 'vuex'
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
    },
    methods: {
      ...mapMutations([
        'openContextMenu'
      ]),
      handleContextmenu(event, context, item) {
        this.openContextMenu({
          x: event.clientX,
          y: event.clientY,
          context,
          item
        });
        event.preventDefault();
        return false;
      }
    }
  }
</script>

<style>
  #buckets, #files {
    text-align: left;
  }

  #buckets > ul, #files > ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  #buckets > ul > li,
  #files > ul > li {
    padding: 2px 0 2px 20px;
  }

  #buckets > ul > li:nth-child(even),
  #files > ul > li:nth-child(even) {
    background: #f4f4f4;
  }

  #buckets > ul > li:hover,
  #files > ul > li:hover {
    background: var(--hover-item-color);
  }

  #preview .img {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
</style>
