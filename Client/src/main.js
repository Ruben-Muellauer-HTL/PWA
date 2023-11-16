import { createApp } from 'vue';
import router from './router';

import './assets/scss/custom.scss';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.mount('#app');
