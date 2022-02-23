import { createApp } from 'vue';
import routers from './routes';
import App from './App.vue';
import Notifications from '@kyvg/vue3-notification'

/* code from our Firebase console */

createApp(App).use(routers).use(Notifications).mount('#app')
