<!--公共配置管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <!-- <Button type='primary'  @click='add'>增加公共配置</Button> -->
    </div>
		 <!--新增 -->
     <Modal v-model="addConfigModel"
           title="新增公共配置管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addConfig" :model="addConfig" :label-width="100" label-position="right"  :rules="addConfigRules">
        <FormItem prop="customerServicePhone" label="客服电话:">
          <Input type="text" v-model="addConfig.customerServicePhone" placeholder="客服电话">
          </Input>
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
     <Modal v-model="updateConfigModel"
           title="修改公共配置管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateConfig" :model="updateConfig" :label-width="100" label-position="right"  :rules="updateConfigRules">
        <FormItem prop="customerServicePhone" label="客服电话:">
          <Input type="text" v-model="updateConfig.customerServicePhone" placeholder="客服电话">
          </Input>
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
      <Table border :columns='configColumns' :data='configList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Config',
  data () {
    return {
      maxFile:"100",
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
			//增加参数
			addConfigModel:false,
			addLoading:false,
			addConfigRules: {
                customerServicePhone: [
                    {required: true, message: '客服电话为必填项', trigger: 'blur'}
                    ]
                },
			addConfig:{
			},
			//修改参数
			updateConfigModel:false,
			updateLoading:false,
			updateConfigRules: {
                customerServicePhone: [
                    {required: true, message: '客服电话为必填项', trigger: 'blur'}
                    ]
                },
			updateConfig:{ },
      //删除参数
      deleteConfig:{},
	    configList: [],
	    configColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '公共配置id',
          key: 'configId',
          align:'center'
        },
        {
        	title:'客服电话',
        	key:'customerServicePhone',
             align:'center'
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
              varhh1
              //,varhh2
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
   getList () {
     /**
     * 获取列表
     * $this  vue组件
     * p.countUrl 数量url
     * p.listUrl 列表url
     * p.list 返回列表
     */
     this.axiosbusiness.getList(this,{
       countUrl:'/config/count',
       listUrl:'/config/list',
       list:'configList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addConfigModel = true
      this.addConfig.name = params.name
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addConfigModel = false
        this.$refs.addConfig.resetFields()
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
      ref:'addConfig',
      url:'/config/add',
      requestObject:'addConfig',
      loading:'addLoading',
      showModel:'addConfigModel'
    })
    },
	 update (params) {
      this.updateConfigModel = true
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/config/'+params.configId,
         list:'updateConfig'
         })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateConfigModel = false
        this.$refs.updateConfig.resetFields()
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
      ref:'updateConfig',
      url:'/config/update',
      requestObject:'updateConfig',
      loading:'updateLoading',
      showModel:'updateConfigModel'
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
    this.deleteConfig={
      "configId":params.configId
    };
    this.axiosbusiness.delete(this,{
      url:'/config/delete',
      requestObject:'deleteConfig'
    })
    }
  },
  created () {
   // this.$router.options.routes[2]=[];
    //console.log(this.$router.options.routes[2].children)
    this.getList();
  },
  mounted () {

  }
}
</script>
