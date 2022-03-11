import { createSSRApp } from 'vue';
import { setupStore } from './store';
import { setupRouter, router } from '@/utils/router';
import globalMixin from '@/mixin/globalMixin.js';
import Storage from '@/plugins/Storage';

import App from './App.vue';

export function createApp() {
  const app = createSSRApp(App);
  app.config.globalProperties.$hRouter = router;
  app.config.globalProperties.$storage = Storage;
  app.mixin(globalMixin);
  setupStore(app);
  setupRouter(app);
  return {
    app,
  };
}
