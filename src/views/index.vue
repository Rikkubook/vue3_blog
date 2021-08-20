<template>
  <div class="home container-fluid">
    <div class="row mt-3">
      <div class=" col-12 col-md-9 order-1 order-md-0">
        <article class="article backColor mb-3" v-for="(art,index) in articles" :key="index">
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

export default defineComponent({
    name: 'Home',
    components: {
      SideBar
    },
    setup() {
        const articles = reactive([]);
        onMounted( async () => {
            try{

            let data = await axios.get('https://us-central1-expressapi-8c039.cloudfunctions.net/app/article');
 
            data.data.data.forEach( (data: { content: string; }) => {
                console.log(data.content.substring(0,150))
                articles.push(data);
            });
            
            } catch(error){
                console.log(error);
            }
        });

        const subContent = (content:String) => {
            return content.substring(0,150)
        };

        const routerToArticle = (id:number)=>{
          return this.$router.push({name:'Article',params:{id:id}})
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