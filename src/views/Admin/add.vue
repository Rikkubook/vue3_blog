<template>
    <secction class="d-block container">
        <form class="login">
          {{formData}}
          <div class="mb-3">
            <label for="pageTitle" class="form-label">輸入文章標題</label>
            <input type="text" class="form-control" id="pageTitle">
          </div>
          <div class="mb-3">
            <label for="pageContent" class="form-label">文章內容</label>
            <textarea type="textarea" class="form-control" id="pageContent"  rows="10" max-rows="10"/>
          </div>
          <div class="pu-buttonsGroup">
            <button type="submit" class="btn btn-outline-primary  pu-button" @click="resetFormData">重設</button>
            <button type="submit" class="btn btn-primary  pu-button" @click="submitFormData">送出</button>
          </div>
        </form>
    </secction>
</template>

<script lang="ts">
import{ onMounted, ref, Ref, reactive, defineComponent } from 'vue'
import { useRoute } from "vue-router"

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

      let mode:Ref<string> = ref('add')
      let formData = reactive({
        title: "" as string,
        date: 0 as number,
        content: "" as string,
      });
      const thisAccount = ref(null)
      let filterById:Object  = reactive({}); // 定義
      const articles:Articles = reactive([]); // 定義

      onMounted(async () => {
        if(route.name ==="Admin-Edit"){
            const id = route.params.id
            mode = ref('edit')
            console.log(id)
            //並調度changeFocusId改變 focusIdㄙ
            try{
                let Articles = await axios.get('https://us-central1-expressapi-8c039.cloudfunctions.net/app/article');
                await Articles.data.data.forEach( (data:ArticlesItem) => {
                    // console.log(data.content.substring(0,150))
                    return articles.push(data);
                });
                formData = {
                    title: articles.filter(art=> art.id === id)[0].title,
                    date: articles.filter(art=> art.id === id)[0].date,
                    content: articles.filter(art=> art.id === id)[0].content,
                }
                console.log(formData)
            } catch(error){
                console.log(error)
            }
        }
        console.log(formData)
        // thisAccount = this.$store.state.account
        console.log(route.name)
      })

      return {mode, formData, articles, filterById}
    }
})
// export default {
//     mounted (){
//         if(this.$route.name ==="Admin-Edit"){
//             const id = this.$route.params.id
//             this.mode ='edit'
//             console.log(id)
//             //並調度changeFocusId改變 focusIdㄙ
//             this.$store.dispatch('changeFocusId',id)
//         }
//         this.thisAccount = this.$store.state.account
//     },
//     computed:{
//         ...mapState(['account','articlesChange']),
//         ...mapGetters(['filterById'])
//     },
//     methods:{
//         ...mapActions(['addArticles','updateArticles']),
//         resetFormData: function(){
//             this.formData={
//                 title: "",
//                 date: "",
//                 content: ""
//             }
//         },
//         submitFormData: function(){
//             this.formData.date = new Date().getTime()
//             if (this.mode==='edit'){
//                 //帶兩個參數與變數
//                 this.updateArticles( {id:this.$route.params.id,newArticles:this.formData} )
//             } else{
//             console.log(this.formData)
//             this.addArticles(this.formData)
//             }
//         }
//     } ,
//     watch:{
//         filterById: function(){
//             this.formData.title = this.filterById.title
//             this.formData.content = this.filterById.content
//         },
//         articlesChange: function(){
//             //監聽data變化
//             this.$router.push({name: 'Admin-Home'})
//         }
//     }
// }
</script>

<style lang="scss" scoped>
.login{
    @include _bg;
    border: 1px solid $primary;
    margin-top: 40px;
}
</style>