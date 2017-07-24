import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    }
  ]
})
