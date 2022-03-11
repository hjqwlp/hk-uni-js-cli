/*
 * @Descripttion: 加密解密
 * @version: 1.0.0
 * @Author: huangli
 * @Date: 2022-02-25 14:36:48
 * @LastEditors: huangli
 * @LastEditTime: 2022-03-07 14:06:56
 */
import { mode, enc, pad, HmacSHA256 } from 'crypto-js';
import { encrypt, decrypt } from 'crypto-js/aes';
import { authorizedAccount } from '@/config/config';

const UTF8 = enc.Utf8;
const key = enc.Utf8.parse(authorizedAccount.key);
const btoa = (str) => enc.Base64.stringify(UTF8.parse(str));

const options = {
  padding: pad.Pkcs7,
  iv: enc.Utf8.parse(authorizedAccount.iv),
  mode: mode.CBC,
};

export function addAppToken() {
  // let timestamp = new Date().getTime() + jetLag;
  const timestamp = new Date().getTime();
  const bs6 = btoa(
    ` {"appId":"${authorizedAccount.appId}","timestamp":${timestamp}}`,
  );
  const h256 = HmacSHA256(
    `${authorizedAccount.secret}.${timestamp}`,
    authorizedAccount.key,
  ).toString();

  return `${bs6}.${h256}`;
}

// 解密
export function decryptByAES(cipherText) {
  if (!cipherText) {
    return;
  }
  if (cipherText instanceof Object) {
    return cipherText;
  }
  if (typeof Number(cipherText) === 'number' && !isNaN(Number(cipherText))) {
    return cipherText;
  }

  const ret = decrypt(cipherText, key, options).toString(UTF8);

  return JSON.parse(ret);
}

// 加密
export function encryptByAES(cipherText) {
  return encrypt(cipherText, this.key, this.getOptions).toString(UTF8);
}
