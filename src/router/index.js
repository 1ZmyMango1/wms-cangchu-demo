import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/Dashboard/Home.vue')
      },
      {
        path: '/manage-base-info/warehouse',
        component: () => import('../views/Manage-base-info/warehouse.vue')
      },
      {
        path: '/manage-base-info/area',
        component: () => import('../views/Manage-base-info/area.vue')
      },
      {
        path: '/manage-base-info/location',
        component: () => import('../views/Manage-base-info/location.vue')
      },
      {
        path: '/manage-base-info/location-view',
        component: () => import('../views/Manage-base-info/location-view.vue')
      },
      {
        path: '/manage-base-info/goods',
        component: () => import('../views/Manage-base-info/goods.vue')
      },
      {
        path: '/manage-base-info/goods-type',
        component: () => import('../views/Manage-base-info/goods-type.vue')
      },
      {
        path: '/manage-business/goods-owner',
        component: () => import('../views/manage-business/goods-owner.vue')
      },
      {
        path: '/manage-business/task-picking',
        component: () => import('../views/manage-business/task-picking.vue')
      },
      {
        path: '/manage-base-info/warehouse/details/null',
        component: () =>
          import('../views/Manage-base-info/components/details.vue')
      },
      {
        path: '/manage-base-info/warehouse/areaDetails/null',
        component: () =>
          import('../views/Manage-base-info/components/areaDetails.vue')
      },
      {
        path: '/manage-base-info/warehouse/locationDetails/null',
        component: () =>
          import('../views/Manage-base-info/components/locationDetails.vue')
      },
      {
        path: '/manage-business/goods-owner/goods-ownerDetails/null',
        component: () =>
          import('../views/manage-business/components/goods-ownerDetails.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
