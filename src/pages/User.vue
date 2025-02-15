<script setup lang="ts">

import {useRouter} from 'vue-router';
import {onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import qs from "qs";
import {showFailToast, showSuccessToast} from "vant";
import {ref} from "vue";
import {getCurrentUser} from "../services/user.ts";



const router = useRouter();

// const user = {
//   id: 1,
//   username: '鱼皮',
//   userAccount: 'dogYupi',
//   avatarUrl: 'data:image/jpeg;base64,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',
//   gender: '男',
//   phone: '12131133313',
//   email: '23432444@qq.com',
//   createTime: new Date(),
// };

const user = ref();

onMounted( async () => {
  const res = await getCurrentUser();

  if (res) {
    user.value = res;
    showSuccessToast('获取用户信息成功');
  }else{
    showFailToast('获取用户信息失败');
  }
})



const toEdit = (editKey: string, editName:string,currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

const genderMap = {
  0: '未知',
  1: '男',
  2: '女'
}




</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to='/user/edit' :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号" is-link to='/user/edit' :value="user.userAccount" @click="toEdit('userAccount','账号',user.userAccount)"/>
    <van-cell title="头像" is-link to='/user/edit'>
      <img style="height: 48px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="性别"  :value="genderMap[user.gender]" />
    <van-cell title="电话" is-link to='/user/edit' :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to='/user/edit' :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="注册时间" :value="user.createTime"/>

  </template>





</template>

<style scoped>

</style>