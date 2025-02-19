<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast, Toast} from "vant";


const route = useRoute();
const {tags} = route.query;
// console.log(tags);
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const userList = ref([]);

onMounted(async () => {


// 向给定ID的用户发起请求
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, {indices: false});
    }

  }).then(function (response) {
    // 处理成功情况
    console.log("/user/search/tags succieed", response);
    showSuccessToast('请求成功')
    // console.log(response);
    return response.data;

  }).catch(function (error) {
    // 处理错误情况
    console.log("/user/search/tags error", error);
    showFailToast('请求失败')
  })

  if (userListData) {
    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
  }
  userList.value = userListData;


})


</script>

<template>


  <UserCardList :userList="userList"></UserCardList>

  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>

</template>


<style scoped>

</style>