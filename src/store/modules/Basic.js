/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-07 10:33:10
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-15 17:36:21
 */
import { defineStore } from 'pinia';
import { store } from '@/store';
import { getHosIdByAppid } from '@/apis/Message';
import { getHospitalInfo } from '@/apis/ManageSys';

export const useBasicStore = defineStore('basic', {
  state: () => ({
    appInfo: {},
    hosId: '',
    hosInfo: '',
  }),
  getters: {
    gainHosId: (state) => state.hosId,
    gainHosInfo: (state) => state.hsoInfo,
  },
  actions: {
    fetchHosId() {
      // #ifdef  MP-WEIXIN
      if (this.hosId && this.hosInfo) {
        return;
      }
      if (this.hosId && !this.hosInfo) {
        this.fetchHosInfo();
        return;
      }
      const accountInfo = uni.getAccountInfoSync();
      const appId = accountInfo.miniProgram.appId;
      getHosIdByAppid({ appId }).then((res) => {
        console.log(res);
        this.appInfo = res;
        this.hosId = res.orgCode;
        this.fetchHosInfo();
      });
      // #endif
    },
    fetchHosInfo() {
      getHospitalInfo({ oid: this.hosId }).then((res) => {
        this.hosInfo = res;
      });
    },
  },
});

// Need to be used outside the setup
export function useBasicStoreWithOut() {
  return useBasicStore(store);
}
