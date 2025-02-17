import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css';
import { apolloProvider } from './apollo';

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
