<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {showFailToast, showSuccessToast} from "vant/lib/vant.es";
import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;

const userList = ref([]); //用户列表
const loading = ref(true);


/**
 * 加载数据
 */
const loadData = async () => {
  let userListData: any[]
  loading.value = true;
  // 心动模式,根据标签匹配用户
  if (isMatchMode.value){
    const num = 10;
     userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          // console.log('/user/match succeed', response);
          showSuccessToast('请求成功');
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/match error', error);
          showFailToast('请求失败')
        });
  }else{
    // 普通模式,直接分页查询用户
    // 为给定 ID 的 user 创建请求
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          // console.log('/user/recommend succeed', response);
          showSuccessToast('请求成功');
          return response?.data?.records;
        })
        .catch(function (error) {
          console.log('/user/recommend error', error);
          showFailToast('请求失败')
        });
  }
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;

}


// onMounted(async () => {
//   // 为给定 ID 的 user 创建请求
//   const userListData = await myAxios.get('/user/recommend', {
//     params: {
//       pageSize: 8,
//       pageNum: 1,
//     },
//   })
//       .then(function (response) {
//         console.log('/user/recommend succeed', response);
//         showSuccessToast('请求成功');
//         return response?.data?.records;
//       })
//       .catch(function (error) {
//         console.log('/user/recommend error', error);
//         showFailToast('请求失败')
//       });
//   if (userListData) {
//     userListData.forEach(user => {
//       if (user.tags) {
//         user.tags = JSON.parse(user.tags);
//       }
//     })
//     userList.value = userListData;
//   }
// })


/**
 * 匹配用户
 */
const doMatch = async ()=>{
  mode.value = "match"
  const num = 10;
  const userListData = await myAxios.get('/user/match', {
    params: {
      num,
    },
  })
      .then(function (response) {
        console.log('/user/match succeed', response);
        showSuccessToast('请求成功');
        return response?.data;
      })
      .catch(function (error) {
        console.log('/user/match error', error);
        showFailToast('请求失败')
      });
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }

}



const isMatchMode = ref<boolean>(false);

watchEffect(()=>{
  loadData()
})


</script>


<template>

  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>


  <UserCardList :userList="userList" :loading="loading"></UserCardList>

  <van-empty v-if="!userList || userList.length < 1" image="search" description="数据为空"/>
</template>



<style scoped>

</style>