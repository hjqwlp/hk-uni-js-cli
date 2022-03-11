/*
 * @Descripttion: 缓存Class类
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-10 15:06:34
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-10 15:09:18
 */
/*
 * @Descripttion: 登录实例封装
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-08 16:07:30
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-10 14:27:13
 */
// import { useUserStoreWithOut } from '@/store/modules/User';
class Storage {
  constructor() {
    if (!Storage.instance) {
      Storage.instance = this;
      Storage.AppId = null;
      Storage.init();
    }
    return Storage.instance;
  }

  static async init() {
    const accountInfo = await uni.getAccountInfoSync();
    this.AppId = accountInfo.miniProgram.appId;
  }

  setStorage(key, value, type = 'sync') {
    if (type === 'sync') {
      uni.setStorageSync(`${key}-${Storage.AppId}`, value);
    } else {
      return new Promise((resolve, reject) => {
        uni.setStorage({
          key: `${key}-${Storage.AppId}`,
          data: value,
          success: () => {
            resolve('success');
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    }
  }

  getStorage(key, type = 'sync') {
    if (type === 'sync') {
      return uni.getStorageSync(`${key}-${Storage.AppId}`);
    }

    return new Promise((resolve, reject) => {
      uni.getStorage({
        key: `${key}-${Storage.AppId}`,
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  }

  removeStorage(key, type = 'sync') {
    if (type === 'sync') {
      uni.removeStorageSync(`${key}-${Storage.AppId}`);
    } else {
      return new Promise((resolve, reject) => {
        uni.removeStorage({
          key: `${key}-${Storage.AppId}`,
          success: () => {
            resolve('success');
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    }
  }
}
export default new Storage();
