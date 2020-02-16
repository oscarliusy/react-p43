import actionTypes from '../actions/actionTypes'

const initState = {
    isLoading:false,
    list:[{
        id:1,
        title:'1台军黑鹰直升机失事原因公布：天气骤变飞行员来不及爬高',
        desc:'1海外网2月15日电台空军黑鹰直升机1月2日坠毁，造成8名官兵死亡。近日台空军完成初步调查，并在15日公布事故原因。据台湾“中央社”报道，台“空军司令部”今日指出，初步判断直升机失事是因山区天气骤变，直升机瞬间进云，飞行员来不及爬升至高处，触地坠毁，属于环境（天气及地形）与人为复合因素。',
        hasRead:false
    },{
        id:2,
        title:'2台军黑鹰直升机失事原因公布：天气骤变飞行员来不及爬高',
        desc:'2海外网2月15日电台空军黑鹰直升机1月2日坠毁，造成8名官兵死亡。近日台空军完成初步调查，并在15日公布事故原因。据台湾“中央社”报道，台“空军司令部”今日指出，初步判断直升机失事是因山区天气骤变，直升机瞬间进云，飞行员来不及爬升至高处，触地坠毁，属于环境（天气及地形）与人为复合因素。',
        hasRead:false
    }]
}

export default ( state=initState,action) =>{
    switch(action.type){
        case actionTypes.RECEIVE_NOTIFICATIONS:
            return {
                ...state,
                list:action.payload.resp.list
            }
        case actionTypes.START_NOTIFICATION_POST:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.FINISH_NOTIFICATION_POST:
            return {
                ...state,
                isLoading:false
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            const newList = state.list.map(item =>{
                if(item.id === action.payload.id){
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state,
                list:newList
            }
        case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
            return {
                ...state,
                list:state.list.map(item =>{
                    item.hasRead = true
                    return item
                })
            }
        default:
            return state
    }
}