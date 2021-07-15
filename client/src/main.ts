import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue';
import Card from './pages/Card.vue';
import Main from './pages/Main.vue';


const routes = [
  { path: '/', component: Main },
  { path: '/card/:id', component: Card },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')