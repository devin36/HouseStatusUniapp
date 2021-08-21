import { baseUrlApi } from './api.js'

var Fly = require("flyio/dist/npm/wx")
const fly = new Fly()

fly.config.baseURL =  baseUrlApi
fly.config.headers = {
  "X-Tag": "flyio",
  'content-type': 'application/json',
  'Authorization': '',
  'sign': ""
} //设置你的请求头

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: "加载中",
    mask: true
  });

  return request;
});

// 添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading();
    return response;// 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    console.log(err);
    wx.hideLoading();
    if (err) {
      return "请求失败";
    };
  }
);

export default fly;