<template>
  <div class="vertical-divide">
    <slot name="left"></slot>
    <div class="vertical-divider"
         draggable="true"
         v-on:dragstart="handleDragstart"
         v-on:dragend="handleDragend"
    ></div>
    <slot name="right"></slot>
  </div>
</template>

<script>
  export default {
    name: 'vertical-divide',
    data: () => ({
      width: '',
      dragstartX: null,
      vDivOffset: 0
    }),
    mounted () {
      window.addEventListener('resize', () => this.handleResize());
      this.handleResize();
    },
    methods: {
      handleResize () {
        const left = this.$slots.left[0].elm
          , right = this.$slots.right[0].elm;

        // reset to allow flexbox to update width
        this.width = '';
        left.style.width = right.style.width = this.width;

        this.width = getComputedStyle(left).width;
        left.style.width = right.style.width = this.width;
      },
      /*
       *  NB: drag event doesn't contain offsetX/Y in firefox
       */
//      handleDrag (event) {
//        const {offsetX, offsetY} = event;
//        console.table({offsetX, offsetY})
//      },
      handleDragstart (event) {
        event.dataTransfer.setData('text/plain', null);
        this.dragstartX = event.screenX;
      },
      handleDragend (event) {
        this.vDivOffset = this.dragstartX - event.screenX;
        this.dragstartX = null;

        const left = this.$slots.left[0].elm
          , right = this.$slots.right[0].elm;

        this.incrementWidth(left, this.vDivOffset);
        this.decrementWidth(right, this.vDivOffset);
      },
      parseValue (string) {
        const valueRegex = /^[\d.]+/
          , valueMatch = string.match(valueRegex)
          , valueString = valueMatch && valueMatch[0];

        return parseInt(valueString, 10) || '';
      },
      incrementWidth (el, value) {
        const startValue = this.parseValue(el.style.width);
        el.style.width = `${startValue - value}px`;
      },
      decrementWidth (el, value) {
        const startValue = this.parseValue(el.style.width);
        el.style.width = `${startValue + value}px`;
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
    width: 100%;
  }

  .vertical-divide,
  .vertical-divider,
  .left > *,
  .right > * {
    height: 100%;
  }
</style>
