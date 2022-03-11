/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-07 10:41:20
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-07 13:46:41
 */
import request from '@/utils/request';

export function getHosIdByAppid(data) {
  return request.get('/japi/v1/account/wechatofficialaccount-by-appid', data, {
    type: 'optsMessage',
  });
}
