import { extend } from 'umi-request';
import message from "antd/es/message";

const request = extend({
  prefix: process.env.NODE_ENV === 'production' ? 'http://139.155.241.225:6001/api':'/api',
  errorHandler: async (error) => {
    // 统一处理请求错误
    console.error(error);
    throw error;
  },
});


// 响应拦截器
// @ts-ignore
request.interceptors.response.use(async (response) => {
  const res = await response.clone().json();
  if (res.code === 200) {
    return res;
    // return res.data;
  } else {
    message.error(res.description)
  }

});

export default request;
