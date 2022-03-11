<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-07 14:16:03
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-10 17:51:26
-->
<template>
  <hk-page class="login">
    <tui-button
      class=""
      open-type="getUserInfo"
      lang="zh_CN"
      with-credentials="true"
      @getuserinfo="gainUserBaseInfo"
    >
      登录
    </tui-button>
    <!-- <button open-type="getPhoneNumber" @getphonenumber="loginByPhone">
      获取手机号
    </button> -->
    <tui-modal :show="isNeedPhone" custom>
      <view class="font-40 font-title ta-center font-bold hidden">提示</view>
      <view class="font-30 font-title ta-center pt-30 pb-20 hidden">
        您还未绑定手机号，请先授权绑定手机号
      </view>
      <view class="flex mt-30">
        <tui-button class="login-btn" shape="rightAngle" plain>取消</tui-button>
        <tui-button
          class="login-btn"
          shape="rightAngle"
          open-type="getPhoneNumber"
          @getphonenumber="loginByPhone"
        >
          获取手机号
        </tui-button>
      </view>
    </tui-modal>
  </hk-page>
</template>
<script setup>
  import { getCurrentInstance, watch, computed } from 'vue';
  import Login from '@/plugins/Login';
  import { useUserStoreWithOut } from '@/store/modules/User';

  const UserStore = useUserStoreWithOut();
  const isNeedPhone = computed(() => UserStore.isNeedPhone);
  console.log(isNeedPhone.value);

  watch(
    () => isNeedPhone.value,
    (val) => {
      if (val) {
        // popup.value.open();
      }
    },
    { immediate: true },
  );
  const { $storage } = getCurrentInstance().appContext.config.globalProperties;
  console.log(Login);

  const gainUserBaseInfo = (e) => {
    console.log(e);
    $storage.setStorage('userBaseInfo', e);
    Login.gainLoginParams();
  };

  const loginByPhone = (e) => {
    console.log(e);
    Login.loginByPhone(e);
  };
  // console.log(Login.provider);
  // Login.singleSignOn();

  // const getuserinfo = (e) => {
  //   console.log(e);
  // };
  // console.log(LoginClass());
  // console.log(LoginClass.preLogin());
  // const LoginClass = Login.getInstance();
  // console.log(LoginClass);
</script>
<style lang="scss" scoped>
  ::v-deep .page-layout {
    min-height: 100vh;
  }
  ::v-deep .tui-modal-box {
    padding: 40rpx 0 0 !important;
    overflow: hidden;
  }
  .login-btn {
    flex: 1;
  }
</style>
