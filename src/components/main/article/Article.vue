<!--文章管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加文章</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addArticleModel"
           title="新增文章管理"
           :closable="false"
           :mask-closable="false"
           width="1000px"
    >
      <Form ref="addArticle" :model="addArticle" :label-width="100"  label-position="right"  :rules="addArticleRules">
        <FormItem prop="articleCateId" label="文章类型:">
          <Select v-model="addArticle.articleCateId" size="large" style="width:100px">
              <Option v-for="item in articleCateList" :value="item.articleCateId" :key="item.articleCateId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="title" label="标题:">
          <Input type="text" v-model="addArticle.title" placeholder="标题">
          </Input>
        </FormItem>
        <FormItem prop="redirectUrl" label="跳转url:">
          <Input type="text" v-model="addArticle.redirectUrl" placeholder="跳转url">
          </Input>
        </FormItem>
        <FormItem prop="status" label="状态:">
          <Select v-model="addArticle.status" size="large" style="width:100px">
              <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="content" label="内容:">
          <div id="addEditor" style="text-align:left"></div>
        </FormItem>
      </Form>
      <div slot='footer'>
        <Button type='ghost' @click='addCancel'>取消</Button>
        <Button type='primary' :loading='addLoading'>
          <span v-if="!addLoading" @click='addSure'>确定</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>
    <!--新增end -->
		 <!--修改 -->
     <Modal v-model="updateArticleModel"
           title="修改文章管理"
           :closable="false"
           :mask-closable="false"
           width="1000px"
    >
      <Form ref="updateArticle" :model="updateArticle" :label-width="100" label-position="right"  :rules="updateArticleRules">
        <FormItem prop="articleCateId" label="文章类型:">
          <Select v-model="updateArticle.articleCateId" size="large" style="width:100px">
              <Option v-for="item in articleCateList" :value="item.articleCateId" :key="item.articleCateId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="title" label="标题:">
          <Input type="text" v-model="updateArticle.title" placeholder="标题">
          </Input>
        </FormItem>
        <FormItem prop="redirectUrl" label="跳转url:">
          <Input type="text" v-model="updateArticle.redirectUrl" placeholder="跳转url">
          </Input>
        </FormItem>
        <FormItem prop="status" label="状态:">
          <Select v-model="updateArticle.status" size="large" style="width:100px">
              <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="content" label="内容:">
          <div id="updateEditor" style="text-align:left"></div>
        </FormItem>
      </Form>
      <div slot='footer'>
        <Button type='ghost' @click='updateCancel'>取消</Button>
        <Button type='primary' :loading='updateLoading'>
          <span v-if="!updateLoading" @click='updateSure'>确定</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>
    <!--修改end -->
      <Table border :columns='articleColumns' :data='articleList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'  @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Article',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
      //状态
      statusList:[
        {id:0,value:'下架'},
        {id:1,value:'上架'}
        ],
			//增加参数
			addArticleModel:false,
			addLoading:false,
			addArticleRules: {
                title: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ]
                },
			addArticle:{
    		   "title":"",
    		   "redirectUrl":"",
    		   "status":1,
    		   "content":"",
    		   "articleCateId":""
			},
			//修改参数
			updateArticleModel:false,
			updateLoading:false,
			updateArticleRules: {
                title: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ]
                },
			updateArticle:{
           "articleId":'',
    		   "title":"",
    		   "redirectUrl":"",
    		   "status":1,
    		   "content":"",
    		   "articleCateId":""
      },
      //删除参数
      deleteArticle:{},
      //列表
	    articleCateList: [],
      articleList: [],
	    articleColumns: [
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center' 
        // },
        {
          title: '序号',
          width:100,
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '文章管理id',
          key: 'articleId',
          align:'center'
        },
        {
        	title:'文章名称',
        	key:'title',
          align:'center'
        },
        {
        	title:'跳转url',
        	key:'redirectUrl',
          align:'center'
        },
        {
        	title:'评论数',
        	key:'commentNumber',
          align:'center'
        },
        {
        	title:'状态',
        	key:'status',
          align:'center',
          render: (h, params) => {
            let statusvalue="";
            this.statusList.forEach(element => {
              if(element.id==params.row.status){
                statusvalue=element.value;
              }
            });
             return  h('span',statusvalue);
          }
        },
        {
        	title:'创建时间',
          key:'createDate',
          sortable: true,
          align:'center'
        },
        {
        	title:'修改时间',
          key:'updateDate',
          sortable: true,
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
                    this.update(params.row)
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
                    this.delete(params.row)
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
    //分页点击
    selectPage (currentPage) {
      this.params.currentPage=currentPage;
      this.params.pageNum = (this.params.currentPage-1)*this.params.pageSize+this.params.startNum;
      this.getList()
    },
  //获取列表
   getArticleCateList () {
     /**
     * 获取列表
     * $this  vue组件
     * p.countUrl 数量url
     * p.listUrl 列表url
     * p.list 返回列表
     */
     this.axiosbusiness.getList(this,{
       countUrl:'/articleCate/count',
       listUrl:'/articleCate/list',
       list:'articleCateList'
     },
     {  
       pageNum:1,
       pageSize:1000})
    },
  //获取列表
   getList () {
     /**
     * 获取列表
     * $this  vue组件
     * p.countUrl 数量url
     * p.listUrl 列表url
     * p.list 返回列表
     */
     this.axiosbusiness.getList(this,{
       countUrl:'/article/count',
       listUrl:'/article/list',
       list:'articleList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addArticleModel = true
  let Editor=this.wangeditor;
  let editor=new Editor("#addEditor")
  editor.customConfig.zIndex = 100
  editor.customConfig.onchange = (html) =>{
    this.addArticle.content=html;
    }
  editor.create();
  editor.txt.html('<p>输入内容...😆</p>')
      
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addArticleModel = false
        this.$refs.addArticle.resetFields()
      }
    },
		//增加确定
    addSure () {
       /**
     * 增加
     * $this  vue组件
     * p.ref 验证
     * p.url 增加url
     * p.requestObject 请求参数对象
     * p.loading loading
     * p.showModel 界面模型显示隐藏
     */
    this.axiosbusiness.add(this,{
      ref:'addArticle',
      url:'/article/add',
      requestObject:'addArticle',
      loading:'addLoading',
      showModel:'addArticleModel'
    })
    },
	 update (params) {
      this.updateArticleModel = true
      this.updateArticle.articleId = params.articleId
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/article/'+params.articleId,
         list:'updateArticle',
         success:()=>{
           let Editor=this.wangeditor;
           let editor=new Editor("#updateEditor")
           editor.customConfig.zIndex = 100
           editor.customConfig.onchange = (html)=> {
             this.updateArticle.content=html;
             }
           editor.create();
           console.log(this.updateArticle)
           editor.txt.html(this.updateArticle.content)
         }
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateArticleModel = false
        this.$refs.updateArticle.resetFields()
      }
    },
		//修改确定
    updateSure () {
      /**
     * 修改
     * $this  vue组件
     * p.ref 验证
     * p.url 修改url
     * p.requestObject 请求参数对象
     * p.loading loading
     * p.showModel 界面模型显示隐藏
     */
    this.axiosbusiness.update(this,{
      ref:'updateArticle',
      url:'/article/update',
      requestObject:'updateArticle',
      loading:'updateLoading',
      showModel:'updateArticleModel'
    })
 
    },
    //删除
    delete(params){
    /**
     * 删除
     * $this  vue组件
     * p.url 修改url
     * p.requestObject 请求参数对象
     */
    this.deleteArticle={
      "articleId":params.ArticleId
    };
    this.axiosbusiness.delete(this,{
      url:'/article/delete',
      requestObject:'deleteArticle'
    })
    }
  },
  created () {
    this.getArticleCateList();
    this.getList();
    
  },
  mounted () {

  }
}
</script>
