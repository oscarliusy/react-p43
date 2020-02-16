import React, { Component } from 'react'

import { Form, Icon, Input, Button,Checkbox,Card} from 'antd';
import { Redirect } from 'react-router-dom'
import './login.less'
import { login } from '../../actions/user'
import { connect } from 'react-redux'

const mapState = (state)=>({
  isLogin:state.user.isLogin,
  isLoading:state.user.isLoading
})

@connect(mapState,{login})
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin
      ?
      <Redirect to='/admin'/>
      :
      <Card
          title="ADMIN登录"
          className="login-wrapper"
      >
          <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
              {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
              })(
                  <Input
                  disabled={this.props.isLoading}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                  />,
              )}
              </Form.Item>
              <Form.Item>
                  {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码!' }],
                  })(
                      <Input
                      disabled={this.props.isLoading}
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="密码"
                      />,
                  )}
              </Form.Item>
              <Form.Item>
                  {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                  })(<Checkbox disabled={this.props.isLoading}>记住我</Checkbox>)}
                  <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
                      登录
                  </Button>
              </Form.Item>
          </Form>
    </Card>
    );
  }
}

export default Login