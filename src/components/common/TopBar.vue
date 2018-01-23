<template>
<div>
     <Affix >
        <div class="topBar">
            <div class="topBarLeft">
                <img src=""/>
                <span></span>
            </div>
            <div class="topBarRight" :v-if="isLogin">
                <Button type="error" class="topBarRightLoginOut" @click="loginOut">退出</Button>
            </div>
        </div>
    </Affix>
</div>
</template>
<script>
  export default {
    name: 'TopBar',
    data () {
      return {
        isLogin:false,
        theme1: 'light'
      }
    },
    methods: {
     loginOut(){
         
     }
    }
  }
</script>
<style lang="less">
@import "./../common/TopBar.less";
</style>
