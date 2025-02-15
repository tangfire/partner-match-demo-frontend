<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../services/user.ts";
import {showFailToast, showSuccessToast} from "vant";
import type {UserType} from "../models/user";
import {useCurrentUserStore} from "../stores/userStore.ts";





const route = useRoute()
const router = useRouter()
const currentUserStore = useCurrentUserStore()
// console.log(route.query)

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})




const onSubmit = async () => {

  const currentUser = await getCurrentUser()

  if(!currentUser){
    showFailToast('用户未登录')
    return
  }


  const res = await myAxios.post("/user/update", {
    "id": currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue // 动态取值
  })
  console.log("修改用户信息", res);
  if (res.code === 0 && res.data > 0) {
    showSuccessToast('修改成功')
    currentUserStore.clearCurrentUser()
    router.back()
  }else {
    showFailToast('修改失败');
  }
};




</script>

<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>


</template>

<style scoped>

</style>