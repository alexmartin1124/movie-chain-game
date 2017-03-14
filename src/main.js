// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AppView from './App'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

Vue.config.productionTip = false

var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(AppView)
})
