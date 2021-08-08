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
                    <th scope="row">1</th>
                    <td>{{ articleItem.title }}</td>
                    <td>{{ subContent[index] }}</td>
                    <td>{{ articleItem.date }}</td>
                    <td>@mdo</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
// import{ mapState, mapActions} from 'vuex'
import { onMounted, computed,  reactive, defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    setup() {
        const fields = reactive([
                {key: 'title', label: '文章標題'},
                {key: 'date', label: '上傳日期'},
                {key: 'content', label: '文章內容'},
                {key: 'id', label: '修改'}
        ]);
        // 方法

        const articles = reactive([]);
        onMounted( async () => {
            try{
                let Articles = await axios.get('https://us-central1-expressapi-8c039.cloudfunctions.net/app/article');
                Articles.data.data.forEach( (data) => {
                    console.log(data.content.substring(0,150))
                    articles.push(data);
                });

            } catch(error){
                console.log(error);
            }
        });

        const  editArticle =  function(id){
            this.$router.push({name: 'Admin-Edit',params:{id:id}})
        }
        const  delArticle = function(id){
            const ensure = confirm("請問是否要刪除這篇文章")
            if(ensure){
                this.deleteArticle(id)
            }
        }
        // filter
        const subContent = computed(() =>{  //TODO: 可以整合進API? 輸出時或是在拷貝一個來整理？
            let contents = articles.map((item)=>{ return item.content.substring(0,80)+'...'})
            return contents
        });
        const toDate = computed((timstamp)=>{
            const date = new Date(timstamp)
            let Y =date.getYear();
            let M =date.getMonth();
            let D =date.getDay();
            let H =(Array(2).join("0" )+ date.getHours()).slice(-2);
            let min = (Array(2).join("0" )+ date.getMinutes()).slice(-2);
            return `${Y}/${M}/${D} ${H}:${min}`
        })
    return {fields, articles, editArticle, delArticle, subContent, toDate};
    }
})
</script>