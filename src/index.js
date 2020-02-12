import React from 'react'
import {render} from 'react-dom'
import { HashRouter as Router, Route, Switch,Redirect} from 'react-router-dom'

import App from './App'
import './index.less'

import { mainRouter } from './routes'

render(
    <Router>
       <Switch>
            <Route path="/admin" render={(routerProps)=>{
                //TODO: 权限,需要登录才能访问admin
                return <App {...routerProps}/>
            }} />
            {
                mainRouter.map(route =>{
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
        
    </Router>,
    document.querySelector('#root')
)