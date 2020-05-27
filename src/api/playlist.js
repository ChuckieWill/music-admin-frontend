import request from '@/utils/request'
//请求后端的基础地址
const baseURL = 'http://localhost:3000'

//查询歌单列表
export function fetchList (params){
    return request({
        params, //页面调用时传入的参数  在此处再传给后端
        url:`${baseURL}/playlist/list`,//后端的`${域名}/路由/方法`
        method: 'get' //此处的请求方式get"or'post'根据后端controller下方法路由设置而定  router.get<====>'get'  router.post<====>'post'
    })
}

//查询歌单列表某个歌单的详情
export function fetchById (params){
    return request({
        params, //页面调用时传入的参数  在此处再传给后端
        url:`${baseURL}/playlist/getById`,//后端的`${域名}/路由/方法`
        method: 'get' //此处的请求方式get"or'post'根据后端controller下方法路由设置而定  router.get<====>'get'  router.post<====>'post'
    })
}

//向数据库更新歌单列表某个歌单的信息
export function update (params){
    return request({
        data:{
            ...params
        }, //页面调用时传入的参数  在此处再传给后端
        url:`${baseURL}/playlist/updatePlaylist`,//后端的`${域名}/路由/方法`
        method: 'post' //此处的请求方式get"or'post'根据后端controller下方法路由设置而定  router.get<====>'get'  router.post<====>'post'
    })
}

//删除歌单
export function del (params){
    return request({
        params, //页面调用时传入的参数  在此处再传给后端
        url:`${baseURL}/playlist/del`,//后端的`${域名}/路由/方法`
        method: 'get' //此处的请求方式get"or'post'根据后端controller下方法路由设置而定  router.get<====>'get'  router.post<====>'post'
    })
}

