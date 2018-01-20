<template>
  <div class="vertical-divide" :id="id">
    <div class="left"
         :id="leftId"
         v-bind:style="{width: this.width[0]}">
      <slot name="left"></slot>
    </div>
    <div class="vertical-divider"
         draggable="true"
         v-on:dragstart="handleDragstart"
         v-on:dragend="handleDragend"
    ></div>
    <div class="right"
         v-bind:style="{width: this.width[1]}">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: 'vertical-divide',
    props: [
      'id',
      'width',
      'left-id',
      'right-id'
    ],
    data: () => ({
      dragstartX: null,
    }),
    mounted() {
      window.addEventListener('resize', () => this.handleResize());
      setTimeout(() => {
        this.handleResize();
      }, 1000);
    },
    methods: {
      ...mapMutations([
        'resize',
        'setSize'
      ]),
      handleResize() {
        this.setSize({[this.id]: 'width'})
      },
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
        this.resize({[this.id]: offsetX})
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
    /*width: 100%;*/
  }

  .vertical-divide,
  .vertical-divider,
  .left > *,
  .right > * {
    height: 100%;
  }
</style>
