<template>
    <div class="container">
        <article class="articlePage mt-5 mb-5">
            <h2 class="text-center mb-4">{{articles.title}}</h2>
            <i class="date mb-3">{{articles.date}}</i>
            <div v-html="articles.content"></div>
        </article>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { onMounted, reactive, ref, Ref, computed, defineComponent } from 'vue'
import { useRoute, useRouter } from "vue-router"
import dayjs from 'dayjs'
declare const firebase: any;

interface Articles extends Array<ArticlesItem>{ // 擴展原本 Array 否則 push 會沒吃到
    [index: number]: ArticlesItem ;
}

interface ArticlesItem {
    date: string,
    content: string,
    title: string,
    id: string
}

export default defineComponent({

    setup() {
        const router = useRoute();
        
        const artId = router.params.id as string;
        let articles:ArticlesItem = reactive({
            date: "",
            content: "",
            title: "",
            id: ""
        });
        onMounted( async () => {

            //先取得全部資料
            // let data = await axios.get('https://us-central1-expressapi-8c039.cloudfunctions.net/app/article');

            const db = firebase.database();
            const msgRef = db.ref("articles");
            
            msgRef.on('value', (snapshot:any) =>{ // 帶出所有的資料
                articles.date = dayjs(snapshot.val()[artId].date).format("YYYY/MM/DD");
                articles.id = snapshot.val()[artId].id;
                articles.content = snapshot.val()[artId].content;
                articles.title = snapshot.val()[artId].title;
            
            })
            // data.data.data.forEach( (dataItem: ArticlesItem) => {
            //     if(dataItem.id === artId){
                    
            //         articles.date = dataItem.date;
            //         articles.id = dataItem.id;
            //         articles.content = dataItem.content;
            //         articles.title = dataItem.title;
            //         // articles = dataItem;

            //     }
            // });
            
        })


        return {articles};
    }

})
</script>
<style lang="scss" scoped>
.articlePage{
    @include _bg
}
</style>