/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-15 16:15:29
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-15 17:27:13
 */
import request from '@/utils/request';

export function getHospitalInfo(data) {
  return request.get('/japi/v2/client/organization', data, {
    type: 'manageSys',
  });
}
