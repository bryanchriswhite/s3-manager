<template>
  <div id="app">
    <Navigation></Navigation>
    <section id="content">
      <transition name="fade-in">
        <router-view></router-view>
      </transition>
      <ContextMenu></ContextMenu>
    </section>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import Navigation from './components/navigation.vue'
  import ContextMenu from './components/context-menu.vue'

  export default {
    name: 'app',
    components: {
      Navigation,
      ContextMenu
    },
    methods: {
      ...mapActions([
        'refreshBuckets'
      ])
    },
    created() {
      this.refreshBuckets();
    }
  }
</script>

<style>
  :root {
    --nav-height: 40px;
    --divider-thickness: 3px;
    --divider-color: #c1c1c1;
    --base-color: #2c3e50;
    --hover-item-color: #bed1fd;
    --selected-item-color: #cfcfcf;
    --context-item-height: 30px;
  }

  body {
    margin: 0;
  }

  button {
    min-width: 100px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--base-color);
    height: 100vh;
  }

  #content {
    height: calc(100% - var(--nav-height));
    display: flex;
    flex-direction: column;
  }

  .fade-in-out-enter-active,
  .fade-in-enter-active,
  .fade-in-out-leave-active {
    transition: opacity 500ms;
  }

  .fade-in-out-enter,
  .fade-in-enter,
  .fade-in-out-leave-to,
  .fade-in-leave-to {
    opacity: 0;
  }
</style>
