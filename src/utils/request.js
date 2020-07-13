import axios from 'axios'
import {errorCode} from './errorCode'
import { Loading,Message } from 'element-ui';//引入Loading服务
// 全局的 axios 默认值
axios.defaults.baseURL = '/api';
axios.defaults.timeout= 6000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


// 在异常处理中，我们可以 根据error.response.status返回的状态码进行操作，比如接口返回401作权限操作等
const err = (error) => {
    if (error.response) {
        if (error.response.status !== 200) {
            // 接口接口返回的状态码，获取对应的提示消息
            const errorMessage = errorCode(error.response);
            console.log(errorMessage);
            return
        }
    }
    return Promise.reject(error)
};
//开始加载动画
let loading;
function startLoading() {
    loading  = Loading.service({
        lock:true, //是否锁定
        text:'拼命加载中...',//加载中需要显示的文字
        background:'rgba(0,0,0,.7)',//背景颜色
    });
}
//结束加载动画
function endLoading() {
    loading.close();
}
// 请求拦截中，我们可以对请求头作处理，比如所有的请求都加一个token等
axios.interceptors.request.use(config => {
    const token = '68ee09fb8367f32401063cc9cadf3ba31594107367';
    if (token) {
        config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    startLoading();//请求时的加载动画
    return config; //加载动画的时候把config return 回去
},error => {
    return Promise.reject(error)
});
// 返回数据拦截中，我们可以对数据做一些小小的处理，比如后端所有接口返回的数据是这种类型:{data: {...}}，那我们就可以把data这一层给过滤掉
axios.interceptors.response.use((response) => {
    endLoading();//结束加载动画
    return response.data
},error => {
    //错误提醒
    endLoading()//如果错误也结束动画
    Message.error(error.response.data);
    return Promise.reject(error)
})

export default axios;
