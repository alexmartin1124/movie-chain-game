import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import SinglePlayer from './components/SinglePlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/single',
      name: 'SinglePlayer',
      component: SinglePlayer
    }
  ]
})
