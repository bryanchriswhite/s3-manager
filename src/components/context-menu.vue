<template>
  <transition name="fade-in-out">
    <div id="context-menu"
         v-show="visible"
         v-on:blur="closeContextMenu"
         v-bind:style="{
         top: `${this.y}px`,
         left: `${this.x}px`
       }"
         tabindex="-1">
      <ul>
        <li>{{context}} item 1</li>
        <li>{{context}} item 2</li>
        <li>{{context}} item 3</li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'context-menu',
    computed: {
      ...mapState({
        x: state => state.contextMenu.x,
        y: state => state.contextMenu.y,
        visible: state => state.contextMenu.visible,
        context: state => state.contextMenu.context,
        item: state => state.contextMenu.item
      })
    },
    methods: {
      ...mapMutations([
        'closeContextMenu'
      ]),
      handleEscapeKey(event) {
        if (event.key == 'Escape') this.closeContextMenu();
      }
    },
    updated() {
      if (this.visible) {
        this.$el.focus();
        window.addEventListener('keydown', this.handleEscapeKey)
      } else {
        this.$el.blur();
        window.removeEventListener('keydown', this.handleEscapeKey)
      }
    }
  }
</script>

<style>
  #context-menu,
  #context-menu:focus {
    position: absolute;
    outline: 2px solid var(--divider-color);
  }

  #context-menu > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    background: white;
  }

  #context-menu > ul > li {
    border-bottom: 2px solid var(--divider-color);
    padding: 5px;
    cursor: pointer;
  }

  #context-menu > ul > li:last-child {
    border: none;
  }

  #context-menu > ul > li:hover {
    background: var(--hover-item-color);
  }
</style>
