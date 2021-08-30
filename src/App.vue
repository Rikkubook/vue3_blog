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
          apiKey: "AIzaSyDzs_qx5grreeyqp9nnc0sQ4BqZWIggggrgegrwNLBgk",
          authDomain: "hehehehehehe-140908.firebaseapp.com",
          databaseURL: "https://heheheheheh.firebaseio.com",
          projectId: "heheheeheheh-140908",
          storageBucket: "heheehe-140908.appspot.com",
          messagingSenderId: "319308316135544695"
          };
          firebase.initializeApp(config);
        //storage 開始
          //……………………………………………………………………..
          var storage = firebase.storage();

          const db = firebase.database();
          console.log("firebase");
          console.log(db.ref("/messages"));
        
      });

    }
})
</script>

<style lang="scss">
.red-color{
  color: $red
}
</style>
