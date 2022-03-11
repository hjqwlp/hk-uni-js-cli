/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-10 13:33:17
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-10 13:33:58
 */
import request from '@/utils/request';

export function getJsCodeSession(data) {
  return request.get('/japi/wxmini/getjscodesession', data, {
    type: 'wx',
  });
}
