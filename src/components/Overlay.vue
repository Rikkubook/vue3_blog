<template>
  <div class="pu-overlay" v-show="loading">
    <h1>Loading...</h1>
    <div class="slider">
      <div class="line"></div>
      <div class="break dot1"></div>
      <div class="break dot2"></div>
      <div class="break dot3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Overlay',
  props: {
    loading: Boolean
  },
})
</script>