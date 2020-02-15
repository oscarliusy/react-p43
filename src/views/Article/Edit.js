import React, { Component,createRef } from 'react'
import { 
    Card,
    Button,
    Form, 
    DatePicker, 
    Input,
    Spin ,
    message  
} from 'antd'
import E from 'wangeditor'//使用编辑器，用到dom，需要用ref来关联。使用initEditor初始化
import './edit.less'
import { getArticleById,saveArticle } from '../../requests'
import moment from 'moment'

const formLayout = {
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
}

@Form.create()
class Edit extends Component {
    constructor(){
        super()
        this.state = {
            isSpin:false
        }
        this.editorRef = createRef()
    }
    handleSubmit=(e)=>{
        this.setState({
            isSpin:true
        })
        e.preventDefault();
        //values是form返回的数据对象
        this.props.form.validateFields((err, values) => {
            if (!err) {
              const data = Object.assign({},values,{
                  createAt:values.createAt.valueOf()
              })
              //在这里可以处理更多需要处理的逻辑
              saveArticle(this.props.match.params.id,data)
              .then(resp=>{   
                message.success(resp.msg)
                //如果需要跳转
                this.props.history.push('/admin/article')
              })
              .finally(()=>{
                this.setState({
                    isSpin:false
                })
              })
            }
            
          });
    }

    initEditor=()=>{
        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange =(html)=>{
           this.props.form.setFieldsValue({
               content:html
           })
        }
        this.editor.create()
    }

    getData = (id) =>{
        getArticleById(id)
        .then(resp=>{
            //完全解开的写法，实际问题出在createAt
            // this.props.form.setFieldsValue({
            //     title:resp.title,
            //     author:resp.author,
            //     amount:resp.amount,
            //     createAt:moment(resp.createAt),
            //     content:resp.content
            // })
            const {id,...data} = resp
            data.createAt = moment(data.createAt)
            this.props.form.setFieldsValue(data)
            //editor中的内容要单独设置
            this.editor.txt.html(data.content)
        })
    }

    componentDidMount(){
        this.initEditor()
        this.getData(this.props.match.params.id)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
           
            <Card 
              title='编辑文章'
              bordered={false}
              extra={<Button onClick={this.props.history.goBack}>取消</Button>} 
            >
                <Spin spinning={this.state.isSpin}>
                    <Form 
                        onSubmit={this.handleSubmit} 
                        {...formLayout}                    
                    >
                        <Form.Item
                            // validateStatus={this.state.titleValidateStatus}
                            // help={this.state.titleHelp}
                            label="标题"
                        >
                            {getFieldDecorator('title', {
                                    rules: [
                                        //自定义校验规则的写法
                                        //{ 
                                            // validator:(rule,value,callback)=>{
                                            //     if(value.length <4){
                                            //         this.setState({
                                            //             titleValidateStatus:'error',
                                            //             titleHelp:'标题长度应大于4个字符'
                                            //         })
                                            //     }else{
                                            //         this.setState({
                                            //             titleValidateStatus:'',
                                            //             titleHelp:''
                                            //         })
                                            //     }
                                            //     callback()
                                            //} 
                                        //}
                                        {
                                            required:true,
                                            message:'标题是必须的'
                                        }
                                    ],
                                    
                            })(
                            <Input
                                placeholder="标题"
                            />,
                            )}
                        </Form.Item>
                        <Form.Item
                            label="作者"
                        >
                            {getFieldDecorator('author', {
                                    rules: [
                                        {
                                            required:true,
                                            message:'作者是必须的'
                                        }
                                    ],
                            })(
                            <Input
                                placeholder="author"
                            />,
                            )}
                        </Form.Item>
                        <Form.Item
                            label="阅读量"
                        >
                            {getFieldDecorator('amount', {
                                    rules: [
                                        {
                                            required:true,
                                            message:'阅读量是必须的'
                                        }
                                    ],
                            })(
                            <Input
                                placeholder="0"
                            />,
                            )}
                        </Form.Item>
                        <Form.Item
                            label="创建时间"
                        >
                            {getFieldDecorator('createAt', {
                                    rules: [
                                        {
                                            required:true,
                                            message:'创建时间是必须的'
                                        }
                                    ],
                            })(
                                <DatePicker showTime placeholder="选择时间"  />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="内容"
                        >
                            {getFieldDecorator('content', {
                                    rules: [
                                        {
                                            required:true,
                                            message:'内容是必须的'
                                        }
                                    ],
                            })(
                            <div className="qf-editor" ref={this.editorRef} />
                            )}
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset:4 }}>
                            <Button type="primary" htmlType="submit">
                                保存修改
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        )
    }
}

export default Edit