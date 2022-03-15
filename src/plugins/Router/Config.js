/*
 * @Descripttion: 路由配置项
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-15 14:32:08
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-15 15:00:26
 */
export const options = {
  TransferPage: '/router/index',
  PageOptions: {
    navType: 'navigateTo',
    path: '/pages/Home/Home',
    query: {},
    isBack: false,
  },
  StackPages: [],
};
// #ifdef MP
options.MaxPages = 8;
// #endif
// #ifdef H5
options.MaxPages = 999;
// #endif

export const IgnoreRouters = [
  '/',
  '/pages/Account/Login',
  '/pages/MainPackage/Home/Index',
  '/pages/MainPackage/Services/Index',
  '/pages/MainPackage/Message/Index',
  '/pages/ReExamination/Home/index',
];
