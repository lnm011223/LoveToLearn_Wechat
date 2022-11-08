/**
 * @interface request请求接口
 */
interface Parameter {
  method: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined,
  url: string,
  data: {
    id?: string,
    [key: string]: string | number | undefined,
  },
  header?: any,
  [key: string]: boolean | object | string | undefined,
};
/**
 * @interface GetUserInfo接口
 */
interface UserInfo {
  name: string,
  phone: string,
  idNum: string,
  id_flag: "student" | "teacher" | "parent" | string,
  [key: string]: string,
}
/**
 * @interface getOpenId接口
 */
interface OpenId {
  code: string,
  [key: string]: string,
}

export {
  Parameter,
  UserInfo,
  OpenId,
}