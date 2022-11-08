/**
 * @function 微信接口调用
 * @description 如果是GET方法 处理url和参数后输出
 */

import {Parameter} from '../request/interface';
import {getParamsToUrl} from '../request/splice';
import {getInterfaceRoute} from '../request/route';

export async function $axios(param: Parameter): Promise<WechatMiniprogram.RequestSuccessCallbackResult<string | Record<string, any> | ArrayBuffer>> {
  return new Promise((resolve, reject) => {
    if(param.method == 'GET') {
      param.url = getParamsToUrl(param, getInterfaceRoute(param.url));
      console.log("request url:",param.url);
      param.data = {};
    }
    wx.request({
      url: param.url,
      method: param.method,
      header: {
        'content-type': 'application/json'
      },
      data: param.data,
      success: (res) => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}
export async function request(param: Parameter) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: getInterfaceRoute(param.url),
      method: param.method,
      data: param.data,
      header: param.header,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}