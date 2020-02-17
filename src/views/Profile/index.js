import React, { Component } from 'react'
import { Upload,Card, Button, Icon,Spin } from 'antd'
import axios from 'axios'
import { changeAvatar } from '../../actions/user'
import {connect} from 'react-redux'

const mapState=(state)=>({
    avatarUrl: state.user.avatar
})

@connect(mapState,{ changeAvatar })
class Profile extends Component {
    state = {
        isUploading:false
    }

    handleUploadAvatar=({ file })=>{
        const data = new FormData()
        data.append('Token','8fe17a2751e28f842c1ca5b304717968c7e60a71:NL0_25owASxQHc5mLS4QyxSRReU=:eyJkZWFkbGluZSI6MTU4MTkwOTg2MiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA5ODUwIiwiYWlkIjoiMTY2NDE1MCIsImZyb20iOiJmaWxlIn0=')
        data.append('file',file)
        this.setState({
            isUploading:true
        })
        axios.post("http://up.imgapi.com/",data)
            .then(resp=>{
                //console.log(resp)
                if(resp.status === 200){
                    this.setState({
                        isUploading:false
                    })
                    this.props.changeAvatar(resp.data.linkurl)
                    
                }else{
                    //处理其他问题
                }
            })
            .catch(err=>{
                //处理错误
            })
            .finally(()=>{ 
            })
    }

    render() {
        return (
            <Card
                title="个人设置"
                bordered={false}
            >
                <Upload
                    showUploadList={false}
                    customRequest={this.handleUploadAvatar}
                >
                    <Spin
                        spinning = {this.state.isUploading}
                    >
                    <img style={{width:80,height:80}} src={this.props.avatarUrl} alt="头像"/> 
                    <Button><Icon type="upload" /> Click to Upload </Button>
                    </Spin>
                </Upload>
            </Card>
        )
    }
}

export default Profile