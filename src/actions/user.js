import actionTypes from './actionTypes'
import { loginRequest } from '../requests'

//只有同步定义actionType，异步提交同步
const startLogin = () =>{
    return {
        type:actionTypes.START_LOGIN
    }
}

const loginSuccess = (userInfo) =>{
    return {
        type:actionTypes.LOGIN_SUCCESS,
        payload:{
            userInfo
        }
    }
}

const loginFailed = () =>{
    //清除登录状态
    window.localStorage.removeItem('authToken')
    window.sessionStorage.removeItem('authToken')
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('userInfo')
    return {
        type:actionTypes.LOGIN_FAILED
    }
}

export const changeAvatar = (avatarUrl)  =>{
    return {
        type: actionTypes.CHANGE_AVATAR,
        payload:{
            avatarUrl
        }
    }
}

export const logout = ()=>{
    return dispatch =>{
        dispatch(loginFailed())
    }
}

export const login = (userInfo) =>{
    //consoleconsole.log(userInfo)
    return dispatch =>{
        dispatch(startLogin)
        loginRequest(userInfo)
            .then(resp=>{
                //console.log(resp)
                if(resp.data.code === 200){
                    const {
                        authToken,
                        ...userInfo
                    } = resp.data.data
                    //持久化存储
                    if(userInfo.remember === true){
                        window.localStorage.setItem('authToken',authToken)
                        window.localStorage.setItem('userInfo',JSON.stringify(userInfo))
                    //单次登录存储
                    }else{
                        window.sessionStorage.setItem('authToken',authToken)
                        window.localStorage.setItem('userInfo',JSON.stringify(userInfo))
                    }

                    dispatch(loginSuccess(resp.data.data))
                }else{
                    dispatch(loginFailed())
                }
            })
    }
}