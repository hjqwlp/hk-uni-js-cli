import { defineStore } from 'pinia';
import { store } from '@/store';

export const useUserStore = defineStore('user', {
  state: () => ({
    isQuickLoginIng: false, // 是否正在快等登录
    quickLoginStatus: true, // 是否登录成功
    quickLoginDialogStatus: false, // 登录弹窗状态
    isNeedPhone: false, // 是否需要手机号码
  }),
  getters: {
    gainIsQuickLoginIng: (state) => state.isQuickLoginIng,
    gainQuickLoginStatus: (state) => state.quickLoginStatus,
    gainQuickLoginDialogStatus: (state) => state.quickLoginDialogStatus,
    gainIsNeedPhone: (state) => state.isNeedPhone,
  },
  actions: {
    changeQuickLoginDialog() {
      this.quickLoginDialogStatus = !this.quickLoginDialogStatus;
    },
    changeIsNeedPhone() {
      this.isNeedPhone = !this.isNeedPhone;
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
