<template>
  <secction class="d-block  container">
    <div class="mb-3 mt-5">
      <ul class="list-group list-group-horizontal justify-content-center">
        <li class="list-group-item">
          <router-link to="/login">Login</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/register">Register</router-link>
        </li>
      </ul>
    </div>
    <form class="login">
      <div class="mb-3">
        <label for="account" class="form-label">Account</label>
        <input type="email" class="form-control" id="account" aria-describedby="accountHelp" placeholder="Enter account" v-model="form.email">
        <div id="accountHelp" class="form-text">Enter your email</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" aria-describedby="accountHelp" placeholder="Enter password" v-model="form.password">
      </div>
      <button class="btn btn-primary pu-button" @click.prevent="submitAccount()">
        Submit
      </button>
      <a v-if="mode ==='login' " href="javaScript:;" class="float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">forgetPassword</a>
    </form>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Email:</label>
                <input type="email" class="form-control" id="recipient-name" v-model="forgetEmail">
              </div>
            </form>
          </div>
          <div class="modal-footer pu-buttonsGroup">
            <button type="button" class="btn btn-outline-primary pu-button" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary pu-button"  @click="forgetPassword()">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </secction>
</template>

<script lang="ts">
import { onMounted, ref, reactive, defineComponent, watch  } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { notify } from "@kyvg/vue3-notification";

declare const firebase: any;
declare const bootstrap: any;

notify({
  type: 'success',
  title: "註冊成功🎉",
  duration: 20000
});

export default defineComponent({
  // defineComponent
  setup() {
    const form = reactive({
      email: '',
      password: ''
    })
    const forgetEmail = ref('')
    //  引入route
    const router = useRouter()
    const route = useRoute()
    const mode = ref('login')

    onMounted( async () => {
      if(route.name ==="Register"){
        mode.value = 'register'
      }
    })

    watch(() => route.name, () => { //?
      if(route.name ==="Register"){
        mode.value = 'register'
        // console.debug(`mode.value to ${mode.value}`);
      }else{
        mode.value = 'login'
        // console.debug(`mode.value to ${mode.value}`);
      }
    });

    const submitAccount = () => {
      if (mode.value==='register'){
          firebase.auth().createUserWithEmailAndPassword(form.email, form.password).then((result:object) => {
          console.log(result)
          // alert('註冊成功')
          // notify({
          //   type: 'success',
          //   title: "註冊成功🎉",
          // });
        }).catch(function(error: { status: number, message: string }) {
          console.log(error.message)
          alert(error.message)
        });
      } else {
        firebase.auth().signInWithEmailAndPassword(form.email, form.password).then((result:object) => {
          console.log(result)
          alert('登入成功')
          router.push({name:"Admin-Home"})
        }).catch(function(error: { status: number, message: string }) {
          console.log(error.message)
          alert(error.message)
        });
      }
    }

    const forgetPassword = () => {
      firebase.auth()
      .sendPasswordResetEmail(forgetEmail.value)
      .then(() => {
          alert('請查看您的信箱以重設密碼')
          forgetEmail.value = ''
          const truck_modal = document.querySelector('#exampleModal')
          const modal = bootstrap.Modal.getInstance(truck_modal)
          modal.hide()
      }).catch((error: { status: number, message: string }) => {
        alert(error)
      })
    }

    return {mode, form, forgetEmail, submitAccount, forgetPassword}
  }
})
</script>

<style lang="scss">
.list-group-item{
  padding: 0;
  a{
    padding: 10px 20px;
    min-width: 100px;
    text-align: center;
    display: block;
    text-decoration: none;
    background-color: #e3ded8;
    color: #212529;
    &.router-link-exact-active{
      background-color: #556085;
      color: #fff;
    }
  }
  &:first-child{
    border-radius: 10px 0 0 10px !important;
    overflow: hidden;
  }
  &:last-child{
    border-radius: 0 10px 10px 0 !important;
    overflow: hidden;
  }
}
.login{
    @include _bg;
    border: 1px solid $primary;
    margin-top: 40px;
}
</style>