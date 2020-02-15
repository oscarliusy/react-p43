import {

    Dashboard,

    Login,

    NotFound,

    Settings,

    ArticleList,

    ArticleEdit,

    Notifications
} from '../views'

//不需要登录就能访问的页面
export const mainRoutes = [{
    pathname:'/login',
    component:Login
},{
    pathname:'/404',
    component:NotFound
}]

//需要登录才能访问的页面
export const adminRoutes = [{
    pathname:'/admin/dashboard',
    component:Dashboard,
    title:'仪表盘',
    isNav:true,
    icon:'dashboard'
},{
    pathname:'/admin/article',
    component:ArticleList,
    exact:true,
    title:'文章管理',
    isNav:true,
    icon:'container'
},{
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    isNav:true,
    icon:'setting'
},{
    pathname:'/admin/article/edit/:id',
    component:ArticleEdit
},{
    pathname:'/admin/notifications',
    component:Notifications
}]

