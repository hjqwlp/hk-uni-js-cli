<template>
  <hk-page>
    <view>home</view>
    <button @click="toDetail">toDetail</button>
  </hk-page>
</template>
<script setup>
  import { getCurrentInstance } from 'vue';

  const { proxy } = getCurrentInstance();

  const toDetail = () => {
    proxy.$Router.push({
      path: '/pages/Detail/Detail',
      query: { name: 'abc', age: '123' },
    });
  };
</script>
