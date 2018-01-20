<template>
  <div class="horizontal-divide" :id="id">
    <div ref="top"
         class="top"
         :id="topId"
         v-bind:style="{height: this.height[0]}">
      <slot name="top"></slot>
    </div>
    <div class="horizontal-divider"
         draggable="true"
         v-on:dragstart="handleDragstart"
         v-on:dragend="handleDragend"
    ></div>
    <div ref="bottom"
         class="bottom"
         :id="bottomId"
         v-bind:style="{height: this.height[1]}">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: 'horizontal-divide',
    props: [
      'id',
      'height',
      'topId',
      'bottomId'
    ],
    data: () => ({
      dragstartY: null,
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
        this.setSize({[this.id]: 'height'})
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
        this.dragstartY = event.screenY;
      },
      handleDragend(event) {
        const offsetY = this.dragstartY - event.screenY;
        this.dragstartY = null;
        this.resize({[this.id]: offsetY})
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
    /*height: 50%;*/
  }

  .horizontal-divide,
  .horizontal-divider,
  .top > *,
  .bottom > * {
    width: 100%;
  }
</style>
