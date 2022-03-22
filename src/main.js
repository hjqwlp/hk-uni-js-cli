import { createSSRApp } from 'vue';
import { setupStore } from './store';
import Router from '@/plugins/Router/Router';
import GlobalMixin from '@/mixin/GlobalMixin.js';
import GlobalMethods from '@/plugins/GlobalMethods.js';
import App from './App.vue';

export function createApp() {
  const app = createSSRApp(App);
  app.use(GlobalMethods);
  app.mixin(GlobalMixin);
  setupStore(app);
  return {
    app,
  };
}
const a = 123123;
Router.beforeEach = (to, next) => {
  console.log('全局前置守卫', to);
  next();
};

console.log(Router);
