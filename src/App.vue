<template>
  <div id="app">
    <VerticalDivide>
      <div slot="left"
           class="left"
      >
        <HorizontalDivide>
          <div slot="top"
               class="top"
               id="buckets"
          >
            <ul>
              <li>Bucket 1</li>
              <li>Bucket 2</li>
              <li>Bucket 3</li>
            </ul>
          </div>
          <div slot="bottom"
               class="bottom"
               id="files"
          >
            <ul>
              <li>File 1</li>
              <li>File 2</li>
              <li>File 3</li>
            </ul>
          </div>
        </HorizontalDivide>
      </div>
      <div slot="right" class="right">
        <HorizontalDivide>
          <div
            slot="top"
            class="top"
            id="properties"
          >
            <ul>
              <li>Property 1</li>
              <li>Property 2</li>
              <li>Property 3</li>
            </ul>
          </div>
          <div
            slot="bottom"
            class="bottom"
            id="preview"
          >
            <div class="img"
                 style="background-image: url('https://placehold.it/300x300')"
            ></div>
            <!--<img src="https://placehold.it/300x300" alt="placeholder image"/>-->
          </div>
        </HorizontalDivide>
      </div>
    </VerticalDivide>
  </div>
</template>

<script>
  import VerticalDivide from './vertical-divide.vue'
  import HorizontalDivide from './horizontal-divide.vue'

  export default {
    name: 'app',
    components: {
      VerticalDivide,
      HorizontalDivide
    }
  }
</script>

<style>
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

  #preview .img {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
</style>
