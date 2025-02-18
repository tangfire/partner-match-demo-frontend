<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast, Toast} from "vant";
import defaultTeamPhoto from '../assets/001.jpg'
import {useCurrentUserStore} from "../stores/userStore.ts";
import {getCurrentUser} from "../services/user.ts";
import {onMounted} from "vue";
import {ref} from "vue";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {

  teamList: () => [],
});

//队伍列表加入队伍
const doJoinTeam = async (id: number) => {
  const res = await myAxios.post("/team/join", {
    teamId: id
  });
  if (res?.code === 0) {
    showSuccessToast("加入成功")
  } else {
    showFailToast("加入失败" + (res.description ? `， ${res.description} ` : ''));
  }
}


const formatTime = (timeString) => {
  return timeString ? timeString.replace('T', ' ').split('.')[0] : ''
}

const currentUser = ref()


onMounted(async () => {
  currentUser.value = await getCurrentUser();
  // console.log(currentUser.value);
})

const router = useRouter()

const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {id: id},
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    Toast.success('操作成功');
  } else {
    Toast.fail('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id
  });
  if (res?.code === 0) {
    Toast.success('操作成功');
  } else {
    Toast.fail('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}


// todo 加入有密码的房间,要指定密码

</script>


<template>

  <div
      id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :thumb="defaultTeamPhoto"
        :title="`${team.name} `"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ '最大人数:' + team.maxNum }}
        </div>
        <div>
          {{ '过期时间:' + formatTime(team.expireTime) }}
        </div>
        <div>
          {{ '创建时间:' + formatTime(team.createTime) }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="mini" plain type="primary"
                    @click="doJoinTeam(team.id)">加入队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" plain @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <!-- 仅加入队伍可见 -->
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="mini" plain type="primary"
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" plain type="danger"
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>


      </template>

    </van-card>
  </div>
</template>


<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>