<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCartList from "../components/TeamCartList.vue";
import {onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showToast} from "vant";
import {ref} from "vue";

var router = useRouter();

const listMyJoinTeams = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join",{
    params:{
      searchText:val,
      pageNum: 1,
    }
  });

  if (res?.code === 0){
    myJoinTeamList.value = res.data;
  }else{
    showFailToast('加载队伍失败,请刷新重试')
  }
}


// 跳转到加入队伍页面
const doAddTeam = ()=>{
  router.push({
    path:"/team/add",
  });

}



const teamList = ref([])
const myJoinTeamList = ref([])


/**
 * 搜索队伍
 * @param val
 * @param status
 */
const listTeams = async (val = '',status = 0) => {
  const res = await myAxios.get("/team/list",{
    params:{
      searchText:val,
      pageNum: 1,
      status,
    }
  });

  if (res?.code === 0){
    teamList.value = res.data;
  }else{
    showFailToast('加载队伍失败,请刷新重试')
  }
}

onMounted( ()=>{
   listTeams()
})



const searchText = ref('')

const onSearch =  (val)=>{
   listTeams(val)
}


const offset = ref({ x: 310, y: 500 });


const onOffsetChange = (offset:any) => {

  if (offset.y > 500) {
    offset.y = 500
  }

  if (offset.y < 100){
    offset.y = 120
  }

  // showToast(`x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`);
};

const active = ref('public')

// 切换查询状态
const onTabChange = (name) =>{
  // 查公开
  if (name === 'public'){
    listTeams(searchText.value,0)
    // 查加密
  }else{
    listTeams(searchText.value,2)
  }
}


</script>

<template>
<div id="teamPage">
  <van-search
      v-model="searchText"
      placeholder="搜索队伍"
      @search="onSearch"
  />

<!--  <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>-->
<!--  <van-button class="add-button" type="primary" @click="doAddTeam">创建队伍</van-button>-->


  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="公开" name="public"></van-tab>
    <van-tab title="加密" name="private"></van-tab>

  </van-tabs>

  <div style="margin-bottom: 7px"></div>


  <van-floating-bubble icon="plus" axis="y" v-model:offset="offset" @offset-change="onOffsetChange" @click="doAddTeam" />


  <team-cart-list :team-list="teamList" ></team-cart-list>
  <van-empty v-if="teamList?.length < 1" image="search" description="数据为空"/>

</div>
</template>

<style scoped>

#teamPage {

}

</style>