/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config/settings'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
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
]

export const asyncRoutes = [
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
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/model',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Model',
    meta: {
      title: '数据端',
      icon: 'shopping-cart',
      permissions: ['admin'],
    },
    children: [
      {
        path: 'datasetList',
        name: 'Dataset List',
        component: () => import('@/views/project/dataEnd/datasetList/index'),
        meta: {
          title: '数据管理',
        },
      },
      {
        path: 'labeling',
        name: 'Dataset Labeling',
        component: () => import('@/views/project/dataEnd/labeling/index'),
        meta: {
          title: '数据标注',
        },
      },
    ],
  },
  {
    path: '/data',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Data',
    meta: {
      title: '模型端',
      icon: 'users-cog',
      permissions: ['admin'],
    },
    children: [
      {
        path: 'modelList',
        name: 'Model List',
        component: () =>
          import('@/views/project/modelEnd/modelManagement/index'),
        meta: {
          title: '模型管理',
        },
      },
      {
        path: 'modelResults',
        name: ' Model Results',
        component: () => import('@/views/project/modelEnd/modelResults/index'),
        meta: {
          title: '模型结果',
        },
      },
      {
        path: 'modelTraining',
        name: ' Model Training',
        component: () => import('@/views/project/modelEnd/modelTraining/index'),
        meta: {
          title: '模型训练',
        },
      },
    ],
  },
  {
    path: '/presentation',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Presentation',
    meta: {
      title: '展示端',
      icon: 'box-open',
      permissions: ['admin'],
    },
    children: [
      {
        path: 'batchTest',
        name: 'Batch Test',
        component: () =>
          import('@/views/project/presentationEnd/batchTest/index'),
        meta: {
          title: '批量测试',
        },
      },
      {
        path: 'sampleTest',
        name: 'Sample Test',
        component: () =>
          import('@/views/project/presentationEnd/sampleTest/index'),
        meta: {
          title: '案例分析',
        },
      },
      {
        path: 'liveTest',
        name: ' Live Test',
        component: () =>
          import('@/views/project/presentationEnd/liveTest/index'),
        meta: {
          title: '实时展示',
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
      title: '系统文档',
      icon: 'box-open',
      permissions: ['admin'],
    },
    children: [
      {
        path: 'docs',
        name: 'System Docs',
        component: () => import('@/views/project/Wiki/docs/index'),
        meta: {
          title: '模型文档',
        },
      },
      {
        path: 'more',
        name: 'More Info',
        component: () => import('@/views/project/Wiki/more/index'),
        meta: {
          title: '更多信息',
        },
      },
      {
        path: 'icon', //TODO: Delete this in release verison.
        component: EmptyLayout,
        redirect: 'noRedirect',
        name: 'Icon',
        meta: {
          title: '图标',
          permissions: ['admin'],
        },
        children: [
          {
            path: 'awesomeIcon',
            name: 'AwesomeIcon',
            component: () => import('@/views/project/Wiki/icon/index'),
            meta: { title: '常规图标' },
          },
          {
            path: 'remixIcon',
            name: 'RemixIcon',
            component: () => import('@/views/project/Wiki/icon/remixIcon'),
            meta: { title: '小清新图标' },
          },
          {
            path: 'colorfulIcon',
            name: 'ColorfulIcon',
            component: () => import('@/views/project/Wiki/icon/colorfulIcon'),
            meta: { title: '多彩图标' },
          },
        ],
      },
    ],
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

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
