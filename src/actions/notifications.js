import actionTypes from './actionTypes'
import { getNotifications } from '../requests'

const startNotificationPost = () =>{
    return {
        type:actionTypes.START_NOTIFICATION_POST
    }
}

const finishNotificationPost = () =>{
    return {
        type:actionTypes.FINISH_NOTIFICATION_POST
    }
}

export const markNotificationAsReadById = (id) =>{
    //测试是否执行
    //console.log(id)
    return dispatch => {
        //startMarkAsRead()是定义loading状态的同步动作，不在页面中调用，仅在异步action中用dispatch调用
        dispatch(startNotificationPost())
        setTimeout(()=>{
            //这里模拟一个服务端的请求
            dispatch({
                type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
                payload:{
                    id
                }
            })
            dispatch(finishNotificationPost())
        },2000)
    }
}

export const markAllNotificationsAsRead = () =>{
    return dispatch => {
        dispatch(startNotificationPost())
        setTimeout(()=>{
            //这里模拟一个服务端的请求
            dispatch({
                type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ
            })
            dispatch(finishNotificationPost())
        },2000)
    }
}

export const notificationPost = () =>{
    return dispatch =>{
        dispatch(startNotificationPost())
        getNotifications()
        .then(resp=>{
            //console.log(resp)
            dispatch({
                type:actionTypes.RECEIVE_NOTIFICATIONS,
                payload:{
                    resp
                }
            })
            dispatch(finishNotificationPost())
        })
    }
}
