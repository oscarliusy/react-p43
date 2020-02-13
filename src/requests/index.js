import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/244229' : ''
})

// const service = axios.create({
//     baseURL: 'http://rap2api.taobao.org/app/mock/244229'
// })

service.interceptors.request.user((config)=>{
    config.data = Object.assign({},config.data,{
        //authToken:window.localStorage.getItem('authToken')
        authToken:'itisatoken'
    })
    return config
})

service.interceptors.response.use((resp)=>{
    if (resp.data.code === 200 ){
        return resp.data.data
    }else{
        //全局处理错误
    }
})

export const getArticles = () =>{
    return service.post('/api/v1/articleList')
}