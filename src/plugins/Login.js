/*
 * @Descripttion: 登录实例封装
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-08 16:07:30
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-15 17:24:19
 */
import Storage from './Storage';
import Router from './Router/Router';
import { useUserStoreWithOut } from '@/store/modules/User';
import { useBasicStoreWithOut } from '@/store/modules/Basic';
import { getJsCodeSession } from '@/apis/Wx';
import { oauthToken } from '@/apis/User';
import { getProvider } from '@/utils/utils';
class Login {
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
    if (
      Storage.getStorage('userBaseInfo') &&
      Storage.getStorage('userBaseInfo').userInfo
    ) {
      Router.push({ path: '/pages/Account/Login', isBack: true });
      return;
    }
    try {
      const { code } = await Login.preLogin();
      const params = { appId: Login.AppId, authcode: code };
      const userSessionInfo = await getJsCodeSession(params);
      Storage.setStorage('userSessionInfo', userSessionInfo);
      this.singleSignOn();
    } catch (error) {
      uni.showToast({
        title: error.message,
        icon: 'none',
        duration: 2000,
      });
    }
  }

  async loginByPhone(e) {
    const userSessionInfo = Storage.getStorage('userSessionInfo');
    const options = {
      ...e,
      sessionKey: userSessionInfo.sessionKey,
    };
    this.singleSignOn(options);
  }

  async singleSignOn(authData) {
    const userSessionInfo = Storage.getStorage('userSessionInfo');
    const AccountToken = Storage.getStorage('AccountToken') || {};
    const basicStore = useBasicStoreWithOut();
    const userStore = useUserStoreWithOut();

    const params = {
      // 第三方平台应用Id
      thdAppId: Login.AppId,
      // 机构主体编码  1代表惠康
      orgCode: basicStore.hosId,
      // 第三方应用类型
      thdAppType: 12,
      // 第三方平台应用账号id
      thdAppAid: userSessionInfo.openid,
      // 验证码
      verifyCode: userSessionInfo.authCode,
      // 授权数据,根据终端类型定义数据结构
      authData,
      //  登录令牌
      thdToken: AccountToken.thdToken || '',
    };

    try {
      const loginRes = await oauthToken(params);
      const curPages = getCurrentPages();
      console.log(
        curPages[curPages.length - 1].route === 'pages/Account/Login',
      );
      console.log(loginRes);
      Storage.setStorage('AccountToken', loginRes);
      console.log(userStore.gainIsNeedPhone);
      if (userStore.gainIsNeedPhone) {
        userStore.changeIsNeedPhone();
      }
      if (curPages[curPages.length - 1].route === 'pages/Account/Login') {
        Router.backPage().catch(() => {
          Router.switchTab({ path: '/pages/Home/Home' });
        });
      }
    } catch (error) {
      if (error.errorCode === 40006) {
        userStore.changeIsNeedPhone();
      }
    }
  }
}
export default new Login();
