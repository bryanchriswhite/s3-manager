<template>
  <div class="horizontal-divide">
    <slot name="top"></slot>
    <div class="horizontal-divider"
         draggable="true"
         v-on:dragstart="handleDragstart"
         v-on:dragend="handleDragend"
    ></div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
  export default {
    name: 'horizontal-divide',
    data: () => ({
      height: '',
      dragstartY: null,
      hDivOffset: 0
    }),
    mounted () {
      window.addEventListener('resize', () => this.handleResize());
      this.handleResize();
    },
    methods: {
      handleResize () {
        const top = this.$slots.top[0].elm
          , bottom = this.$slots.bottom[0].elm;

        // reset to allow flexbox to update width
        this.height = '';
        top.style.height = bottom.style.height = this.height;

        this.height = getComputedStyle(top).height;
        top.style.height = bottom.style.height = this.height;
      },
      /*
       *  NB: drag event doesn't contain offsetX/Y in firefox
       */
//      handleDrag: function (event) {
//        const {offsetX, offsetY} = event;
//        console.table({offsetX, offsetY})
//      },
      handleDragstart (event) {
        event.dataTransfer.setData('text/plain', null);
        this.dragstartY = event.screenY;
      },
      handleDragend (event) {
        this.hDivOffset = this.dragstartY - event.screenY;
        this.dragstartY = null;

        const top = this.$slots.top[0].elm
          , bottom = this.$slots.bottom[0].elm;

        this.incrementHeight(top, this.hDivOffset);
        this.decrementHeight(bottom, this.hDivOffset);
      },
      parseValue (string) {
        const valueRegex = /^[\d.]+/
          , valueMatch = string.match(valueRegex)
          , valueString = valueMatch && valueMatch[0];

        return parseInt(valueString, 10) || '';
      },
      incrementHeight (el, value) {
        const startValue = this.parseValue(el.style.height);
        el.style.height = `${startValue - value}px`;
      },
      decrementHeight (el, value) {
        const startValue = this.parseValue(el.style.height);
        el.style.height = `${startValue + value}px`;
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
    height: 50%;
  }

  .horizontal-divide,
  .horizontal-divider,
  .top > *,
  .bottom > * {
    width: 100%;
  }
</style>
