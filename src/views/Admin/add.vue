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

declare const firebase: any;

interface ArticlesItem{
    banner: string,
    content: string,
    date:number, 
    id: string,
    title:string, 
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
        id: "" as string
      });
      const articles:any = reactive({data:[]});// 定義


      onMounted(async () => {
        if(route.name ==="Admin-Edit"){
            const id = route.params.id
            mode.value = 'edit'
            try{

                const db = firebase.database();
                const msgRef = db.ref("messages");
                await msgRef.on('value', (snapshot:any) =>{ // 帶出所有的資料
                console.log(Object.values(snapshot.val()));
                  articles.data = Object.values(snapshot.val())
                })
                // let Articles = await axios.get('https://us-central1-expressapi-8c039.cloudfunctions.net/app/article');
                // await Articles.data.data.forEach( (data:ArticlesItem) => {
                //     return articles.push(data);
                // });
                formData.title = articles.data.filter((art:ArticlesItem) => art.id === id)[0].title
                formData.date = articles.data.filter((art:ArticlesItem) => art.id === id)[0].date
                formData.content = articles.data.filter((art:ArticlesItem) => art.id === id)[0].content
                formData.id = route.params.id as string
            } catch(error){
                console.log(error)
            }
        } 
      })
    
      //方法
      const submitFormData = () =>{
        formData.date = new Date().getTime()
        if (mode.value==='edit'){
            updateArticles()
        } else{
            addArticles()
        }
      }
      const updateArticles = () =>{
        const db = firebase.database();
        const msgRef = db.ref(`messages/${route.params.id}`); // update 修改
        msgRef.update(formData)
        router.push({name: 'Admin-Home'})
      }
      const addArticles = () => {
        const db = firebase.database();
        const msgRef = db.ref("messages");

        
        const key = msgRef.push().key; //會用firebase 產生隨機的key
        formData.id = key
        msgRef.child(key).set(formData) //可以用child or 相對路徑
        router.push({name: 'Admin-Home'})
      }
      const resetFormData = () => {
        console.log('resetFormData')
      }

      return {articles, formData, mode, submitFormData, resetFormData}
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