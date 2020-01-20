import {

    Dashboard,

    Login,

    NotFound,

    Settings,

    ArticleList,

    ArticleEdit
} from '../views'

//不需要登录就能访问的页面
export const mainRouter = [{
    pathname:'/login',
    component:Login
},{
    pathname:'/404',
    component:NotFound
}]

//需要登录才能访问的页面
export const adminRouter = [{
    pathname:'/admin/dashboard',
    component:Dashboard
},{
    pathname:'/admin/settings',
    component:Settings
},{
    pathname:'/admin/article',
    component:ArticleList,
    exact:true
},{
    pathname:'/admin/article/edit/:id',
    component:ArticleEdit
}]

