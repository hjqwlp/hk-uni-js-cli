<template>
  <div class="page-layout">
    <!-- main -->
    <slot></slot>
    <!-- 手机号授权 -->
    <tui-modal :show="isNeedPhone" custom padding="40rpx 0 0">
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
  </div>
</template>

<script setup>
  import { onMounted, computed } from 'vue';
  import { useBasicStore } from '@/store/modules/Basic';
  import { useUserStoreWithOut } from '@/store/modules/User';
  import Login from '@/plugins/Login';

  const BasicStore = useBasicStore();
  const UserStore = useUserStoreWithOut();

  const isNeedPhone = computed(() => UserStore.isNeedPhone);
  onMounted(() => {
    BasicStore.fetchHosId();
  });
  const loginByPhone = (e) => {
    console.log(e);
    Login.loginByPhone(e);
  };
</script>

<style lang="scss" scoped>
  ::v-deep .tui-modal-box {
    padding: 40rpx 0 0 !important;
    overflow: hidden;
  }
  .login-btn {
    flex: 1;
  }
</style>
