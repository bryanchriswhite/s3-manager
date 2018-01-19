<template>
  <div class="horizontal-divide">
    <div ref="top" class="top" :id="topId">
      <slot name="top"></slot>
    </div>
    <div class="horizontal-divider"
         draggable="true"
         v-on:dragstart="handleDragstart"
         v-on:dragend="handleDragend"
    ></div>
    <div ref="bottom" class="bottom" :id="bottomId">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'horizontal-divide',
    props: [
      'height',
      'topId',
      'bottomId'
    ],
    data: () => ({
      height: '',
      dragstartY: null,
      hDivOffset: 0
    }),
    mounted() {
      window.addEventListener('resize', () => this.handleResize());
      this.handleResize();
    },
    methods: {
      handleResize() {
        const {top, bottom} = this.$refs;

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
      handleDragstart(event) {
        event.dataTransfer.setData('text/plain', null);
        this.dragstartY = event.screenY;
      },
      handleDragend(event) {
        this.hDivOffset = this.dragstartY - event.screenY;
        this.dragstartY = null;

        const {top, bottom} = this.$refs;

        this.incrementHeight(top, this.hDivOffset);
        this.decrementHeight(bottom, this.hDivOffset);
      },
      parseValue(string) {
        const valueRegex = /^[\d.]+/
          , valueMatch = string.match(valueRegex)
          , valueString = valueMatch && valueMatch[0];

        return parseInt(valueString, 10) || '';
      },
      incrementHeight(el, value) {
        const startValue = this.parseValue(el.style.height);
        el.style.height = `${startValue - value}px`;
      },
      decrementHeight(el, value) {
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
