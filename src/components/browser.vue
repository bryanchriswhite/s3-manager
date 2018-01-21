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
                v-on:click="selectFile(file)"
                v-on:contextmenu="handleContextmenu($event, 'file', file)">
              <td>{{file.name}}</td>
              <td>{{file.lastModified}}</td>
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
          <section class="metadata">
            <ul class="labels">
              <li>File Name</li>
              <li>Public Url</li>
              <li>Size</li>
              <li>Last Modified</li>
              <li>Content Type</li>
              <li>Encoding</li>
            </ul>
            <ul class="values">
              <li>{{selectedFile.name || '&nbsp;'}}</li>
              <li>{{selectedFile.url || '&nbsp;'}}</li>
              <li>{{formatSize(selectedFile.size) || '&nbsp;'}}</li>
              <li>{{selectedFile.lastModified || '&nbsp;'}}</li>
              <li>{{selectedFile.contentType || '&nbsp;'}}</li>
              <li v-bind:class="{i: !selectedFile.encoding}">
                {{selectedFile.encoding || 'N/A'}}
              </li>
            </ul>
          </section>
          <textarea name="embed-code" cols="30" rows="10"
                    v-bind:value="embedCode"></textarea>
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
  import {mapState, mapMutations, mapActions} from 'vuex'
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
      }),
      embedCode: () => 'WIP'
    },
    components: {
      VerticalDivide,
      HorizontalDivide
    },
    methods: {
      formatSize,
      ...mapMutations([
        'openContextMenu',
      ]),
      ...mapActions([
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

  #properties {
    flex-direction: column;
  }

  #properties .i {
    font-style: italic;
  }

  #properties .labels,
  #properties .values {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  #properties .metadata {
    display: flex;
    justify-content: center;
    margin-top: 2px;
  }

  #properties .labels {
    align-items: flex-end;
    margin-right: 10px;
    font-weight: bold;
  }

  #properties .values {
    align-items: flex-start;
  }

  #preview .img {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top center;
  }
</style>
