import dayjs from 'dayjs';
import Storage from './Storage';
import Router from './Router/Router';

export default {
  install(app) {
    app.config.globalProperties.$Router = Router;
    app.config.globalProperties.$Storage = Storage;
    app.config.globalProperties.$day = dayjs;
  },
};
