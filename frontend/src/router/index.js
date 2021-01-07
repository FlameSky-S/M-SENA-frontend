/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config/settings'

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
          icon: 'home',
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
      icon: 'shopping-cart',
    },
    children: [
      {
        path: 'datasetList',
        name: 'Dataset List',
        component: () => import('@/views/project/dataEnd/datasetList/index'),
        meta: {
          title: 'Dataset Management',
        },
      },
      // {
      //   path: 'createDataset',
      //   name: 'Create Dataset',
      //   component: () => import('@/views/project/dataEnd/createDataset/index'),
      //   meta: {
      //     title: 'Create Dataset',
      //   },
      //   hidden: true,
      // },
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
      icon: 'users-cog',
    },
    children: [
      {
        path: 'modelList',
        name: 'Model List',
        component: () =>
          import('@/views/project/modelEnd/modelManagement/index'),
        meta: {
          title: 'Model Management',
        },
      },
      // {
      //   path: 'modelResults',
      //   name: ' Model Results',
      //   component: () => import('@/views/project/modelEnd/modelResults/index'),
      //   meta: {
      //     title: 'Model Results',
      //   },
      // },
      // {
      //   path: 'resultDetail',
      //   name: 'Result Details',
      //   component: () => import('@/views/project/modelEnd/resultDetails/index'),
      //   meta: {
      //     title: 'Result Details',
      //   },
      //   hidden: true,
      // },
      {
        path: 'modelTraining',
        name: ' Model Training',
        component: () => import('@/views/project/modelEnd/modelTraining/index'),
        meta: {
          title: 'Model Training',
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
      icon: 'box-open',
    },
    children: [
      {
        path: 'resultAnalysis',
        name: 'Result Analysis',
        component: () =>
          import('@/views/project/analysisEnd/resultAnalysis/index'),
        meta: {
          title: 'Result Analysis',
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
        path: 'batchTest',
        name: 'Batch Test',
        component: () => import('@/views/project/analysisEnd/batchTest/index'),
        meta: {
          title: 'Batch Test',
        },
      },
      {
        path: 'liveTest',
        name: ' Live Test',
        component: () => import('@/views/project/analysisEnd/liveTest/index'),
        meta: {
          title: 'Real Time Presentation',
        },
      },
    ],
  },
  {
    path: '/wiki',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Wiki',
    meta: {
      title: 'System Documents',
      icon: 'box-open',
    },
    children: [
      {
        path: 'docs',
        name: 'System Docs',
        component: () => import('@/views/project/Wiki/docs/index'),
        meta: {
          title: 'System Documents',
          icon: 'shopping-cart',
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
  base: publicPath,
  mode: routerMode,
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
