import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import UserLogin from "../pages/UserLogin.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    {path: '/user', component: User },
    {path: '/search', component: Search },
    {path: '/user/edit',component: UserEdit},
    {path:'/user/list',component: SearchResult},
    {path:'/user/login',component: UserLogin},
]


export default routes