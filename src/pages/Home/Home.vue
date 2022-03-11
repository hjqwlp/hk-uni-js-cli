<template>
  <hk-page>
    <view>home</view>
    <button @click="toDetail">toDetail</button>
  </hk-page>
</template>
<script setup>
  import { getCurrentInstance, onMounted } from 'vue';
  import { useBasicStore } from '@/store/modules/Basic';

  const BasicStore = useBasicStore();
  const { $hRouter } = getCurrentInstance().appContext.config.globalProperties;

  onMounted(() => {
    BasicStore.fetchHosId();
  });

  const toDetail = () => {
    $hRouter.push('/pages/Detail/Detail', { name: 'abc', age: '123' });
  };
</script>
