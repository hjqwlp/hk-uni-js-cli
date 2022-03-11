/*
 * @Descripttion: User相关api
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-02-25 10:11:44
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-10 15:43:22
 */
import request from '@/utils/request';

export function oauthToken(data) {
  return request.post('/japi/v1/thd-c-account/oauth/token', data, {
    type: 'account',
  });
}
