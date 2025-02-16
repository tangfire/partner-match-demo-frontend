import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import Search from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEditPage.vue";

import UserLogin from "../pages/UserLoginPage.vue";
import SearchResult from "../pages/SearchResultPage.vue";
import TeamAdd from "../pages/TeamAddPage.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    {path: '/user', component: User },
    {path: '/search', component: Search },
    {path: '/user/edit',component: UserEdit},
    {path:'/user/list',component: SearchResult},
    {path:'/user/login',component: UserLogin},
    {path:'/team/add',component: TeamAdd },
]


export default routes