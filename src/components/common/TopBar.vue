<!-- 顶部 -->
<template>
    <div class="topbar">
        <div class="topbar-left">
            <img src=""/>
            <span class="topbar-left-title">老爷说</span>
        </div>
        <div class="topbar-right" v-if="islogin">
            <Button type="ghost" class="topbar-right-loginout" @click="loginout">退出</Button>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'TopBar',
    data () {
      return {
        islogin:false,
        theme1: 'light'
      }
    },
    methods: {
     loginout(){
         
     }
    }
  }
</script>
<style lang="less">
@import "TopBar.less";
</style>
