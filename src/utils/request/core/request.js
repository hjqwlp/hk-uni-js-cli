import { serviceUrl } from '@/config/config';
export default class Request {
  config = {
    baseUrl: '/',
    header: {
      'content-type': 'application/json;charset=UTF-8',
    },
    method: 'GET',
    dataType: 'json',
    // #ifndef MP-ALIPAY || APP-PLUS
    responseType: 'text',
    // #endif
    custom: {},
    // #ifdef MP-ALIPAY
    timeout: 30000,
    // #endif
    // #ifdef APP-PLUS
    sslVerify: true,
    // #endif
  };

  // 判断url是否为绝对路径
  static posUrl(url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
  }

  static addQueryString(params) {
    let paramsData = '';
    Object.keys(params).forEach(function (key) {
      paramsData += key + '=' + encodeURIComponent(params[key]) + '&';
    });
    return paramsData.substring(0, paramsData.length - 1);
  }

  //拦截器
  interceptor = {
    request: (cb) => {
      if (cb) {
        this.requestBeforeFun = cb;
      }
    },
    response: (cb, ecb) => {
      if (cb && ecb) {
        this.requestComFun = cb;
        this.requestComFail = ecb;
      }
    },
  };

  requestBeforeFun(config) {
    return config;
  }

  requestComFun(response) {
    return response;
  }

  requestComFail(response) {
    return response;
  }

  //自定义验证器
  validateStatus(statusCode) {
    return statusCode === 200;
  }

  // 设置全局默认配置
  setConfig(f) {
    this.config = f(this.config);
  }

  //请求
  async request(options = {}) {
    options.baseUrl = this.config.baseUrl;
    options.dataType = options.dataType || this.config.dataType;
    // #ifndef MP-ALIPAY || APP-PLUS
    options.responseType = options.responseType || this.config.responseType;
    // #endif
    // #ifdef MP-ALIPAY
    options.timeout = options.timeout || this.config.timeout;
    // #endif
    options.url = serviceUrl[options.type] + options.url;
    options.data = options.data || {};
    options.params = options.params || {};
    options.header = options.header || this.config.header;
    options.method = options.method || this.config.method;
    options.custom = { ...this.config.custom, ...(options.custom || {}) };
    // #ifdef APP-PLUS
    options.sslVerify =
      options.sslVerify === undefined
        ? this.config.sslVerify
        : options.sslVerify;
    // #endif
    return new Promise((resolve, reject) => {
      let next = true;

      let handleRe = {};
      options.complete = (response) => {
        response.config = handleRe;
        if (this.validateStatus(response.statusCode)) {
          // 成功
          response = this.requestComFun(response);
          resolve(response);
        } else {
          response = this.requestComFail(response);
          reject(response);
        }
      };
      const cancel = (t = 'handle cancel', config = options) => {
        const err = {
          errMsg: t,
          config: config,
        };
        reject(err);
        next = false;
      };

      handleRe = { ...this.requestBeforeFun(options, cancel) };
      const _config = { ...handleRe };
      if (!next) {
        return;
      }
      delete _config.custom;
      let mergeUrl = Request.posUrl(_config.url)
        ? _config.url
        : _config.baseUrl + _config.url;
      if (JSON.stringify(_config.params) !== '{}') {
        const paramsH = Request.addQueryString(_config.params);
        mergeUrl +=
          mergeUrl.indexOf('?') === -1 ? `?${paramsH}` : `&${paramsH}`;
      }
      _config.url = mergeUrl;
      uni.request(_config);
    });
  }
  //get请求
  get(url, data = {}, options = {}) {
    return this.request({
      url,
      data,
      method: 'GET',
      ...options,
    });
  }
  // post json
  post(url, data, options = {}) {
    this.config.header['content-type'] = 'application/json;charset=UTF-8';
    return this.request({
      url,
      data,
      method: 'POST',
      ...options,
    });
  }
  //post form表单
  postForm(url, data, options = {}) {
    this.config.header['content-type'] = 'application/x-www-form-urlencoded';
    return this.request({
      url,
      data,
      method: 'POST',
      ...options,
    });
  }
  // #ifndef MP-ALIPAY
  put(url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'PUT',
      ...options,
    });
  }

  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
  delete(url, data, options = {}) {
    return this.request({
      url,
      data,
      method: 'DELETE',
      ...options,
    });
  }
  // #endif
}
