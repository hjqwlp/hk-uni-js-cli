/*
 * @Descripttion: 登录实例封装
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-08 16:07:30
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-10 18:00:11
 */
import Storage from './Storage';
import { useUserStoreWithOut } from '@/store/modules/User';
import { getJsCodeSession } from '@/apis/Wx';
import { oauthToken } from '@/apis/User';
import { getProvider } from '@/utils/utils';
class Login {
  // constructor() {
  //   this.userStore = null;
  //   // this.instance = null; // 单例模式的标识
  //   this.provider = null;
  // }

  constructor() {
    if (!Login.instance) {
      Login.instance = this;
      Login.provider = null;
      Login.AppId = null;
      Login.init();
    }
    return Login.instance;
  }

  static async init() {
    const accountInfo = await uni.getAccountInfoSync();
    console.log(accountInfo);
    this.AppId = accountInfo.miniProgram.appId;
    this.provider = await getProvider();
  }

  static async preLogin() {
    return new Promise((resolve) => {
      uni.login({
        provider: this.provider,
        scopes: 'auth_user',
        success: (loginRes) => {
          resolve(loginRes);
        },
      });
    });
  }

  async gainLoginParams() {
    try {
      const { code } = await Login.preLogin();
      const params = { appId: Login.AppId, authcode: code };
      const userSessionInfo = await getJsCodeSession(params);
      Storage.setStorage('userSessionInfo', userSessionInfo);
      this.singleSignOn();
    } catch (error) {
      console.error(error);
      uni.showToast({
        title: error.message,
        icon: 'none',
        duration: 2000,
      });
    }
  }

  async loginByPhone(e) {
    const userSessionInfo = Storage.getStorage('userSessionInfo');
    delete e.errMsg;
    delete e.cloudID;
    const options = {
      ...e,
      sessionKey: userSessionInfo.sessionKey,
    };
    this.singleSignOn(options);
  }

  async singleSignOn(authData) {
    console.log(authData);
    const userSessionInfo = Storage.getStorage('userSessionInfo');
    const params = {
      // 第三方平台应用Id
      thdAppId: Login.AppId,
      // 机构主体编码  1代表惠康
      orgCode: 1,
      // 第三方应用类型
      thdAppType: 12,
      // 第三方平台应用账号id
      thdAppAid: userSessionInfo.openid,
      // 验证码
      verifyCode: userSessionInfo.authCode,
      // 授权数据,根据终端类型定义数据结构
      authData,
      //  登录令牌
      // thdToken: '',
    };

    try {
      const loginRes = await oauthToken(params);
      console.log(loginRes);
    } catch (error) {
      const userStore = useUserStoreWithOut();
      if (error.errorCode === 40006) {
        userStore.changeIsNeedPhone();
      }
      console.warn(error);
    }
  }
}
export default new Login();
