<template>
  <div id="app">
    <Navigation></Navigation>
    <section id="content">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>

<script>
  import Navigation from './components/navigation.vue'

  export default {
    name: 'app',
    components: {
      Navigation
    }
  }
</script>

<style>
  :root {
    --nav-height: 40px;
    --divider-thickness: 3px;
    --divider-color: #c1c1c1;
    --base-color: #2c3e50;
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

  .fade-enter-active {
    transition: opacity 500ms;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
