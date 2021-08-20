<template>
    <secction class="d-block container">
        <form class="login">
          <div class="mb-3">
            <label for="pageTitle" class="form-label">輸入文章標題</label>
            <input type="text" class="form-control" id="pageTitle">
          </div>
          <div class="mb-3">
            <label for="pageContent" class="form-label">文章內容</label>
            <textarea type="textarea" class="form-control" id="pageContent"  rows="10" max-rows="10"/>
          </div>
          <button type="submit" class="btn btn-outline-primary" @click="resetFormData">重設</button>
          <button type="submit" class="btn btn-primary" @click="submitFormData">送出</button>
        </form>
    </secction>
</template>

<script>
// import{ mapState, mapActions ,mapGetters } from 'vuex'

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
//     data (){
//         return{
//             mode: 'add',
//             formData:{
//                 title: "",
//                 date: "",
//                 content: ""
//             },
//             thisAccount: 'null'
//         }
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