/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-10 14:33:56
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-15 16:31:02
 */
import Login from '@/plugins/Login';

export function checkStatus(status, errorMessageMode = 'message') {
  let errMessage = '';

  switch (status) {
    // 404请求不存在
    case 401:
      errMessage = '登录失效';
      try {
        Login.gainLoginParams();
        // return this.request(options);
      } catch (err) {
        // 在此处理错误
      }
      break;
    case 404:
      errMessage = '网络请求错误, 未找到该资源';
      break;
    case 405:
      errMessage = '网络请求错误,  请求方法未允许';
      break;
    case 500:
      errMessage = '服务器错误, 请联系管理员';
      break;
    case 502:
      errMessage = '网络错误, 请稍后重试';
      break;
    case 503:
      errMessage = '服务不可用, 服务过载或正在维护';
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      uni.showModal({
        title: '错误提示',
        content: errMessage,
      });
    } else if (errorMessageMode === 'message') {
      uni.showToast({
        title: errMessage,
        icon: 'none',
        duration: 2000,
      });
    }
  }
}
