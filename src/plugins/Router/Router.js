/*
 * @Descripttion: 路由组件封装
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-14 15:46:04
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-15 15:04:29
 */
import { options } from './Config';
class Router {
  constructor() {
    if (!Router.instance) {
      Router.instance = this;
      this.initOptions();
    }
    return Router.instance;
  }

  // 初始化参数
  initOptions() {
    this.options = options;
    this.callBack = () => {};
    this.afterEach = () => {};
    this.beforeEach = (to, next) => {
      next();
    };
  }

  // 处理全局前置守卫
  async _beforeEach(navType, path, query) {
    return new Promise((resolve) => {
      this.beforeEach({ navType, path, query }, resolve);
    });
  }

  // 处理全局前置守卫 next 函数传经来的方法
  _next(next) {
    return new Promise((resolve, reject) => {
      if (typeof next === 'function') {
        reject('在全局前置守卫 next 中重定向路由');
        Promise.resolve().then(() => next(this));
      } else if (next === false) {
        reject('在全局前置守卫 next 中取消路由');
      } else {
        resolve();
      }
    });
  }

  // 序列化路由传参
  _formatParams(url, query = {}) {
    let queryString = '?';
    Object.keys(query).forEach((e) => {
      if (typeof query[e] === 'object') {
        queryString += `${e}=${JSON.stringify(query[e])}&`;
      } else {
        queryString += `${e}=${query[e]}&`;
      }
    });
    queryString = queryString.length === 1 ? '' : queryString.replace(/&$/, '');
    return `${url}${queryString}`;
  }

  // 设置 js逻辑栈 add  前进   detele  后退
  setHistory(type) {
    const { StackPages } = this;
    const { MaxPages } = this.state;
    const { path, query } = this.urlOptions;
    if (type === 'add') {
      this.toRouter('navigateTo', path, query).then((res) => {
        this.updateRoutes([{ ...this.urlOptions, id: res.id }]);
      });
    } else {
      const StackPagesCount = StackPages.length;
      const StackPagesInfo = StackPages[StackPagesCount - 2];
      const navType = StackPagesCount > MaxPages ? 'navigateTo' : 'redirectTo';

      this.toRouter(navType, StackPagesInfo.route, StackPagesInfo.options).then(
        () => {
          this.updateRoutes([], -1);
        },
      );
    }
  }

  // 路由判断
  _navigateCount() {
    const { StackPages, MaxPages, PageOptions, TransferPage } = this.options;
    const { navType, path, query } = PageOptions;
    // 获取当前页面栈
    const curPages = getCurrentPages();

    if (curPages.length === 1 && StackPages.length === 0) {
      this.updateRoutes(curPages);
    }

    switch (navType) {
      case 'navigateTo':
        if (curPages.length < MaxPages - 1) {
          // 小于倒数第二层时，直接打开
          // 重置js页面站
          this._contrastRouting();
          this.toRouter(navType, path, query).then((res) => {
            this.updateRoutes([{ ...PageOptions, id: res.id }]);
          });
        } else if (curPages.length === MaxPages - 1) {
          // 倒数第二层打开最后一层
          // 重置js页面站
          this._contrastRouting();
          this.toRouter('redirectTo', TransferPage);
        } else {
          // 已经达到最大层数，直接最后一层重定向
          this.toRouter('redirectTo', path, query).then((res) => {
            this.updateRoutes([{ ...PageOptions, id: res.id }]);
          });
        }
        break;
      case 'redirectTo':
        this.toRouter(navType, path, query).then((res) => {
          this.updateRoutes([], -1);
          this.updateRoutes([{ ...PageOptions, id: res.id }]);
        });
        break;
      case 'reLaunch':
        this.options.StackPages = [];
        this.toRouter(navType, path, query);
        break;
      case 'switchTab':
        this.options.StackPages = [];
        this.toRouter(navType, path, query).then((res) => {
          this.updateRoutes([{ ...PageOptions, id: res.id }]);
        });
        break;
      default:
    }
  }

  // 执行跳转t
  async toRouter(navType, path, query) {
    let error = '';
    try {
      const next = await this._beforeEach(navType, path, query);
      await this._next(next);
    } catch (e) {
      error = e;
    }
    return new Promise((resolve, reject) => {
      if (error) {
        reject(error);
      } else {
        const url = this._formatParams(path, query);
        uni[navType]({
          url,
          success: () => {
            const curPages = getCurrentPages();
            const info = curPages[curPages.length - 1];
            this.afterEach(info);
            resolve({ ...info, id: info.__wxExparserNodeId__ });
          },
        });
      }
    });
  }

  // 比对有回调的页面
  _contrastRouting() {
    const curPages = getCurrentPages();
    const { StackPages } = this.options;
    for (const i in StackPages) {
      if (StackPages[i].isBack) {
        for (const a in curPages) {
          if (StackPages[i].id === curPages[a].__wxExparserNodeId__) {
            curPages[a] = {
              ...this.StackPages[i],
              path: this.StackPages[i].route,
            };
          }
        }
      }
    }
    this.options.StackPages = [];
    this.updateRoutes(curPages);
  }

  // 更新路由
  updateRoutes(routes = [], count = 0) {
    const { StackPages, TransferPage } = this.options;
    const pagesCount = StackPages.length;
    if (count === 0) {
      for (const i in routes) {
        const r = routes[i];

        StackPages.push({
          $page: r.$page || { fullPath: this._formatParams(r.path, r.query) },
          options: r.options || r.query,
          route: r.path || (r.route && `/${r.route}`),
          isBack: Boolean(r.isBack),
          backPage: r.isBack ? StackPages[TransferPage.length - 1] : {},
          id: r.__wxExparserNodeId__ || r.id || 0,
        });
      }
    } else {
      this.options.StackPages = StackPages.slice(0, pagesCount + count);
    }
  }
  // 保留当前页；
  push(parameter) {
    this.options.PageOptions = { navType: 'navigateTo', ...parameter };
    this._navigateCount();
  }
  // 关闭当前页，跳转到指定页；
  redirectTo(parameter) {
    this.options.PageOptions = { navType: 'redirectTo', ...parameter };
    this._navigateCount();
  }
  // 关闭所有页面，打开到应用内的某个页面。
  reLaunch(parameter) {
    this.options.PageOptions = { navType: 'reLaunch', ...parameter };
    this._navigateCount();
  }
  // 只能用于跳转到tabbar页面，并关闭其他非tabbar页面。
  switchTab(parameter) {
    this.options.PageOptions = { navType: 'switchTab', ...parameter };
    this._navigateCount();
  }
  // 回调来源记录页面
  backPage(query = {}) {
    const history =
      this.options.TransferPage[this.options.TransferPage.length - 1];
    const isBackList = this.options.TransferPage.filter((item) => {
      return item.isBack && item.route === history.route;
    });

    return new Promise((resolve, reject) => {
      if (isBackList.length >= 1) {
        const historyInfo = isBackList[isBackList.length - 1].backPage;

        isBackList[isBackList.length - 1].isBack = false;
        this.push({
          navType: 'navigateTo',
          path: historyInfo.route,
          query: { ...historyInfo.options, ...query },
        });
        resolve();
      } else {
        reject();
      }
    });
  }
  // 上一页
  back() {
    uni.navigateBack();
  }
}
export default new Router();
