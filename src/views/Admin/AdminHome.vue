<template>
    <secction class="d-block  container">
        <table class="table">
            <thead>
                <tr>
                    <th width="5%">編號</th>
                    <th width="25%">文章標題</th>
                    <th width="45%">文章內容</th>
                    <th width="15%">上傳日期</th>
                    <th width="10%">修改</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(articleItem,index) in articles.data" :key="articleItem.id">
                    <th scope="row">{{ index + 1 }}</th>
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
    </secction>
</template>


<script lang="ts">
// import{ mapState, mapActions} from 'vuex'
import { onMounted, computed,  reactive, defineComponent } from 'vue'
import { useRouter } from "vue-router"

import axios from 'axios'
import dayjs from 'dayjs'

declare const firebase: any;

interface ArticlesItem {
    content: string
}

// https://stackoverflow.com/questions/34859406/typescript-push-not-available-on-interface-array

export default defineComponent({
    setup() {
        const fields = reactive([
            {key: 'title', label: '文章標題'},
            {key: 'date', label: '上傳日期'},
            {key: 'content', label: '文章內容'},
            {key: 'id', label: '修改'}
        ]);
        const articles:any = reactive({data:[]}); // 定義
        const router = useRouter();

        onMounted( async () => {
            try{
                // const user = firebase.auth().currentUser;
                // console.log(user.email)
                const db = firebase.database();
                const msgRef = db.ref("messages");
                // msgRef.on('value', (snapshot) =>{ // 帶出所有的資料
                //   Object.values(snapshot.val()).forEach((item)=>{
                //     console.log(item);
                //     articles.push(item)
                //   })
                //   console.log(snapshot.val());
                // })
                msgRef.on('value', (snapshot:any) =>{ // 帶出所有的資料
                  articles.data = Object.values(snapshot.val())
                })
                // let Articles = await axios.get('https://us-central1-expressapi-8c039.cloudfunctions.net/app/article');
                // Articles.data.data.forEach( (data:ArticlesItem) => {
                //     // console.log(data.content.substring(0,150))
                //     return articles.push(data);
                // });
            } catch(error){
                console.log(error);
            }
        });


        const  editArticle =  (id:string) => {
            router.push({name: 'Admin-Edit',params:{id:id}})
        }
        const  delArticle = (id:string) => {
          console.log(id)
            const ensure = confirm("請問是否要刪除這篇文章")
            if(ensure){
                console.log(id)
                const db = firebase.database();
                const msgRef =  db.ref(`messages/${id}`)
                msgRef.remove()
                // articles.splice(0, articles.length); //不會取代掉
            }
        }
        // filter
        const subContent = computed(() =>{  //TODO: 可以整合進API? 輸出時或是在拷貝一個來整理？
            let contents = articles.data.map((item:ArticlesItem) => {  return item.content?.substring(0,80)+'...'})
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