<template>
  <nav>
    <h1>
      S3 Manager
    </h1>
    <button class="config"
            v-on:click="toggleConfig">
      {{editingConfig ? 'Close' : 'Edit'}} Config
    </button>
  </nav>
</template>

<script>
  export default {
    name: 'nav',
    methods: {
      toggleConfig() {
        this.editingConfig ?
          this.$router.push('/config') :
          this.$router.push('/');
      }
    },
    computed: {
      editingConfig: function () {
        return this.$route.path == '/config';
      }
    }
  }
</script>

<style>
  nav {
    height: var(--nav-height);
    border-bottom: var(--divider-thickness) solid var(--divider-color);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }

  nav h1 {
    margin: 5px;
  }

  button {
    cursor: pointer;
  }
</style>
