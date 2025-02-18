<script setup lang="ts">
import {showToast} from "vant";
import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from '../config/route.ts'



const router = useRouter()


const DEFAULT_TITLE = '伙伴匹配'


const title = ref(DEFAULT_TITLE)




router.beforeEach((to, from) => {

  const toPath = to.path
  const route = routes.find((route)=>{
    return toPath == route.path
  })

  title.value = route?.title ?? DEFAULT_TITLE

})


const onClickLeft = () => {
  router.back()
}


const onClickRight = () => {
  router.push('/search')
}


// const onChange = (index:string) => showToast(`标签 ${index}`);
const onChange = ()=>{

}



</script>

<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"

  >

    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

<!--  <div id="content">-->
<!--    <template v-if="active === 'index'">-->
<!--      <Index></Index>-->
<!--    </template>-->
<!--    <template v-if="active === 'team'">-->
<!--      <Team></Team>-->
<!--    </template>-->
<!--  </div>-->

  <div id="content">
    <RouterView />
  </div>





  <van-tabbar route  @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>

#content {
  padding-bottom: 50px;
}

</style>