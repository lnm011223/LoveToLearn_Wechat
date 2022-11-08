/**
 * @function 将get请求的参数连接到url上
 */
import {Parameter} from '../request/interface';
export function getParamsToUrl(param: Parameter, url: string): string {
  // 判空
  if (param.url.length == 0) {
    return url;
  }
  Object.keys(param.data).forEach((key: string) => {
    url += `&${key}=${param.data[key]}`;
  })
  console.log('[tools.ts-getParamsToUrl()]', url);
  return url;
}