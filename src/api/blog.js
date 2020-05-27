//引入向后端发送请求的包
import request from '@/utils/request'
//请求后端的基础地址
const baseURL = 'http://localhost:3000'

//查询博客列表
export function fetchList (params){
    return request({
        params,
        url:`${baseURL}/blog/list`,//后端的`${域名}/路由/方法`
        method: 'get' //此处的请求方式get"or'post'根据后端controller下方法路由设置而定  router.get<====>'get'  router.post<====>'post'
    })
} 

//删除博客
export function del (params){
    return request({
        url:`${baseURL}/blog/del`,
        data:{
            ...params
        },
        method:'post'
    })
}