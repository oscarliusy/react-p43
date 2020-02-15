import actionTypes from './actionTypes'

export const markNotificationAsReadById = (id) =>{
    //测试是否执行
    //console.log(id)
    return dispatch => {
        setTimeout(()=>{
            //这里模拟一个服务端的请求
            dispatch({
                type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
                payload:{
                    id
                }
            })
        },2000)
    }
}

export const markAllNotificationsAsRead = () =>{
    return dispatch => {
        setTimeout(()=>{
            //这里模拟一个服务端的请求
            dispatch({
                type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ
            })
        },2000)
    }
}
