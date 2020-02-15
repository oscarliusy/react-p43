import React, { Component } from 'react'
import { Layout, Menu, Icon,Dropdown,Avatar,Badge } from 'antd'
import { withRouter } from 'react-router-dom'
import logo  from './logo.png'
import './Frame.less'
import { connect} from 'react-redux'
const { Header, Content, Sider } = Layout

const mapState = state =>{
  return {
    notificationsCount: state.notifications.list.filter(item=>item.hasRead === false).length
  }
}

@connect(mapState)
@withRouter
class Frame extends Component {
  onMenuClick=({key})=>{
      this.props.history.push({
          pathname:key
      })
  }

  onDropdownMenuClick=({key})=>{
    this.props.history.push({
        pathname:key
    })
  }

  renderDropdown=()=> (
    <Menu onClick={this.onDropdownMenuClick}>
      <Menu.Item
        key="/admin/notifications"
      >
        <Badge dot={Boolean(this.props.notificationsCount)}>
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Item
        key="/admin/settings"
        >
        个人设置
      </Menu.Item>
      <Menu.Item
        key="/login"
      >
        退出登录
      </Menu.Item>
    </Menu>
  );
  render() {
    
    //在文章列表和文章编辑时，都高亮文章管理标签
    const selectedKeysArr = this.props.location.pathname.split('/')
    selectedKeysArr.length = 3
    return (
        <Layout style={{minHeight:'100%'}}>
        <Header className="header spl-header">
          <div className="spl-logo" >
            <img src={logo} alt="SPLADMIN"/>
          </div>              
          <div>
            <Dropdown overlay={this.renderDropdown()} trigger={['click','hover']}>
              <div style={{display:'flex',alignItems:'center'}}> 
                <Avatar style={{ backgroundColor: '#87d068', size:'small' }} icon="user" />
                <span>欢迎您！oscar</span> 
                <Badge count={this.props.notificationsCount} offset={[0,0]}>
                <Icon type="down" />
                </Badge> 
              </div>      
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              selectedKeys={[selectedKeysArr.join('/')]}
              onClick = {this.onMenuClick}
              style={{ height: '100%', borderRight: 0 }}
            >
            {
                this.props.menus.map(item=>{
                    return (
                        <Menu.Item key={item.pathname} >
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Menu.Item>
                    )
                    
                })
            }
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            <Content
              style={{
                background: '#fff',
                margin: 0,
              }}
            >
              { this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default  Frame