<template>
    <secction class="d-block container">
        <form class="login">
          <div class="mb-3">
            <label for="pageTitle" class="form-label">輸入文章標題</label>
            <input type="text" class="form-control" id="pageTitle" v-model="formData.title">
          </div>
          <div class="mb-3">
            <label for="pageContent" class="form-label" >文章內容</label>
            <textarea type="textarea" class="form-control" id="pageContent"  rows="10" max-rows="10" v-model="formData.content"/>
          </div>
          <div class="pu-buttonsGroup">
            <button class="btn btn-outline-primary  pu-button" @click.prevent="resetFormData">重設</button>
            <button class="btn btn-primary  pu-button" @click.prevent="submitFormData()">送出</button>
          </div>
        </form>
    </secction>
</template>

<script lang="ts">
import{ onMounted, ref, reactive, defineComponent } from 'vue'
import { useRoute, useRouter } from "vue-router"

import axios from 'axios'
import dayjs from 'dayjs'

interface ArticlesItem{
    banner: string,
    content: string,
    date:number, 
    id: string,
    title:string, 
}
interface Articles extends Array<ArticlesItem>{ //  擴展原本 Array 否則 push 會沒吃到
    [index: number]: ArticlesItem ;
}
export default defineComponent({
    setup() {
      const route = useRoute()
      const router = useRouter()
      const mode = ref<string>('add')
      const formData  = reactive({
        title: "" as string,
        date: 0 as number,
        content: "" as string,
        id: "" as string | string[]
      });
      const articles:Articles = reactive([]); // 定義


      onMounted(async () => {
        if(route.name ==="Admin-Edit"){
            const id = route.params.id
            mode.value = 'edit'
            try{
                let Articles = await axios.get('https://us-central1-expressapi-8c039.cloudfunctions.net/app/article');
                await Articles.data.data.forEach( (data:ArticlesItem) => {
                    return articles.push(data);
                });
                    formData.title = articles.filter(art=> art.id === id)[0].title
                    formData.date = articles.filter(art=> art.id === id)[0].date
                    formData.content = articles.filter(art=> art.id === id)[0].content
                    formData.id = route.params.id
            } catch(error){
                console.log(error)
            }
        } 
      })
    
      //方法
      const submitFormData = () =>{
        formData.date = new Date().getTime()
        if (mode.value==='edit'){
            //帶兩個參數與變數
            updateArticles(formData.id, formData)
        } else{
            addArticles()
        }
      }
      const updateArticles =(id:string|string[], form:object) =>{
        console.log(id, form)
        // 成功
        router.push({name: 'Admin-Home'})
      }
      const addArticles = () => {
        const ID = Math.random()*1000
        let id ="newArticles" +ID
        formData.id = id
        console.log(formData)
      }

      return {articles, formData, mode, submitFormData}
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