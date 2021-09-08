<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 red">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li v-show="login" class="nav-item">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
          <li v-show="!login" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-show="login" class="nav-item">
            <a class="nav-link" href="javaScript:;" @click="signOut()">SignOut</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn bg-secondary" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
// import { Navbar } from 'bootstrap'
import { onMounted, ref, defineComponent } from 'vue'
import { useRouter, useRoute } from "vue-router";

declare const firebase: any;

export default defineComponent({
  name: 'Header',
  props: {
    msg: String,
    login: Boolean
  },
  setup() {
    const router = useRouter()
    const login = ref(false);

    onMounted( async () => {
          firebase.auth().onAuthStateChanged(function(user:any) { 
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
    })
    const signOut = () => {
      firebase.auth().signOut()
      .then(function() {
        // 登出後強制重整一次頁面
        return router.push({name:"Home"})
      }).catch(function(error: { status: number, message: string }) {
        console.log(error.message)
      });
    }

    return {signOut, login}
  }
})
</script>

<style lang="scss">
  .router-link-active{
    color: #e3ded8;
  }
</style>