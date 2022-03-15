<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-07 14:16:03
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-15 17:21:12
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
  </hk-page>
</template>
<script setup>
  import { getCurrentInstance } from 'vue';
  import Login from '@/plugins/Login';

  const { proxy } = getCurrentInstance();

  const gainUserBaseInfo = (e) => {
    proxy.$Storage.setStorage('userBaseInfo', e, '').then(() => {
      Login.gainLoginParams();
    });
  };
</script>
<style lang="scss" scoped>
  ::v-deep .page-layout {
    min-height: 100vh;
  }
</style>
