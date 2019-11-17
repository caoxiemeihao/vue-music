import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@comps/recommend/recommend'
import Singer from '@comps/singer/singer'
import Rank from '@comps/rank/rank'
import Search from '@comps/search/search'

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer,
  },
  {
    path: '/rank',
    component: Rank,
  },
  {
    path: '/search',
    component: Search,
  },
]

export default new Router({
  routes,
})
