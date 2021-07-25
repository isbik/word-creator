import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue';
import Card from './pages/Card.vue';
import Cards from './pages/Cards.vue';
import Main from './pages/Main.vue';
import Profile from './pages/Profile.vue';


const routes = [
  { path: '/', component: Main },
  { path: '/card/:id', component: Card },
  { path: '/profile', component: Profile },
  { path: '/cards', component: Cards },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')