<!--文章分类管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='addArticleCate'>增加文章分类</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addArticleCateModel"
           title="新增文章分类管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addArticleCateList" :model="addArticleCateList" :label-width="100" label-position="right"  :rules="addArticleCateRules">
        <FormItem prop="name" label="分类名称:">
          <Input type="text" v-model="addArticleCateList.name" placeholder="分类名称">
          </Input>
        </FormItem>
      </Form>
      <div slot='footer'>
        <Button type='ghost' @click='quxiao'>取消</Button>
        <Button type='primary' :loading='loading'>
          <span v-if="!loading" @click='queding'>确定</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>
    <!--新增end -->
		 <!--修改 -->
     <Modal v-model="editArticleCateModel"
           title="修改文章分类管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="editArticleCateList" :model="editArticleCateList" :label-width="100" label-position="right"  :rules="editArticleCateRules">
        <FormItem prop="name" label="分类名称:">
          <Input type="text" v-model="editArticleCateList.name" placeholder="分类名称">
          </Input>
        </FormItem>
      </Form>
      <div slot='footer'>
        <Button type='ghost' @click='quxiao2'>取消</Button>
        <Button type='primary' :loading='loading2'>
          <span v-if="!loading2" @click='queding2'>确定</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>
    <!--修改end -->
      <Table border :columns='articleCateColumns' :data='articleCateList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='page.total' :pageSize='page.pageSize' ref='page' :show-total='true'   :page-size-opts='[10, 50, 150,200,300]' @on-change='selectPage' ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'ArticleCate',
  data () {
    return {
            page:{
                startNum:1,//初始化个数
                pageNum:1,//获取的第几个开始
                pageSize:10,//每页的个数
                total:0//总数
            },
			//增加参数
			addArticleCateModel:false,
			loading:false,
			addArticleCateRules: {
                name: [
                    {required: true, message: '分类名称为必填项', trigger: 'blur'}
                    ]
                },
			addArticleCateList:{
    		   "name":""
			},
			//修改参数
			editArticleCateModel:false,
			loading2:false,
			editArticleCateRules: {
                name: [
                    {required: true, message: '分类名称为必填项', trigger: 'blur'}
                    ]
                },
			editArticleCateList:{
    		 "articleCateId":1,
    		 "name":""
			},
	    articleCateList: [],
	    articleCateColumns: [
        {
          title: '文章分类管理id',
          key: 'articleCateId',
          align:'center'
        },
        {
        	title:'文章分类名称',
        	key:'name',
          	align:'center'
        },
        {
        	title:'修改时间',
        	key:'updateDate',
          	align:'center'
        },
				{
          title: '操作',
          key: 'action',
          align:'center',
          render: (h, params) => {
            var varhh1=  h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.editArticleCate(params.row)
                  }
                }
              }, '编辑');
            var varhh2=  h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.delArticleCate(params.row)
                  }
                }
              }, '删除');
            	var s=h("div","");
			s=h("div",[
              varhh1,
              varhh2
            ]);
            return s;
          }
        }
      ],
    }
  },
  methods: {
    selectPage (currentPage) {
        console.log(currentPage)
        console.log(this.page.pageSize)
      this.page.pageNum = (currentPage-1)*this.page.pageSize+this.page.startNum;
      this.getList()
    },
   getList () {
      this.axios({
               method:"post",
               url:'/articleCate/count',
               withCredentials: true
            }).
            then(res => {
                this.page.total=res.data;
                console.log(this.Qs)
                 this.axios({
                    method:"post",
                    url:'/articleCate/list',
                    data:this.Qs.stringify(this.page),
                    withCredentials: true
                    }).
                    then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        console.log(res.data)
                        this.articleCateList=res.data.list;
                    } else {
                        this.$Message.error(res.data.msg)
                    }
                    }).catch(res => {
                    this.$Message.error('系统异常')
                    })
            }).catch(res => {
              this.$Message.error('系统异常')
            })
    },
	 addArticleCate (params) {
      this.addArticleCateModel = true
      this.addArticleCateList.name = params.name
    },
		//增加取消
		 quxiao () {
      if (!this.loading) {
        this.addArticleCateModel = false
        this.$refs.addArticleCateList.resetFields()
      }
    },
		//增加确定
    queding () {
      this.$refs['addArticleCateList'].validate((valid) => {
          if (valid) {
          this.loading = true
         this.axios('/articleCate/add', this.addArticleCateList).then(res => {
              if (res.data.code === 200) {
              this.addArticleCateModel = false
              this.getList()
            } else {
              this.$Message.error(res.data.msg)
            }
            this.loading = false
          }).catch(res => {
            this.$Message.error(res.data.msg)
            this.loading = false
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
	 editArticleCate (params) {
      this.editArticleCateModel = true
      this.editArticleCateList.name = params.name
      this.editArticleCateList.articleCateId = params.articleCateId
    },
		//修改取消
		 quxiao2 () {
      if (!this.loading2) {
        this.editArticleCateModel = false
        this.$refs.editArticleCateList.resetFields()
      }
    },
		//修改确定
    queding2 () {
      this.$refs['editArticleCateList'].validate((valid) => {
        if (valid) {
          this.loading2 = true
          this.axios.post('/articleCate/update', this.editArticleCateList).then(res => {
            if (res.data.code === 100) {
              this.editArticleCateModel = false
              this.getList()
            }else {
              this.$Message.error(res.data.msg)
            }
            this.loading2 = false
          }).catch(res => {
            this.$Message.error(res.data.msg)
            this.loading2 = false
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    //删除
    delArticleCate(params){
      let delArticleCate={
          "articleCateId":params.articleCateId
      };
this.axios.post('/articleCate/delete', delArticleCate).then(res => {
            if (res.data.code === 200) {
        this.$Message.success(res.data.msg)
              this.getList();
            }else {
              this.$Message.error(res.data.msg)
            }
          }).catch(res => {
            this.$Message.error(res.data.msg)
          })

    }
  },
  created () {
    this.getList();
  },
  mounted () {

  }
}
</script>

<style lang="less">
  @import "ArticleCate.less";
</style>
