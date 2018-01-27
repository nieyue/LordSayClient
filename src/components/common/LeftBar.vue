<!-- 左侧导航-->
<template>
   <Sider class="leftbar-wrap">
            <Menu active-name="/articleCate"  @on-select="menuSelect" theme="dark" width="auto">
                <Submenu name="article">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        文章管理
                    </template>
                    <MenuItem name="/main/articleCate">文章类型管理</MenuItem>
                    <MenuItem name="/main/article">文章管理</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        Item 2
                    </template>
                    <MenuItem name="2-1">Option 1</MenuItem>
                    <MenuItem name="2-2">Option 2</MenuItem>
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
       
      }
    },
    methods: {
     menuSelect(name){
         this.$router.push(name);
     }
    }
  }
</script>
<style lang="less">
@import "LeftBar.less";
</style>
