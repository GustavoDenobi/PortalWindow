import Vue from "vue";
import App from "./App.vue";

import {
  BootstrapVue,
  IconsPlugin,
  LayoutPlugin,
  ToastPlugin
} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Settings from "./components/Settings";
import Home from "./components/Home";

import { store } from "./common/datastore";

// import Vuex from "vuex";
import VueRouter from "vue-router";

const Foo = { template: "<div>foo</div>" };
const router = new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/foo", component: Foo },
    { path: "/settings", component: Settings }
  ]
});

//import VuePeerJS from "vue-peerjs";
//import Peer from "peerjs";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(LayoutPlugin);
Vue.use(ToastPlugin);

Vue.use(VueRouter);
// Vue.use(Vuex);
store.loadFromStorage();
console.log(store.stgs);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router: router,
  data: store
  // store: new Vuex.Store()
}).$mount("#app");
