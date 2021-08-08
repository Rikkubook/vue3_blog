import { createApp } from 'vue';
import routers from './routes';
import App from './App.vue'

createApp(App).use(routers).mount('#app')
