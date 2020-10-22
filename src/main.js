import Vue from "vue";
import VueTailwind from 'vue-tailwind'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/scss/app.scss';
import settings from "../componentSettings";
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import { VLazyImagePlugin } from "v-lazy-image";
import VueMasonry from 'vue-masonry-css'

Vue.config.productionTip = false;
Vue.use(Autocomplete);
Vue.use(VueTailwind, settings);
Vue.use(VLazyImagePlugin);
Vue.use(VueMasonry);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
