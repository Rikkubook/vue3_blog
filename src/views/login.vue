<template>
  <div class="container">
    <form class="login">
      <div class="mb-3">
        {{ form.account }}
        <label for="account" class="form-label">Account</label>
        <input type="email" class="form-control" id="account" aria-describedby="accountHelp" placeholder="Enter account" v-model="form.account">
        <div id="accountHelp" class="form-text">Enter your email</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" aria-describedby="accountHelp" placeholder="Enter password" v-model="form.password">
      </div>
      <button type="submit" class="btn btn-primary pu-button" @click.prevent="routerToAdmin">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  // defineComponent
  setup() {
    const form = reactive({
      account: 'Mike',
      password: '123'
    })
    //  引入route
    const router = useRouter();
    const route = useRoute();

    const routerToAdmin = () => {
      router.push({name:"Admin-Home"})
      console.log(route.params);
    }
    return {
      form,
      routerToAdmin
    }
  }
})
</script>

<style lang="scss" scoped>
.login{
    @include _bg;
    border: 1px solid $primary;
    margin-top: 40px;
}
</style>