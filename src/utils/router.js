/* eslint-disable max-params */
/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-03-03 16:49:58
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-07 13:54:11
 */

// 当前路由对象所在的 path 等信息。默认为首页
export const route = {
  fullPath: '/pages/Home/Home',
  path: '/Home',
  type: 'push',
  query: {},
};
// 标记路由状态 防止连点
let isRouting = false;
// 路由变化监听函数
let onchange = () => {};
// 页面数据缓存
const localRouter = [];
// pushPop resolve 函数
let pushPopFun = () => {};
// 简易克隆方法
const _clone = (obj) => JSON.parse(JSON.stringify(obj));

export const router = new Proxy(
  {
    route: route, // 当前路由对象所在的 path 等信息,
    afterEach: () => {}, // 全局后置守卫
    beforeEach: (to, next) => next(), // 全局前置守卫
    _formatData(query) {
      // 序列化路由传参
      let queryString = '?';
      Object.keys(query).forEach((e) => {
        if (typeof query[e] === 'object') {
          queryString += `${e}=${JSON.stringify(query[e])}&`;
        } else {
          queryString += `${e}=${query[e]}&`;
        }
      });
      return queryString.length === 1 ? '' : queryString.replace(/&$/, '');
    },
    _beforeEach(path, fullPath, query, type) {
      // 处理全局前置守卫
      return new Promise((resolve) => {
        this.beforeEach({ path, fullPath, query, type }, resolve);
      });
    },
    _next(next) {
      // 处理全局前置守卫 next 函数传经来的方法
      return new Promise((resolve, reject) => {
        if (typeof next === 'function') {
          // 当 next 为函数时, 表示重定向路由,
          reject('在全局前置守卫 next 中重定向路由');
          Promise.resolve().then(() => next(this)); // 此处一个微任务的延迟是为了先触发重定向的reject
        } else if (next === false) {
          // 当 next 为 false 时, 表示取消路由
          reject('在全局前置守卫 next 中取消路由');
        } else {
          resolve();
        }
      });
    },
    _routeTo(routerType, type, fullPath, query, notBeforeEach, notAfterEach) {
      return new Promise((resolve, reject) => {
        if (isRouting) {
          reject('路由进行中');
          return;
        }
        const path = fullPath.split('/')[2];
        const routeTo = (url) => {
          // 执行路由
          const temp = _clone(route); // 将 route 缓存起来
          Object.assign(route, { path, fullPath, query, type }); // 在路由开始执行前就将 query 放入 route, 防止少数情况出项的 onLoad 执行时，query 还没有合并
          isRouting = true;
          uni[routerType]({ url }).then((err) => {
            if (err && err.errMsg.indexOf('ok') === -1) {
              // 路由未在 pages.json 中注册
              Object.assign(route, temp); // 如果路由跳转失败，就将 route 恢复
              isRouting = false;
              reject(err);
            } else {
              // 跳转成功, 将路由信息赋值给 route
              resolve(route); // 将更新后的路由对象 resolve 出去
              isRouting = false;
              onchange({ path, fullPath, query, type }, temp);
              !notAfterEach && this.afterEach(route); // 如果没有禁止全局后置守卫拦截时, 执行全局后置守卫拦截
            }
          });
        };
        if (notBeforeEach) {
          // notBeforeEach 当不需要被全局前置守卫拦截时
          routeTo(`${fullPath}${this._formatData(query)}`);
        } else {
          this._beforeEach(path, fullPath, query, type).then((next) => {
            // 执行全局前置守卫,并将参数传入
            this._next(next)
              .then(() => {
                // 在全局前置守卫 next 没传参
                routeTo(`${fullPath}${this._formatData(query)}`);
              })
              .catch((e) => reject(e)); // 在全局前置守卫 next 中取消或重定向路由
          });
        }
      });
    },
    pop(data) {
      if (typeof data === 'object') {
        pushPopFun(data);
      }
      uni.navigateBack({ delta: typeof data === 'number' ? data : 1 });
    },
    // path 路由名 //  query 路由传参 // isBeforeEach 是否要被全局前置守卫拦截 // isAfterEach 是否要被全局后置守卫拦截
    push(fullPath, query = {}, notBeforeEach, notAfterEach) {
      return this._routeTo(
        'navigateTo',
        'push',
        fullPath,
        query,
        notBeforeEach,
        notAfterEach,
      );
    },
    pushPop(fullPath, query = {}, notBeforeEach, notAfterEach) {
      return new Promise((resolve) => {
        pushPopFun(null);
        pushPopFun = resolve;
        this._routeTo(
          'navigateTo',
          'pushPop',
          fullPath,
          query,
          notBeforeEach,
          notAfterEach,
        );
      });
    },
    replace(fullPath, query = {}, notBeforeEach, notAfterEach) {
      return this._routeTo(
        'redirectTo',
        'replace',
        fullPath,
        query,
        notBeforeEach,
        notAfterEach,
      );
    },
    switchTab(fullPath, query = {}, notBeforeEach, notAfterEach) {
      return this._routeTo(
        'switchTab',
        'switchTab',
        fullPath,
        query,
        notBeforeEach,
        notAfterEach,
      );
    },
    reLaunch(fullPath, query = {}, notBeforeEach, notAfterEach) {
      return this._routeTo(
        'reLaunch',
        'reLaunch',
        fullPath,
        query,
        notBeforeEach,
        notAfterEach,
      );
    },
  },
  {
    set(target, key, value) {
      if (key === 'onchange') {
        onchange = value;
      }
      return Reflect.set(target, key, value);
    },
  },
);

Object.setPrototypeOf(route, router); // 让 route 继承 router

export function setupRouter(app) {
  app.mixin({
    onShow() {
      const pages = getCurrentPages()
        .map((e) => `/${e.route}`)
        .reverse(); // 获取页面栈
      if (pages[0]) {
        // 当页面栈不为空时执行
        const cloneRouter = pages[0] !== route.fullPath;
        const currentRouter = localRouter.find((e) => e.fullPath === pages[0]); // 如果路由没有被缓存就缓存
        currentRouter
          ? Object.assign(route, currentRouter)
          : localRouter.push(_clone(route)); // 已缓存就用已缓存的更新 route 对象
        localRouter.splice(pages.length, localRouter.length); // 最后清除无效缓存
        if (cloneRouter) {
          // 当当前路由与 route 对象不符时，表示路由发生返回
          if (pages.length === 1) {
            // 如果页面栈只有一个页面，表示正处于 tabbar 页面
            Object.assign(route, {
              fullPath: pages[0],
              path: `/${pages[0].split('/')[3]}`,
              query: {},
              type: 'switchTab',
            });
          }
          onchange(route, cloneRouter);
        }
      }
    },
  });
  app.use(router);
}
