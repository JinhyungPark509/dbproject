import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/product/ProductListForCustomerView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/category/list',
    name: 'CategoryView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/category/CategoryView.vue'
      )
  },
  {
    path: '/supplier/list',
    name: 'SupplierListView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/supplier/SupplierListView.vue'
      )
  },
  {
    path: '/supplier/create',
    name: 'SupplierCreateView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/supplier/SupplierCreateView.vue'
      )
  },
  {
    path: '/supplier/detail',
    name: 'SupplierDetailView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/supplier/SupplierDetailView.vue'
      )
  },
  {
    path: '/supplier/edit',
    name: 'SupplierEditView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/supplier/SupplierEditView.vue'
      )
  },
  {
    path: '/product/create',
    name: 'ProductCreateView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/product/ProductCreateView.vue'
      )
  },
  {
    path: '/product/list',
    name: 'ProductListView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/product/ProductListView.vue'
      )
  },
  {
    path: '/product/detail',
    name: 'ProductDetailView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/product/ProductDetailView.vue'
      )
  },
  {
    path: '/product/edit',
    name: 'ProductEditView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/product/ProductEditView.vue'
      )
  },
  {
    path: '/products',
    name: 'ProductListForCustomerView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/product/ProductListForCustomerView.vue'
      )
  },
  {
    path: '/basket',
    name: 'BasketView',
    component: () =>
      import(
        /* webpackChunkName: "product" */ '../views/product/BasketView.vue'
      )
  },
  {
    path: '/shipper/list',
    name: 'ShipperView',
    component: () =>
      import(
        /* webpackChunkName: "shipper" */ '../views/shipper/ShipperView.vue'
      )
  },
  {
    path: '/employee/list',
    name: 'EmployeeView',
    component: () =>
      import(
        /* webpackChunkName: "employee" */ '../views/employee/EmployeeView.vue'
      )
  },
  {
    path: '/customer/list',
    name: 'CustomerView',
    component: () =>
      import(
        /* webpackChunkName: "customer" */ '../views/customer/CustomerView.vue'
      )
  },
  {
    path: '/order',
    name: 'OrderView',
    component: () =>
      import(/* webpackChunkName: "order" */ '../views/order/OrderView.vue')
  },
  {
    path: '/order/list',
    name: 'OrderListView',
    component: () =>
      import(/* webpackChunkName: "order" */ '../views/order/OrderListView.vue')
  },
  {
    path: '/order/detail',
    name: 'OrderDetailView',
    component: () =>
      import(
        /* webpackChunkName: "order" */ '../views/order/OrderDetailView.vue'
      )
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
