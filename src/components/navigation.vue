<template>
  <nav>
    <h1>
      S3 Manager
    </h1>
    <button v-on:click="resetLayout">
      Reset Layout
    </button>
    <button class="config"
            v-on:click="toggleConfig">
      {{editingConfig ? 'Close' : 'Edit'}} Config
    </button>
  </nav>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {initialState} from '../store.js'

  export default {
    name: 'navigation',
    methods: {
      ...mapMutations([
        'resize'
      ]),
      toggleConfig() {
        this.editingConfig ?
          this.$router.push('/') :
          this.$router.push('/config');
      },
      resetLayout() {
        console.log('initialState:', initialState);
        this.resize(initialState.dividers);
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
