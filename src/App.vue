<template>
  <Header></Header>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <h1 class="red-color">erwerewr</h1>
   <router-link class="nav-link" to="/login">Login</router-link>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    HelloWorld
  }
})
</script>

<style lang="scss">
.red-color{
  color: $red
}
</style>
