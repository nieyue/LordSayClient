import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Main from '@/components/main/Main'
import ArticleCate from '@/components/main/article/ArticleCate'
import Article from '@/components/main/article/Article'
import ArticleComment from '@/components/main/article/ArticleComment'
import VideoSetCate from '@/components/main/video/VideoSetCate'
import VideoSet from '@/components/main/video/VideoSet'
import Video from '@/components/main/video/Video'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: "/index"
    },
    {
      path: '/index',
      name: '首页',
      component: Index
    },
    {
      path: '/main',
      name: '主页',
      component: Main,
      children:[
        {
          path: 'articleCate',
          name: '文章分类',
          component: ArticleCate
        },
        {
          path: 'article',
          name: '文章',
          component: Article,
        },
        {
          path: 'articleComment/:articleId',
          name: '文章评论',
          component: ArticleComment
        },
        {
          path: 'videoSetCate',
          name: '视频集类型',
          component: VideoSetCate
        },
        {
          path: 'videoSet',
          name: '视频集',
          component: VideoSet
        },
        {
          path: 'video/:videoSetId',
          name: '视频',
          component: Video
        }
      ]
    }
  ]
})
