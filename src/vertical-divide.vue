<template>
  <div class="vertical-divide" :id="id">
    <div class="left"
         :id="leftId"
         v-bind:style="{width: this.widths[0]}">
      <slot name="left"></slot>
    </div>
    <div class="vertical-divider"
         draggable="true"
         v-on:dragstart="handleDragstart"
         v-on:dragend="handleDragend"
    ></div>
    <div class="right"
         :id="rightId"
         v-bind:style="{width: this.widths[1]}">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {parseValue} from './utils.js'

  export default {
    name: 'vertical-divide',
    props: [
      'id',
      'widths',
      'left-id',
      'right-id'
    ],
    data: () => ({
      dragstartX: null,
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
        this.dragstartX = event.screenX;
      },
      handleDragend(event) {
        const offsetX = this.dragstartX - event.screenX;
        this.dragstartX = null;

        const startPercent = parseValue(this.widths[0]);
        const maxWidth = document.documentElement.clientWidth;
        const newPercent = (startPercent / 100 * maxWidth - offsetX) / maxWidth * 100;
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
  .vertical-divide {
    display: flex;
    flex-direction: row;
  }

  .vertical-divider {
    width: 3px;
    background: #545454;
    cursor: ew-resize;
  }

  .left, .right {
    display: flex;
    flex-direction: column;
  }

  .vertical-divide,
  .vertical-divider,
  .left > *,
  .right > * {
    height: 100%;
  }
</style>
