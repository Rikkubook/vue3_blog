<template>
  <Header :login="login"></Header>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <h1 class="red-color">erwerewr</h1> -->
   <!-- <router-link class="nav-link" to="/login">Login</router-link> -->
  <router-view />
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue'
import Header from './components/Header.vue'


export default defineComponent({
  name: 'App',
  components: {
    Header
  },
    setup() {
      const login:boolean = ref(false);
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

          firebase.auth().onAuthStateChanged(function(user) { 
            // 不能丟到header? https://ithelp.ithome.com.tw/articles/10206354
            if(user) {
              console.log(user);
              login.value = true;
              console.log('login',true)
            } else {
              // 使用者未登入
              login.value = false;
              console.log('login',false)
            }
          })
      });
      return {login}
    }
})
</script>

<style lang="scss">
.red-color{
  color: $red
}
</style>
