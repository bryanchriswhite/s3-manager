<template>
  <div id="app">
    <nav>

    </nav>
    <section id="browser">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  :root {
    --nav-height: 80px;
    --divider-thickness: 3px;
  }

  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
  }

  nav {
    height: var(--nav-height)
  }

  #browser {
    height: calc(100% - var(--nav-height))
  }
</style>
