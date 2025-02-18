import {createApp} from 'vue'
import {createPinia} from "pinia";
import App from './App.vue'

// 1. 引入你需要的组件
import {
    Skeleton,
    SkeletonTitle,
    SkeletonImage,
    SkeletonAvatar,
    SkeletonParagraph,
    Switch,
    RadioGroup,
    Radio,
    Stepper,
    DatePicker,
    Popup,
    showSuccessToast,
    Empty,
    showFailToast,
    Toast,
    Cell,
    Card,
    CellGroup,
    Button,
    NavBar,
    Icon,
    Tabbar,
    TabbarItem,
    Search,
    Divider,
    Tag,
    Collapse,
    CollapseItem,
    TreeSelect,
    Col,
    Row,
    Form,
    Field
} from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

const app = createApp(App);

import {createRouter, createWebHashHistory} from 'vue-router'

import routes from "./config/route.ts";


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 3. 注册你需要的组件
app.use(Button);
app.use(RadioGroup);
app.use(Radio);
app.use(Stepper);
app.use(Skeleton);
app.use(SkeletonTitle);
app.use(SkeletonImage);
app.use(SkeletonAvatar);
app.use(SkeletonParagraph);
app.use(Switch);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
app.use(Divider);
app.use(Tag)
app.use(DatePicker)
app.use(Collapse)
app.use(CollapseItem)
app.use(TreeSelect)
app.use(router);
app.use(Row)
app.use(Col)
app.use(Cell)
app.use(CellGroup)
app.use(Form)
app.use(Field)
app.use(Card)
app.use(Toast)
app.use(Popup)
app.use(showSuccessToast)
app.use(showFailToast)
app.use(Empty)

const pinia = createPinia()
app.use(pinia);


app.mount('#app')
