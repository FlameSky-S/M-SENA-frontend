import Vue from 'vue'
import VueRouter from 'vue-router'

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
        path: 'batchAnalysis',
        name: 'Batch Analysis',
        component: () =>
          import('@/views/project/analysisEnd/batchAnalysis/index'),
        meta: {
          title: 'Batch Analysis',
        },
      },
      {
        path: 'liveTest',
        name: ' Live Test',
        component: () => import('@/views/project/analysisEnd/liveTest/index'),
        meta: {
          title: 'Live Demo',
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

export default router
