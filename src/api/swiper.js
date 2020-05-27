//引入向后端发送请求的包
import request from '@/utils/request'
//请求后端的基础地址
const baseURL = 'http://localhost:3000'

//查询轮播图列表
export function fetchList (){
    return request({
        url:`${baseURL}/swiper/list`,//后端的`${域名}/路由/方法`
        method: 'get' //此处的请求方式get"or'post'根据后端controller下方法路由设置而定  router.get<====>'get'  router.post<====>'post'
    })
} 

//删除轮播图
export function del (params){
    return request({
        params,
        url:`${baseURL}/swiper/del`,//后端的`${域名}/路由/方法`
        method: 'get' //此处的请求方式get"or'post'根据后端controller下方法路由设置而定  router.get<====>'get'  router.post<====>'post'
    })
} 