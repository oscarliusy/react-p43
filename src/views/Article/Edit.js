import React, { Component } from 'react'
import { 
    Card,
    Button,
    Form, 
    Icon, 
    Input   
} from 'antd'

@Form.create()
class Edit extends Component {
    constructor(){
        super()
        this.state = {
            titleValidateStatus:'',
            titleHelp:''
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
          });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
           
            <Card 
              title='编辑文章'
              bordered={false}
              extra={<Button>取消</Button>} 
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item
                        validateStatus={this.state.titleValidateStatus}
                        help={this.state.titleHelp}
                    >
                        {getFieldDecorator('title', {
                                rules: [
                                    { 
                                        validator:(rule,value,callback)=>{
                                            if(value.length <4){
                                                this.setState({
                                                    titleValidateStatus:'error',
                                                    titleHelp:'标题长度应大于4个字符'
                                                })
                                            }else{
                                                this.setState({
                                                    titleValidateStatus:'',
                                                    titleHelp:''
                                                })
                                            }
                                            callback()
                                        } 
                                    }
                                ],
                        })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form>
            </Card>
        )
    }
}

export default Edit