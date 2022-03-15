/*
 * @Descripttion: User相关api
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-02-25 10:11:44
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-15 16:55:38
 */
import request from '@/utils/request';

export function oauthToken(data) {
  return request.post('/japi/v2/thd-c-account/oauth/token', data, {
    type: 'account',
  });
}
