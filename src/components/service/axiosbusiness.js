/**
 * axios封装的业务增、删、改、查
 */
//let $this=Vue.prototype;
export default {
    /**
     * 获取列表
     * $this  vue组件
     * p.countUrl 数量url
     * p.listUrl 列表url
     * p.list 返回列表
     */
    getList($this,p) {
        //获取
        $this.axios({
            method:"post",
            url:p.countUrl,
            withCredentials: true
         }).
         then(res => {
            $this.params.total=res.data;
             $this.axios({
                 method:"post",
                 url:p.listUrl,
                 data:$this.Qs.stringify($this.params),
                 withCredentials: true
                 }).
                 then(res => {
                 console.log(res)
                 if (res.data.code == 200) {
                     console.log(res.data)
                     //变量list代替所有
                     $this[p.list]=res.data.list;
                 } else {
                    $this.$Message.error(res.data.msg)
                 }
                 }).catch(res => {
                    $this.$Message.error('系统异常')
                 })
         }).catch(res => {
            $this.$Message.error('系统异常')
         })
   },
    /**
     * 增加
     * $this  vue组件
     * p.ref 验证
     * p.addUrl 增加url
     * p.requestObject 请求参数对象
     * p.loading loading
     * p.addModel 界面模型显示隐藏
     */
    add($this,p){
        $this.$refs[p.ref].validate((valid) => {
            if (valid) {
            $this[p.loading] = true
            $this.axios({
              method:"post",
              url:p.url,
              data:$this.Qs.stringify($this[p.requestObject]),
              withCredentials: true
              }).then(res => {
                if (res.data.code === 200) {
                    $this[p.showModel] = false
                    $this.getList()
              } else {
                $this.$Message.error(res.data.msg)
              }
              $this[p.loading]  = false
            }).catch(res => {
                $this.$Message.error(res.data.msg)
                $this[p.loading]  = false
            })
          } else {
                $this.$Message.error('验证失败')
          }
        })
    },
    /**
     * 修改
     * $this  vue组件
     * p.ref 验证
     * p.url 修改url
     * p.requestObject 请求参数对象
     * p.loading loading
     * p.showModel 界面模型显示隐藏
     */
    update($this,p){
        $this.$refs[p.ref].validate((valid) => {
            if (valid) {
                $this[p.loading] = true
                $this.axios({
                    method:"post",
                    url:p.url,
                    data:$this.Qs.stringify($this[p.requestObject]),
                    withCredentials: true
                }).then(res => {
                if (res.data.code === 200) {
                    $this[p.showModel] = false
                    $this.$Message.success(res.data.msg)
                    $this.getList()
                }else {
                    $this.$Message.error(res.data.msg)
                }
                    $this[p.loading] = false
              }).catch(res => {
                    $this.$Message.error(res.data.msg)
                    $this[p.loading] = false
              })
            } else {
                    $this.$Message.error('验证失败')
            }
          })
    },
    /**
     * 删除
     * $this  vue组件
     * p.url 修改url
     * p.requestObject 请求参数对象
     */
    delete($this,p){
        $this.$Modal.confirm({
            title: '删除',
            content: "确定删除吗？",
            onOk: () => {
              $this.axios({
                      method:"post",
                      url:p.url,
                      data:$this.Qs.stringify($this[p.requestObject]),
                      withCredentials: true
                      }).then(res => {
                      if (res.data.code === 200) {
                        $this.$Message.success(res.data.msg)
                        $this.getList();
                      }else {
                        $this.$Message.error(res.data.msg)
                      }
                    }).catch(res => {
                        $this.$Message.error(res.data.msg)
                    })
                },
            onCancel: () => {
                $this.$Message.info('取消成功');
            }
        })
    }
 }