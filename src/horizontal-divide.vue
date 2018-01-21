<template>
  <div class="horizontal-divide" :id="id">
    <div class="top"
         :id="topId"
         v-bind:style="{height: this.heights[0]}">
      <slot name="top"></slot>
    </div>
    <div class="horizontal-divider"
         draggable="true"
         v-on:dragstart="handleDragstart"
         v-on:dragend="handleDragend"
    ></div>
    <div class="bottom"
         :id="bottomId"
         v-bind:style="{height: this.heights[1]}">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {parseValue} from './utils.js'

  export default {
    name: 'horizontal-divide',
    props: [
      'id',
      'heights',
      'topId',
      'bottomId'
    ],
    data: () => ({
      dragstartY: null,
    }),
    methods: {
      ...mapMutations([
        'resize'
      ]),
      /*
       *  NB: drag event doesn't contain offsetX/Y in firefox
       *  handleDrag (event) {
       *    const {offsetX, offsetY} = event;
       *    console.table({offsetX, offsetY})
       *  },
       */
      handleDragstart(event) {
        event.dataTransfer.setData('text/plain', null);
        this.dragstartY = event.screenY;
      },
      handleDragend(event) {
        const offsetY = this.dragstartY - event.screenY;
        this.dragstartY = null;

        const startPercent = parseValue(this.heights[0]);
        const maxHeight = document.documentElement.clientHeight;
        const newPercent = (startPercent / 100 * maxHeight - offsetY) / maxHeight * 100;
        this.resize({
          [this.id]: [
            `${newPercent}%`,
            `${100 - newPercent}%`
          ]
        });
      }
    }
  }
</script>

<style>
  .horizontal-divider {
    height: 3px;
    background: #545454;
    cursor: ns-resize;
  }

  .top, .bottom {
    display: flex;
    flex-direction: row;
  }

  .horizontal-divide,
  .horizontal-divider,
  .top > *,
  .bottom > * {
    width: 100%;
  }
</style>
