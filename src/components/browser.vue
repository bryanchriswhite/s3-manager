<template>
  <VerticalDivide id="vertical">
    <template slot="left">
      <HorizontalDivide :id="'horizontal1'"
                        :top-id="'buckets'"
                        :bottom-id="'files'">
        <template slot="top">
          <table>
            <thead>
            <tr>
              <th>Bucket Name</th>
              <th>File Count</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="bucket in buckets"
                v-bind:class="{selected: bucket == selectedBucket}"
                v-on:contextmenu="handleContextmenu($event, 'bucket', bucket)">
              <td>{{bucket}}</td>
              <td>{{files.length}}</td>
            </tr>
            </tbody>
          </table>
        </template>
        <template slot="bottom">
          <table>
            <thead>
            <tr>
              <th>File Name</th>
              <th>Last Modified</th>
              <th>Size</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="file in files"
                v-bind:class="{selected: file.name == selectedFile.name}"
                v-on:click="selectFile(file.name)"
                v-on:contextmenu="handleContextmenu($event, 'file', file)">
              <td>
                {{file.name}}
              </td>
              <td>
                {{file.modified}}
              </td>
              <td>{{formatSize(file.size)}}</td>
            </tr>
            </tbody>
          </table>
        </template>
      </HorizontalDivide>
    </template>
    <template slot="right">
      <HorizontalDivide :id="'horizontal2'"
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
               v-bind:style="{
                  'background-image': `url(${selectedFile.url})`
               }"
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
  import {formatSize} from '../utils.js'

  export default {
    name: 'browser',
    computed: {
      ...mapState({
        buckets: state => state.aws.buckets,
        files: state => state.aws.files,
        selectedBucket: state => state.aws.selectedBucket,
        selectedFile: state => state.aws.selectedFile
      })
    },
    components: {
      VerticalDivide,
      HorizontalDivide
    },
    methods: {
      formatSize,
      ...mapMutations([
        'openContextMenu',
        'selectFile'
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

  #buckets tbody > tr,
  #files tbody > tr {
    padding: 2px 0 2px 20px;
    cursor: pointer;
  }

  #buckets tbody > tr:nth-child(odd),
  #files tbody > tr:nth-child(odd) {
    background: #f4f4f4;
  }

  #buckets tbody > tr:hover,
  #files tbody > tr:hover {
    background: var(--hover-item-color);
  }

  #buckets tbody > tr.selected,
  #files tbody > tr.selected {
    background: var(--selected-item-color);
  }

  #preview .img {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top center;
  }
</style>
