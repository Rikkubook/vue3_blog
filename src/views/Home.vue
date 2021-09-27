<template>
  <div class="home container-fluid">
    <div class="row mt-3">
      <div class=" col-12 col-md-9 order-1 order-md-0">
        <article class="article backColor mb-3" v-for="art in articles" :key="art.id">
          <h3 @click="routerToArticle(art.id)" class="pointer">{{art.title}}</h3>
          <i class="date mb-2">{{art.date}}</i>
          <div class="text-center">{{subContent(art.content)}}</div>
        </article>
      </div>
      <SideBar :articles="articles"></SideBar>
        <!-- {{articles}} -->
    </div>


  </div>
</template>

<script lang="ts">

import { onMounted, reactive, ref, Ref, defineComponent } from 'vue'
import SideBar from '../components/SideBar.vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from "vue-router"
declare const firebase: any;

export default defineComponent({
    name: 'Home',
    components: {
      SideBar
    },
    setup() {
        const articles:any = reactive([]);
        onMounted( async () => {
            try{

            // let data = await axios.get('https://us-central1-expressapi-8c039.cloudfunctions.net/app/article');
            const db = firebase.database();
            const msgRef = db.ref("articles");
            
            msgRef.on('value', (snapshot:any) =>{ // 帶出所有的資料
              Object.values(snapshot.val()).forEach( (data: any) => {
                data.date = dayjs(data.date).format("YYYY/MM/DD");
                articles.push(data)
              })
            })
            // data.data.data.forEach( (data: any) => {
            //   data.date = dayjs(data.date).format("YYYY/MM/DD");
            //   articles.push(data);
            // });
            
            } catch(error){
                console.log(error);
            }
        });

        const subContent = (content:String) => {
            return content.substring(0,150)
        };

        const router = useRouter();

        const routerToArticle = (id:string)=>{
          return router.push({name:'Article',params:{id:id}})
        }
        return {articles, routerToArticle, subContent};
    }
})
</script>

<style lang="scss" scoped>
  .article{
    @include _bg;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 200px;
}
</style>