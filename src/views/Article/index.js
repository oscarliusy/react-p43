import React, { Component } from 'react'
import { Button,Card,Table,Tag } from 'antd'
import moment from 'moment'

import { getArticles } from '../../requests'

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
      total:0
    }
  }

  createColumns = (columnsKeys) =>{
    return columnsKeys.map(item=>{
      
      if(item === 'amount'){
        return  {
          title:titleDisplayMap[item],
          key:item,
          render:  (text,record) => {
            return <Tag color={record.amount>200 ? "red" : "green"}>{record.amount}</Tag>
          }
        }
      }

      if(item === 'createAt'){
        return  {
          title:titleDisplayMap[item],
          key:item,
          render:  (text,record) => {
            const {createAt} = record
            return moment(createAt).format('YYYY年MM月DD日 hh时mm分ss秒')
          }
        }
      }

      return {
        title:titleDisplayMap[item],
        dataIndex:item,
        key:item
      }
    })
  }

  getData = () =>{
    getArticles()
    .then(resp=>{
        const columnsKeys = Object.keys(resp.list[0])
        const columns = this.createColumns(columnsKeys)
        this.setState({
          columns:columns,
          dataSource:resp.list,
          total:resp.total
        })
        
    })
  }
  componentDidMount(){
    this.getData()
  }
  render() {
      return (
          <Card 
              title="文章列表" 
              bordered={false}
              extra={<Button>导出excel</Button>} 
          >
              <Table 
                  rowKey={record=>record.id}
                  dataSource={this.state.dataSource} 
                  columns={this.state.columns} 
                  pagination={{
                      defaultCurrent:1,
                      total:this.state.total,
                      pageSize:100
                  }}
              />;
          </Card>
      )
  }
}
