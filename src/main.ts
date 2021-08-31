import { createApp } from 'vue';
import routers from './routes';
import App from './App.vue';

/* code from our Firebase console */

createApp(App).use(routers).mount('#app')
