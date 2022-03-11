/**
 * 是否为真正的对象{} new Object
 * @param {any} obj - 检测的对象
 * @returns {boolean}
 */
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

// 获取终端类型
export function getProvider() {
  return new Promise((resolve, reject) => {
    uni.getProvider({
      service: 'oauth',
      success: (res) => {
        resolve(res.provider[0]);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
