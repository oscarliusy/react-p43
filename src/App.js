import React, { Component } from 'react'
import { adminRoutes } from './routes'
import { Route,Switch,Redirect } from 'react-router-dom'
import { Frame } from '../src/components'
import {connect} from 'react-redux'
const menus = adminRoutes.filter(route=>route.isNav === true)

const mapState = state =>({
    isLogin:state.user.isLogin,
    role:state.user.role
})

@connect(mapState)
class App extends Component {
    render() {
        return (
            this.props.isLogin
            ?
            <Frame menus = {menus}>
                <Switch>
                {
                    adminRoutes.map(route=>{
                        //这里没有使用component= route.component,而是使用render方法
                        return (
                            <Route 
                                key={route.pathname} 
                                path={route.pathname} 
                                exact = {route.exact}
                                render={(routerProps)=>{
                                    const hasPermission = route.roles.includes(this.props.role)
                                    return hasPermission ? < route.component {...routerProps}/> : <Redirect to="/admin/noauth" />                       
                                }}
                            />
                        )
                    })
                }
                {/* 如果输入/admin，默认跳转adminRouter第一项，dashboard 
                *未知路径重定向404
                */}
                <Redirect to={adminRoutes[0].pathname} from='/admin' exact />
                <Redirect to='/404/' />
            </Switch>
            </Frame>
            :
            <Redirect to="/login" />
        )
    }
}

export default App