<template>
    <div class="">
        <div class="container">
          <img class="pu-errorImg" alt="Vue logo" src="../assets/404.png">
          <a class="d-block text-center text-white mb-5" href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>
          <button class="btn btn-primary pu-button" @click.prevent="goBack()"> Go Back</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup () {
    const router = useRouter()

    const goBack = () => {
        router.push({name: 'Home'})
    }
    return {goBack}
  }
})
</script>