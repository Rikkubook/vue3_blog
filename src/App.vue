<template>
  <Header></Header>
  <h1 class="red-color">erwerewr</h1>
   <router-link class="nav-link" to="/login">Login</router-link>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header
  }
})
</script>

<style lang="scss">
.red-color{
  color: $red
}
</style>
