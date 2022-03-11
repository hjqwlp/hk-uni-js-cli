/*
 * @Descripttion: 基础框架
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-02-25 14:39:56
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-07 13:46:29
 */
export const authorizedAccount = {
  appId: 'otsp-manage-sys-web',
  secret: 'f9xcfnqmzv710jf84ft59afc61mpqa8q',
  key: 'acfe81hfcn91zmax',
  iv: 'acfe81hfcn91zmax',
};
export const unAuthorizedAccount = {
  appId: 'otsp-manage-sys-web',
  secret: 'f9xcfnqmzv710jf84ft59afc61mpqa8q',
  key: 'acfe81hfcn91zmax',
  iv: 'acfe81hfcn91zmax',
};
export const serviceUrl = {
  medical: '/otsp-medical', // 医疗资源接口
  system: '/otsp-system', // 系统配置
  account: '/otsp-account', // 账号服务接口
  user: '/otsp-user', // 用户服务接口
  userAuth: '/otsp-auth', // 证件认证服务接口
  file: '/otsp-file', // 文件系统服务接口
  wx: '/otsp-weixin', // 医疗资源接口
  news: '/otsp-info', // 信息服务接口
  service: '/otsp-service', // 服务接口
  schedule: '/otsp-schedule', // 预约资源
  manageSys: '/otsp-manage-sys', // 台管理组织架构及权限相关接口
  healthSelfTest: 'otsp-question',
  interview: '/otsp-interview', // 咨询
  im: '/otsp-im',
  message: '/otsp-medical-message', // 会话消息接口
  leadingExamining: '/otsp-healidea',
  clinic: '/otsp-clinic', // 复诊
  bill: '/otsp-bill', // 账单接口
  video: '/otsp-video', // 视频
  optsMessage: '/otsp-message', // 消息系统接口
};
