import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifications,
    NoAuth,
    Profile
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
    icon:'dashboard',
    roles:['001','002','003']
},{
    pathname:'/admin/article',
    component:ArticleList,
    exact:true,
    title:'文章管理',
    isNav:true,
    icon:'container',
    roles:['001','002']
},{
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    isNav:true,
    icon:'setting',
    roles:['001']
},{
    pathname:'/admin/article/edit/:id',
    component:ArticleEdit,
    roles:['001','002']
},{
    pathname:'/admin/notifications',
    component:Notifications,
    roles:['001','002','003']
},{
    pathname:'/admin/noauth',
    component:NoAuth,
    roles:['001','002','003']
},{
    pathname:'/admin/profile',
    component:Profile,
    roles:['001','002','003']
}]

