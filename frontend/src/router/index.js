import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
// import EmptyLayout from '@/layouts/EmptyLayout'
// import { publicPath, routerMode } from '@/config/settings'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: 'Home',
          icon: 'el-icon-s-home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/data',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Dataset',
    meta: {
      title: 'Dataset',
      icon: 'el-icon-s-data',
    },
    children: [
      {
        path: 'datasetList',
        name: 'Dataset List',
        component: () => import('@/views/project/dataEnd/datasetList/index'),
        meta: {
          title: 'Dataset Management',
          icon: 'el-icon-s-shop',
        },
      },
      {
        path: 'datasetDetail',
        name: 'Dataset Details',
        component: () => import('@/views/project/dataEnd/datasetDetails/index'),
        meta: {
          title: 'Dataset Details',
        },
        hidden: true,
      },
      {
        path: 'labeling',
        name: 'Dataset Labeling',
        component: () => import('@/views/project/dataEnd/labeling/index'),
        meta: {
          title: 'Dataset Labeling',
          icon: 'el-icon-s-flag',
        },
      },
      {
        path: 'labelingDetail',
        name: 'Labeling Process',
        component: () =>
          import('@/views/project/dataEnd/labelingProcess/index'),
        meta: {
          title: 'Dataset Labeling',
        },
        hidden: true,
      },
    ],
  },
  {
    path: '/model',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Model',
    meta: {
      title: 'Model',
      icon: 'el-icon-menu',
    },
    children: [
      {
        path: 'modelList',
        name: 'Model List',
        component: () =>
          import('@/views/project/modelEnd/modelManagement/index'),
        meta: {
          title: 'Model Management',
          icon: 'el-icon-s-management',
        },
      },
      {
        path: 'modelTraining',
        name: ' Model Training',
        component: () => import('@/views/project/modelEnd/modelTraining/index'),
        meta: {
          title: 'Model Training',
          icon: 'el-icon-s-order',
        },
      },
    ],
  },
  {
    path: '/analysis',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Analysis',
    meta: {
      title: 'Analysis',
      icon: 'el-icon-s-marketing',
    },
    children: [
      {
        path: 'resultAnalysis',
        name: 'Result Analysis',
        component: () =>
          import('@/views/project/analysisEnd/resultAnalysis/index'),
        meta: {
          title: 'Result Analysis',
          icon: 'el-icon-s-help',
        },
      },
      {
        path: 'resultDetails',
        name: 'Result Details',
        component: () =>
          import('@/views/project/analysisEnd/resultDetails/index'),
        meta: {
          title: 'Result Details',
        },
        hidden: true,
      },
      {
        path: 'batchAnalysis',
        name: 'Batch Analysis',
        component: () =>
          import('@/views/project/analysisEnd/batchAnalysis/index'),
        meta: {
          title: 'Batch Analysis',
          icon: 'el-icon-s-grid',
        },
      },
      {
        path: 'liveTest',
        name: ' Live Test',
        component: () => import('@/views/project/analysisEnd/liveTest/index'),
        meta: {
          title: 'Live Demo',
          icon: 'el-icon-video-camera-solid',
          badge: 'New',
        },
      },
    ],
  },
  {
    path: '/wiki',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Wiki',
    children: [
      {
        path: 'docs',
        name: 'System Docs',
        component: () => import('@/views/project/Wiki/index'),
        meta: {
          title: 'About Us',
          icon: 'el-icon-s-promotion',
        },
      },
    ],
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: '/',
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export default router
