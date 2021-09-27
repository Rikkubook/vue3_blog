<template>
  <Header v-if="firebaseInit"></Header>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <h1 class="red-color">erwerewr</h1> -->
  <!-- <router-link class="nav-link" to="/login">Login</router-link> -->
  <notifications />
  <router-view />
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue'
import Header from './components/Header.vue'

declare const firebase: any;

export default defineComponent({
  name: 'App',
  components: {
    Header
  },
    setup() {
      const firebaseInit = ref<boolean>(false)
      onMounted( async () => {
          // 初始化 Firebase
          var config = {
            apiKey: "AIzaSyBBQDoSuNjRt5ljHSi9LEPTCEodpCyBp3A",
            authDomain: "vue3blog-e3980.firebaseapp.com",
            databaseURL: "https://vue3blog-e3980-default-rtdb.firebaseio.com",
            projectId: "vue3blog-e3980",
            storageBucket: "vue3blog-e3980.appspot.com",
            messagingSenderId: "232656049",
            appId: "1:232656049:web:54eb54860152a516722690",
            measurementId: "G-2YYHXLQDSF"
          };
          await firebase.initializeApp(config);
          firebaseInit.value = true
          // console.log(firebaseInit.value )
          //storage 開始
          //……………………………………………………………………..
      });
      return {firebaseInit}
    }
})
</script>

<style lang="scss">
.red-color{
  color: $red
}

.vue-notification {
  // styling
  margin: 10px 10px !important;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;

  // default (blue)
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  // types (green, amber, red)
  &.success {
    background: #a0dbb2;
    border-left-color: #8ae6a5;
  }
  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }
  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>
