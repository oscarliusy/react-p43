import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import logo  from './logo.png'
import './Frame.less'
const { Header, Content, Sider } = Layout

@withRouter
class Frame extends Component {
    onMenuClick=({key})=>{
        this.props.history.push({
            pathname:key
        })
    }
    render() {
        //在文章列表和文章编辑时，都高亮文章管理标签
        const selectedKeysArr = this.props.location.pathname.split('/')
        selectedKeysArr.length = 3
        return (
            <Layout style={{minHeight:'100%'}}>
            <Header className="header spl-header">
              <div className="spl-logo" >
                <img src={logo} alt="SPLADMIN"/>
              </div> />
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