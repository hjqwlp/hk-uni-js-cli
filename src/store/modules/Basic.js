/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-07 10:33:10
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-07 13:51:17
 */
import { defineStore } from 'pinia';
import { store } from '@/store';
import { getHosIdByAppid } from '@/apis/Message';

export const useBasicStore = defineStore('basic', {
  state: () => ({
    hosId: '',
    hosInfo: {},
  }),
  getters: {
    gainHosId: (state) => state.hosId,
    gainHosInfo: (state) => state.hsoInfo,
  },
  actions: {
    fetchHosId() {
      // #ifdef  MP-WEIXIN
      const accountInfo = uni.getAccountInfoSync();
      const appId = accountInfo.miniProgram.appId;
      getHosIdByAppid({ appId }).then((res) => {
        console.log(res);
      });
      // #endif
    },
  },
});

// Need to be used outside the setup
export function useBasicStoreWithOut() {
  return useBasicStore(store);
}
