import Vue from "vue";
import VueTailwind from 'vue-tailwind'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/scss/app.scss';
import { VueMasonryPlugin } from "vue-masonry";
import settings from "../componentSettings";
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.config.productionTip = false;
Vue.use(VueMasonryPlugin);
Vue.use(Autocomplete);
Vue.use(VueTailwind, settings);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
