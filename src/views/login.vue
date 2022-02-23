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
      <a v-if="mode ==='login' " href="javaScript:;" class="float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">Forget Password</a>
    </form>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Forget Password</h5>
            <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
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

    watch(route, () => {
      if(route.name ==="Register"){
        mode.value = 'register'
        // console.debug(`mode.value to ${mode.value}`);
      }else{
        mode.value = 'login'
        // console.debug(`mode.value to ${mode.value}`);
      }
    })

    const submitAccount = () => {
      if (mode.value==='register'){
          firebase.auth().createUserWithEmailAndPassword(form.email, form.password).then((result:object) => {
          notify({
            type: 'success',
            title: "註冊成功🎉",
            duration: 2000
          })
        }).catch(function(error: { status: number, message: string }) {
          console.log(error.message)
          alert(error.message)
          notify({
            type: 'error',
            title: error.message,
            duration: 2000
          })
        });
      } else {
        firebase.auth().signInWithEmailAndPassword(form.email, form.password).then((result:object) => {
          notify({
            type: 'success',
            title: "登入成功🎉",
            duration: 2000
          })
          router.push({name:"Admin-Home"})
        }).catch(function(error: { status: number, message: string }) {
          notify({
            type: 'error',
            title: error.message,
            duration: 2000
          })
        });
      }
    }

    const forgetPassword = () => {
      firebase.auth()
      .sendPasswordResetEmail(forgetEmail.value)
      .then(() => {
          forgetEmail.value = ''
          const truck_modal = document.querySelector('#exampleModal')
          const modal = bootstrap.Modal.getInstance(truck_modal)
          modal.hide()
          notify({
            title: "請查看您的信箱以重設密碼",
            duration: 2000
          })
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
.btn-close{
  background: transparent url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'><path d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/></svg>") center/1em auto no-repeat
}
</style>