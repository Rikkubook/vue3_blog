<template>
  <div class="pu-overlay" :show="loading">
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