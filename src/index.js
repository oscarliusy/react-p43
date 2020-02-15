import React from 'react'
import {render} from 'react-dom'
import { HashRouter as Router, Route, Switch,Redirect} from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider} from 'antd'

import {Provider} from 'react-redux'

import App from './App'
import './index.less'
import store from './store'
import { mainRoutes } from './routes'

render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path="/admin" render={(routerProps)=>{
                        //TODO: 权限,需要登录才能访问admin
                        return <App {...routerProps}/>
                    }} />
                    {
                        mainRoutes.map(route =>{
                            return <Route key={route.pathname} path={route.pathname} component={route.component}/>
                        })
                    }
                    {/*
                    如果输入/，则重定向至/#/admin
                    */}
                    <Redirect to="/admin" from="/" exact />
                    {/*
                    如果输入未定义的路径，则重定向至/#/404
                    */}
                    <Redirect to="/404" />
                </Switch> 
            </Router>
        </ConfigProvider>
    </Provider>,
    document.querySelector('#root')
)