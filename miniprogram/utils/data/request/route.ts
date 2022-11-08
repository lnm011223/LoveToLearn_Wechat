import isValidKey from "../../isValidKey";

export function getInterfaceRoute(name: string) {
  if(isValidKey(name, interfaceRoute)) {
    return interfaceRoute[name];
  }
  else {
    throw console.error();
  }
}
const URL1 = {
  develop: 'https://sanli-tracks.com/sanlia',
  product: 'https://sanli-tracks.com/sanli',
  local: 'http://127.0.0.1/LoveToLearn_Server',
}
export const url = URL1.local;

// 开发环境
const ENV = url + '/index.php?r=';
// 选择环境
const DOMAIN = ENV;

// 接口地址
const interfaceRoute = {
  // UpdateUserInfo: DOMAIN + 'WxUser/UpdateUserInfo',
  Register: DOMAIN + 'WxUser/Register',
  getOpenId: DOMAIN + 'WxUser/getOpenId',
  GetUserInfo: DOMAIN + 'WxUser/GetUserInfo',
  GetUserInfo2: DOMAIN + 'WxUser/GetUserInfo2',
  GetQuestionList: DOMAIN + 'WxUser/GetQuestionList',
  GetQuestionDetail: DOMAIN + 'WxUser/GetQuestionDetail',
}
export const CURRENT_DOMAIN = DOMAIN; // 当前服务器URL