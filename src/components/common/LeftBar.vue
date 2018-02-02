<!-- 左侧导航-->
<template>
   <Sider class="leftbar-wrap">
            <Menu :active-name="menuActiveName"  @on-select="menuSelect" theme="dark" width="auto">
                <Submenu name="article">
                    <template slot="title">
                        <Icon type="ios-paper-outline"></Icon>
                        文章管理
                    </template>
                    <MenuItem name="/main/articleCate">文章类型</MenuItem>
                    <MenuItem name="/main/article">文章</MenuItem>
                </Submenu>
                <Submenu name="video">
                    <template slot="title">
                        <Icon type="social-youtube-outline"></Icon>
                        视频管理
                    </template>
                    <MenuItem name="/main/videoSetSearch">视频集搜索</MenuItem>
                    <MenuItem name="/main/videoSetCate">视频集类型</MenuItem>
                    <MenuItem name="/main/videoSet">视频集</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                    </template>
                    <MenuItem name="3-1">Option 1</MenuItem>
                    <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
                
            </Menu>
        </Sider>
</template>
<script>
      export default {
    name: 'LeftBar',
    data () {
      return {
          //活动的菜单，即显示菜单
          menuActiveName:'/main/articeCate'
       
      }
    },
    methods: {
     menuSelect(name){
         this.$router.push(name);
     }
    },
    created(){
    //监听点击返回
    this.Hub.$on('routerChange', (msg) => { //Hub接收事件
        //this.msg = 'hehe';
        console.log(msg)
        this.menuActiveName=msg;
    });
    }
  }
</script>
<style lang="less">
@import "LeftBar.less";
</style>
