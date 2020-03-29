import Vue from 'vue';
import { VueResponsiveComponents } from 'vue-responsive-components';

import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import appConfig from '@/app.config';

Vue.use(VueResponsiveComponents);

Vue.config.productionTip = false;

new Vue({
  mounted() {
    document.querySelector('title').innerHTML = appConfig.appName;
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app');
