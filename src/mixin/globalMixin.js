export default {
  data() {
    return {};
  },
  methods: {
    //显示loading
    showLoadingMixin(LoadingTitle) {
      console.log('showLoading', LoadingTitle);
      uni.showLoading({ title: `${LoadingTitle}`, mask: true });
    },
    wxShowToastSuccess(title, duration) {
      this.sleepMixin(50).then(() => {
        uni.showToast({
          title: title,
          icon: 'success',
          duration: duration || 2000,
        });
      });
    },
    wxShowToastNone(title, duration) {
      this.sleepMixin(50).then(() => {
        uni.showToast({
          title: title,
          icon: 'none',
          duration: duration || 2000,
        });
      });
    },
    //类似java 的线程阻塞
    sleepMixin(time) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          resolve();
        }, time);
      });
    },
  },
};
