<script setup lang="ts">

import {useRouter} from "vue-router";

var router = useRouter();

// 跳转到加入队伍页面
const doJoinTeam = ()=>{
  router.push({
    path:"/team/add",
  });

}


</script>

<template>
<div id="teamPage">
  <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>
</div>
</template>

<style scoped>

#teamPage {

}

</style>