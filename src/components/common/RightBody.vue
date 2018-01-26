<!-- 右侧主体 -->
<template>
  <Layout class="rightbody-wrap">
            <!-- <Header class="rightbody-header" >
            </Header> -->
            <content class="rightbody-content">
                <Breadcrumb class="rightbody-content-crumb">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Card class="rightbody-content-body" >
                    <div style="height: 150px">main</div>
                </Card>
            </content>
        </Layout>
</template>
<script>
      export default {
    name: 'RightBody',
    data () {
      return {
       
      }
    },
    methods: {
     
    }
  }
</script>
<style lang="less">
@import "RightBody.less";
</style>