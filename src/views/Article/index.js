import React, { Component } from 'react'
import { Button,Card,Table,Tag ,Modal,Typography, message,Tooltip} from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'

import { getArticles,deleteArticleById } from '../../requests'

const ButtonGroup = Button.Group

const titleDisplayMap = {
  id:'id',
  title:'标题',
  author:'作者',
  createAt:'创建时间',
  amount:'阅读量'
}

export default class ArticleList extends Component {
  constructor(){
    super()
    this.state={
      dataSource:[],
      columns:[],
      total:0,
      isLoading: false,
      offset:0,
      limited:10,
      deleteArticleModalTitle:'',
      isShowArticleModal:false,
      deleteArticleConfirmLoading:false,
      deleteArticleID:null
    }
  }

  createColumns = (columnsKeys) =>{
    const columns = columnsKeys.map(item=>{      
      if(item === 'amount'){
        return  {
          title:titleDisplayMap[item],
          key:item,
          render:  (text,record) => {
            return (
              <Tooltip title={record.amount>200 ? "超过200" : "未超过200"}>
                <Tag color={record.amount>200 ? "red" : "green"}>{record.amount}</Tag>
              </Tooltip>
              
            )
          }
        }
      }

      if(item === 'createAt'){
        return  {
          title:titleDisplayMap[item],
          key:item,
          render:  (text,record) => {
            const {createAt} = record
            return moment(createAt).format('YYYY年MM月DD日 hh:mm:ss')
          }
        }
      }

      return {
        title:titleDisplayMap[item],
        dataIndex:item,
        key:item
      }
    })

    columns.push({
      title:'操作',
      key:'action',
      render:(text,record)=>{
        return (
          <ButtonGroup>
            <Button size="small" type="primary" onClick={this.toEdit.bind(this,record)}>编辑</Button>
            <Button size="small" type="danger" onClick={this.showDelteArticleModal.bind(this,record)}>删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }

  toEdit = (record) =>{
    this.props.history.push(`/admin/article/edit/${record.id}`)
  }
  showDelteArticleModal=(record)=>{
    //使用函数的方式调用，定制化没那么强
    // Modal.confirm({
    //   title: <Typography>`确定要删除<span style={{color:"red"}}>{record.title}</span>么？`</Typography>,
    //   content: '此操作不可逆，请谨慎！',
    //   okText:'残忍删除',
    //   cancelText:'我拒绝',
    //   onOk() {
    //     deleteArticle(record.id)
    //       .then(resp=>{
    //         console.log(resp)
    //       })
    //       .catch(err=>{})
    //       .finally(()=>{
    //         console.log('delete')
    //       })
    //   },
    //   onCancel() {},
    // })
    this.setState({
      isShowArticleModal:true,
      deleteArticleModalTitle:record.title,
      deleteArticleID:record.id
    })
  }

  deleteArticle = () =>{
    this.setState({
      deleteArticleConfirmLoading:true
    })
    deleteArticleById(this.state.deleteArticleID)
    .then(resp=>{
      message.success(resp.msg)
      //这里需要沟通，刷新后是留在当前页还是回到首页
      //到第一页
      this.setState({
        offset:0
      },()=>{
        this.getData()
      })
    })
    .catch(err=>{})
    .finally(()=>{
      this.setState({
        deleteArticleConfirmLoading:false,
        isShowArticleModal:false
      })
    })
  }

  hideDeleteModal = () => {
    this.setState({
      isShowArticleModal:false,
      deleteArticleModalTitle:''
    })
  }

  getData = () =>{
    getArticles(this.state.offset,this.state.limited)
    .then(resp=>{
        const columnsKeys = Object.keys(resp.list[0])
        const columns = this.createColumns(columnsKeys)
        this.setState({
          columns:columns,
          dataSource:resp.list,
          total:resp.total    
        }) 
    })
    .catch(err =>{
      //处理错误
    })
    .finally(()=>{
      this.setState({
        isLoading: false
      })
    })
  }

  onPageChange=(page, pageSize)=>{
    this.setState({
      offset:pageSize*(page - 1),
      limited:pageSize
    },()=>{
      this.getData()
    })
  }

  onShowSizeChange=(current, size)=>{
    //变更页面size后的state设置，必须和产品核对清楚需求，是留在当前页还是回到首页
    this.setState({
      offset:0,
      limited:size
    },()=>{
      this.getData()
    })
  }

  toExcel=()=>{
    //在实际项目中，是前端向后端发送一个ajax请求，后端给出一个下载地址
    //组合数据
    const data = [Object.keys(this.state.dataSource[0])] //[['id','title','author','amount','createAt']]
    for(let i=0; i<this.state.dataSource.length;i++){
      //原方法，可用，无法解决createAt显示问题
      //data.push(Object.values(this.state.dataSource[i]))
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 hh:mm:ss')
      ])
    }
    
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,ws,"SheetJS")
    XLSX.writeFile(wb,`articles-${this.state.offset / this.state.limited + 1 }-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
  }

  componentDidMount(){
    this.setState({ isLoading: true });
    this.getData()
  }
  render() {
      return (
          <Card 
              title="文章列表" 
              bordered={false}
              extra={<Button onClick={this.toExcel}>导出excel</Button>} 
          >
              <Table 
                  rowKey={record=>record.id}
                  dataSource={this.state.dataSource} 
                  columns={this.state.columns} 
                  loading={this.state.isLoading}
                  pagination={{
                      total:this.state.total,
                      onChange : this.onPageChange,
                      hideOnSinglePage:true,
                      showQuickJumper:true,
                      showSizeChanger:true,
                      onShowSizeChange:this.onShowSizeChange,
                      current: this.state.offset / this.state.limited + 1,
                      pageSizeOptions:['10','15','20','30']
                  }}
              />
              <Modal
                title='此操作不可逆，请谨慎!!!'
                visible={this.state.isShowArticleModal}
                onCancel={this.hideDeleteModal}
                confirmLoading={this.state.deleteArticleConfirmLoading}
                onOk={this.deleteArticle}
              >
                <Typography>确定要删除<span style={{color:"red"}}>{this.state.deleteArticleModalTitle}</span>么？</Typography>
              </Modal>
          </Card>
      )
  }
}
