//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueRewards from "vue-rewards";
import 'bootstrap/dist/css/bootstrap.min.css' // Booststrap
import 'bootstrap-icons/font/bootstrap-icons.css' // Bootstrap Icons
import "font-awesome/css/font-awesome.min.css"; // Font Awesome
import 'boxicons/css/boxicons.min.css' // Box Icons

import navbar from '@/examples/Navbar.vue';
import side from '@/examples/side.vue';

const app = createApp(App)

app.use(router)
app.use(VueRewards);
app.component('navbar', navbar)
app.component('side', side)
app.mount('#app')
