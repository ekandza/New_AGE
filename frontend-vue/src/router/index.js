// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ViewItem from '@/components/ViewItem.vue';
import EditItem from '@/components/EditItem.vue';
import CreateForm from '@/components/CreateForm.vue';
import CompteForm  from '@/components/CompteForm.vue';
import Login from '@/components/LoginView.vue';
 
 

const routes = [
 
  {
    path: '/voir',
    name: 'Voir',
    component: ViewItem,
    meta: { requiresAuth: true }
  },
  {
    path: '/compte',
    name: 'Compte',
    component: CompteForm,
    meta: { requiresAuth: true }
    },
  {
    path: '/editer/:id',
    name: 'Editer',
    component: EditItem,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'EditItem',
    component: EditItem,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true } 
  },
  {
    path: '/',
    redirect: '/Login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



// Guard to check authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else if (to.matched.some(record => record.meta.guest) && token) {
    next('/create');
  } else {
    next();
  }
});



export default router;
