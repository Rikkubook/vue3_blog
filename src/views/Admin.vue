<template>
    <div>
        <div class="mb-3 mt-5">
          <ul class="list-group list-group-horizontal justify-content-center">
            <li class="list-group-item">
              <router-link to="/admin">List</router-link>
            </li>
            <li class="list-group-item">
              <router-link to="/admin/add">Add</router-link>
            </li>
          </ul>
        </div>
        <router-view />
    </div>
</template>

<style lang="scss">
.list-group-item{
  padding: 0;
  a{
    padding: 10px 20px;
    min-width: 100px;
    text-align: center;
    display: block;
    text-decoration: none;
    background-color: #e3ded8;
    color: #212529;
    &.router-link-exact-active{
      background-color: #556085;
      color: #fff;
    }
  }
  &:first-child{
    border-radius: 10px 0 0 10px !important;
    overflow: hidden;
  }
  &:last-child{
    border-radius: 0 10px 10px 0 !important;
    overflow: hidden;
  }
}
</style>