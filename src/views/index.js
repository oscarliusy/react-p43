/*
*原来是全部加载
*使用react-loadable变更为按需加载，即懒加载
*使用Loading高阶组件模拟加载中的等待时间。
 */
import Loadable from 'react-loadable'
//下面是自行重写的懒加载脚本
//import Loadable from './loadable'
import { Loading } from '../components'

// import  Dashboard from './Dashboard'
// import  Login from './Login'
// import  NotFound from './NotFound'
// import  Settings from './Settings'
// import  ArticleList from './Article'
// import  ArticleEdit from './Article/Edit'

const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading,
})

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading,
})

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading,
})

const Settings = Loadable({
    loader: () => import('./Settings'),
    loading: Loading,
})

const ArticleList = Loadable({
    loader: () => import('./Article'),
    loading: Loading,
})

const ArticleEdit = Loadable({
    loader: () => import('./Article/Edit'),
    loading: Loading,
})

export {

    Dashboard,

    Login,

    NotFound,

    Settings,

    ArticleList,

    ArticleEdit
}