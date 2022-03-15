import Storage from '@/plugins/Storage';
import Request from './core/request';
import { checkStatus } from './core/checkStatus';
import { addAppToken } from '../cryption';

const http = new Request();

http.setConfig((config) => {
  /* 设置全局配置 */
  config.baseUrl = 'https://pre-release.jyhk.com';
  config.header = {
    ...config.header,
  };
  return config;
});

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，
 * 否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200;
};

http.interceptor.request((config) => {
  /* 请求之前拦截器 */
  config.header = {
    ...config.header,
    appToken: addAppToken(),
    accessToken:
      (Storage.getStorage('AccountToken') &&
        Storage.getStorage('AccountToken').accessToken) ||
      '',
  };

  return config;
});

http.interceptor.response(
  (response) => {
    return response.data;
  },
  (response) => {
    checkStatus(response.statusCode);
    // 请求错误做点什么
    return response.data;
  },
);
export default http;
