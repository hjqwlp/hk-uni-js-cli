<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-03 17:53:16
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-04 10:20:53
-->
<template>
  <hk-page>
    <view>detail</view>
    <button @click="goBack">back</button>
  </hk-page>
</template>
<script setup>
  import { getCurrentInstance } from 'vue';
  const { $hRouter } = getCurrentInstance().appContext.config.globalProperties;

  const goBack = () => {
    $hRouter.pop(1);
  };
</script>
