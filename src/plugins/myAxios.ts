import axios from "axios";


const isDev = process.env.NODE_ENV === 'development';

// 创建实例时配置默认值
const myAxios = axios.create({
    baseURL: isDev? 'http://localhost:8080/api':'线上接口'
});


myAxios.defaults.withCredentials = true;

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // console.log('我要发请求啦',config);


    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // console.log("我收到你的请求了",response);

    // 未登录跳转到登录页
    if(response?.data?.code === 40100) {
        // window.location.href = '/#/user/login';
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;

    }


    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;

