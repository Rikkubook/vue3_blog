<template>
  <Header></Header>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <h1 class="red-color">erwerewr</h1> -->
   <!-- <router-link class="nav-link" to="/login">Login</router-link> -->
  <router-view />
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import Header from './components/Header.vue'


export default defineComponent({
  name: 'App',
  components: {
    Header
  },
    setup() {

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
          firebase.initializeApp(config);
        //storage 開始
          //……………………………………………………………………..
          var storage = firebase.storage();
      });

    }
})
</script>

<style lang="scss">
.red-color{
  color: $red
}
</style>
