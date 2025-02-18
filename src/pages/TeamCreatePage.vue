<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCartList from "../components/TeamCartList.vue";
import {onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import {ref} from "vue";

var router = useRouter();

// 跳转到加入队伍页面
const doAddTeam = ()=>{
  router.push({
    path:"/team/add",
  });

}



const teamList = ref([])

const listTeams = async (val = '') => {
  const res = await myAxios.get("/team/list",{
    params:{
      searchText:val,
      pageNum: 1,
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


</script>

<template>
  <div id="teamPage">
    <van-search
        v-model="searchText"
        placeholder="搜索队伍"
        @search="onSearch"
    />


<!--    <van-button type="primary" @click="doAddTeam">创建队伍</van-button>-->
    <van-button block plain hairline type="primary" @click="doAddTeam">创建队伍</van-button>

    <team-cart-list :team-list="teamList"></team-cart-list>
    <van-empty v-if="teamList?.length < 1" image="search" description="数据为空"/>

  </div>
</template>

<style scoped>

#teamPage {

}

</style>