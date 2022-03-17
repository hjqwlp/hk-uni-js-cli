<script setup>
  import { onShow } from '@dcloudio/uni-app';

  onShow(() => {
    // #ifdef MP-WEIXIN
    const updateManager = uni.getUpdateManager();
    updateManager.onUpdateReady(() => {
      console.log('即将重启自动应用新版本');
      updateManager.applyUpdate();
    });
    // #endif
    // 测试代码提交
  });
</script>
<style lang="scss">
  @import './styles/common';
</style>
