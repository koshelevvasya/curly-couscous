import { RouteConfig } from 'vue-router'

import Users from '../components/Users/All.vue'
import UserCreate from '../components/Users/Create.vue'
import UserEdit from '../components/Users/Edit.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/users',
    name: 'Users CRUD',
    component: Users
  },
  {
    path: '/users/create',
    name: 'Users CRUD',
    component: UserCreate
  },
  {
    path: '/users/edit/:user_id',
    name: 'Users CRUD',
    component: UserEdit
  }
]

export default routes
