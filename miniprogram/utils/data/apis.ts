import { OpenId } from './request/interface';
import {$axios, request } from './request/request';

export {
  // GetClubNews, // 获取活动推送
  GetUserInfo, // 获取用户信息
  AutoGetUserInfo, // 无感认证获取用户信息
  GetOpenId, // 获取OPENID
  SignUp, // 注册
  // UpdateUserInfo, // 更新用户信息
  GetQuestionList, //获取题库
  GetQuestionDetail,//获取题目详情
}
/**
 * @function 获取题库
 */
const GetQuestionList = async (data: {key: string, data: string}) => {
  return $axios({
    url: 'GetQuestionList',
    method: 'GET',
    data: data,
  })
}
/**
 * @function 获取题目详情
 */
const GetQuestionDetail = async (data: {author: string, book_name: string, question_type: string, section: string, test_type: string}) => {
  return $axios({
    url: 'GetQuestionDetail',
    method: 'GET',
    data: data,
  })
}

/**
 * @function 获取用户信息
 */
const GetUserInfo = async (data: {key: string, data: string}) => {
  return $axios({
    url: 'GetUserInfo',
    method: 'GET',
    data: data,
  })
}
/**
 * @function 无感认证获取用户信息
 * @param data 
 */
const AutoGetUserInfo = async (data: {openid: string, id_flag: string}) => {
  return $axios({
    url: 'GetUserInfo2',
    method: 'GET',
    data: data
  })
}

/**
 * @function 获取openid 
 */
const GetOpenId = (data: OpenId) => {
  return new Promise((resolve, reject) => { 
    $axios({
      method: 'GET',
      url: 'getOpenId',
      data: data,
    })
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    })
  })
}
// /**
//  * @function 保存更改信息
//  */
// const UpdateUserInfo = async (data: {modelData: any, modelName: string, id: string}) => {
//   return request({
//     url: 'UpdateUserInfo',
//     method: 'GET',
//     data: {
//       modelName: data.modelName,
//       [data.modelName]: data.modelData,
//       id: data.id,
//     },
//   })
// }
/**
 * @function 注册
 */
const SignUp = async (data: {key: string, modelName: string, data: string}) => {
  return $axios({
    url: 'Register',
    method: 'GET',
    data: {
      modelName: data.modelName,
      key: data.key,
      data: data.data,
    }
  })
}