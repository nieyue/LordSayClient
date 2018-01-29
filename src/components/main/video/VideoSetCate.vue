<!--视频集类型管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加视频集类型</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addVideoSetCateModel"
           title="新增视频集类型管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addVideoSetCate" :model="addVideoSetCate" :label-width="100" label-position="right"  :rules="addVideoSetCateRules">
        <FormItem prop="name" label="分类名称:">
          <Input type="text" v-model="addVideoSetCate.name" placeholder="分类名称">
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
     <Modal v-model="updateVideoSetCateModel"
           title="修改视频集类型管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateVideoSetCate" :model="updateVideoSetCate" :label-width="100" label-position="right"  :rules="updateVideoSetCateRules">
        <FormItem prop="name" label="分类名称:">
          <Input type="text" v-model="updateVideoSetCate.name" placeholder="分类名称">
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
      <Table border :columns='videoSetCateColumns' :data='videoSetCateList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'VideoSetCate',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
			//增加参数
			addVideoSetCateModel:false,
			addLoading:false,
			addVideoSetCateRules: {
                name: [
                    {required: true, message: '分类名称为必填项', trigger: 'blur'}
                    ]
                },
			addVideoSetCate:{
    		   "name":""
			},
			//修改参数
			updateVideoSetCateModel:false,
			updateLoading:false,
			updateVideoSetCateRules: {
                name: [
                    {required: true, message: '分类名称为必填项', trigger: 'blur'}
                    ]
                },
			updateVideoSetCate:{
    		 "videoSetCateId":1,
    		 "name":""
      },
      //删除参数
      deleteVideoSetCate:{},
	    videoSetCateList: [],
	    videoSetCateColumns: [
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
          title: '视频集类型管理id',
          key: 'videoSetCateId',
          align:'center'
        },
        {
        	title:'视频集类型名称',
        	key:'name',
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
   getList () {
     /**
     * 获取列表
     * $this  vue组件
     * p.countUrl 数量url
     * p.listUrl 列表url
     * p.list 返回列表
     */
     this.axiosbusiness.getList(this,{
       countUrl:'/videoSetCate/count',
       listUrl:'/videoSetCate/list',
       list:'videoSetCateList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addVideoSetCateModel = true
      this.addVideoSetCate.name = params.name
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addVideoSetCateModel = false
        this.$refs.addVideoSetCate.resetFields()
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
      ref:'addVideoSetCate',
      url:'/videoSetCate/add',
      requestObject:'addVideoSetCate',
      loading:'addLoading',
      showModel:'addVideoSetCateModel'
    })
    },
	 update (params) {
      this.updateVideoSetCateModel = true
      this.updateVideoSetCate.name = params.name
      this.updateVideoSetCate.videoSetCateId = params.videoSetCateId
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateVideoSetCateModel = false
        this.$refs.updateVideoSetCate.resetFields()
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
      ref:'updateVideoSetCate',
      url:'/videoSetCate/update',
      requestObject:'updateVideoSetCate',
      loading:'updateLoading',
      showModel:'updateVideoSetCateModel'
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
    this.deleteVideoSetCate={
      "videoSetCateId":params.videoSetCateId
    };
    this.axiosbusiness.delete(this,{
      url:'/videoSetCate/delete',
      requestObject:'deleteVideoSetCate'
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
