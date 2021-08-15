<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">編號</th>
                    <th scope="col">文章標題</th>
                    <th scope="col">文章內容</th>
                    <th scope="col">上傳日期</th>
                    <th scope="col">修改</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(articleItem,index) in articles" :key="articleItem.id">
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ articleItem.title }}</td>
                    <td>{{ subContent[index] }}</td>
                    <td>{{ dateFormatDash(articleItem.date) }}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" @click="editArticle(articleItem.id)">修改</button>
                        <button type="button" class="btn btn-secondary" @click="delArticle(articleItem.id)">刪除</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script lang="ts">
// import{ mapState, mapActions} from 'vuex'
import { onMounted, computed,  reactive, defineComponent } from 'vue'
import { useRouter } from "vue-router"

import axios from 'axios'
import dayjs from 'dayjs'

interface Articles extends Array<object>{ // 擴展原本 Array 否則 push 會沒吃到
    [index: number]: object ;
}

// interface ArticlesItem {
//     content: string
// }

// https://stackoverflow.com/questions/34859406/typescript-push-not-available-on-interface-array

export default defineComponent({
    setup() {
        const fields = reactive([
                {key: 'title', label: '文章標題'},
                {key: 'date', label: '上傳日期'},
                {key: 'content', label: '文章內容'},
                {key: 'id', label: '修改'}
        ]);
        // 方法
        const articles:Articles = reactive([]); // 定義
        onMounted( async () => {
            try{
                let Articles = await axios.get('https://us-central1-expressapi-8c039.cloudfunctions.net/app/article');
                Articles.data.data.forEach( (data:object) => {
                    // console.log(data.content.substring(0,150))
                    return articles.push(data);
                });

            } catch(error){
                console.log(error);
            }
        });

        const router = useRouter();
        const  editArticle =  function(id:number){
            router.push({name: 'Admin-Edit',params:{id:id}})
        }
        const  delArticle = function(id:Number){
            const ensure = confirm("請問是否要刪除這篇文章")
            if(ensure){
                // this.deleteArticle(id)
            }
        }
        // filter
        const subContent = computed(() =>{  //TODO: 可以整合進API? 輸出時或是在拷貝一個來整理？
            let contents = articles.map((item) => {  return item.content.substring(0,80)+'...'})
            return contents
        });
        // dayjs
        const dateFormatDash = (date:number, format = 'YYYY-MM-DD') => {
            return date ? dayjs(date).format(format): ''
        }

    return {fields, articles, editArticle, delArticle, dateFormatDash, subContent};
    }
})
</script>