import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import UserUpdate from "../pages/UserUpdatePage.vue";
import Search from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEditPage.vue";

import UserLogin from "../pages/UserLoginPage.vue";
import SearchResult from "../pages/SearchResultPage.vue";
import TeamAdd from "../pages/TeamAddPage.vue";
import TeamUpdate from "../pages/TeamUpdatePage.vue";
import User from "../pages/UserPage.vue";
import TeamCreate from "../pages/TeamCreatePage.vue";
import TeamJoin from "../pages/TeamJoinPage.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team',title:'队伍', component: Team },
    {path: '/user/update',title:'修改信息', component: UserUpdate },
    {path:'/user',title:'个人',component: User },
    {path: '/search',title:'找伙伴', component: Search },
    {path:'/team/update',title:'更新队伍',component: TeamUpdate },
    {path: '/user/edit',title:'编辑信息',component: UserEdit},
    {path:'/user/list',title: '用户列表',component: SearchResult},
    {path:'/user/login',title:'登录',component: UserLogin},
    {path:'/team/add',title:'创建队伍',component: TeamAdd },
    {path:'/user/team/create',title: '我创建的队伍',component: TeamCreate },
    {path:'/user/team/join',title:'我加入的队伍',component: TeamJoin },

]


export default routes