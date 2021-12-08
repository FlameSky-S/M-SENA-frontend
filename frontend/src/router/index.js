import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import store from '@/store'
import { verifyToken } from '@/api/user'

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
        path: 'datasetManagement',
        name: 'Dataset Management',
        component: () => import('@/views/dataEnd/datasetManagement/index'),
        meta: {
          title: 'Dataset Management',
          icon: 'el-icon-s-shop',
        },
      },
      {
        path: 'datasetDetail',
        name: 'Dataset Details',
        component: () => import('@/views/dataEnd/datasetDetails/index'),
        meta: {
          title: 'Dataset Details',
        },
        hidden: true,
      },
      {
        path: 'datasetLabeling',
        name: 'Dataset Labeling',
        component: () => import('@/views/dataEnd/datasetLabeling/index'),
        meta: {
          title: 'Dataset Labeling',
          icon: 'el-icon-s-flag',
        },
      },
      {
        path: 'labelingDetail',
        name: 'Labeling Process',
        component: () => import('@/views/dataEnd/labelingProcess/index'),
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
        component: () => import('@/views/modelEnd/modelManagement/index'),
        meta: {
          title: 'Model Management',
          icon: 'el-icon-s-management',
        },
      },
      {
        path: 'modelTraining',
        name: ' Model Training',
        component: () => import('@/views/modelEnd/modelTraining/index'),
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
        path: 'results',
        name: 'Results',
        component: () => import('@/views/analysisEnd/results/index'),
        meta: {
          title: 'Results',
          icon: 'el-icon-s-help',
        },
      },
      {
        path: 'resultDetails',
        name: 'Result Details',
        component: () => import('@/views/analysisEnd/resultDetails/index'),
        meta: {
          title: 'Result Details',
        },
        hidden: true,
      },
      {
        path: 'modelComparison',
        name: 'Model Comparison',
        component: () => import('@/views/analysisEnd/modelComparison/index'),
        meta: {
          title: 'Model Comparison',
          icon: 'el-icon-s-grid',
        },
      },
      {
        path: 'liveDemo',
        name: ' Live Demo',
        component: () => import('@/views/analysisEnd/liveDemo/index'),
        meta: {
          title: 'Live Demo',
          icon: 'el-icon-video-camera-solid',
          badge: 'New',
        },
      },
    ],
  },
  {
    path: '/aboutUs',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Wiki',
    children: [
      {
        path: 'docs',
        name: 'System Docs',
        component: () => import('@/views/Wiki/index'),
        meta: {
          title: 'About Us',
          icon: 'el-icon-s-promotion',
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noRedirect',
    name: 'User',
    children: [
      {
        path: 'login',
        name: 'User Login',
        component: () => import('@/views/user/login'),
      },
      {
        path: 'userManagement',
        name: 'User Management',
        component: () => import('@/views/user/userManagement'),
      },
    ],
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

router.beforeEach(async (to, from, next) => {
  // verify user login status
  let token = window.sessionStorage.getItem('token')
  if (token) {
    var { msg, user_name, is_admin } = await verifyToken({ token: token })
    store.dispatch('auth/setUser', user_name)
    store.dispatch('auth/setAdmin', is_admin)
    if (msg != 'success') {
      window.sessionStorage.removeItem('token')
    }
  } else {
    var msg = 'fail'
    store.dispatch('auth/setUser', null)
    store.dispatch('auth/setAdmin', false)
  }
  // console.log(store.state.auth.user)
  // redirect
  if (
    to.path === '/data/datasetLabeling' ||
    to.path === '/data/labelingDetail'
  ) {
    if (msg == 'success') {
      next()
    } else {
      next({
        path: '/user/login',
        query: { redirect: '/data/datasetLabeling' },
      })
    }
  } else {
    // 正常跳转
    next()
  }
})

//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export default router
