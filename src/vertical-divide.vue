<template>
  <div class="vertical-divide" :id="id">
    <section class="left"
         :id="leftId"
         v-bind:style="{width: this.widths[0]}">
      <slot name="left"></slot>
    </section>
    <div class="vertical-divider"
         draggable="true"
         v-on:dragstart="handleDragstart"
         v-on:dragend="handleDragend"
    ></div>
    <section class="right"
         :id="rightId"
         v-bind:style="{width: this.widths[1]}">
      <slot name="right"></slot>
    </section>
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
            `calc(${100 - newPercent}% - var(--divider-thickness))`,
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
    width: var(--divider-thickness);
    background: var(--divider-color);
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
