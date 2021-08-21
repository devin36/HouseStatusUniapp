import { baseUrlApi } from '../api.js'
import fly from '../fly.js'

export default {
 // 登录
  wxLogin: (data) =>
    fly.post(`/store-miniApp-web/external/interface/wechat/wxLogin`, data, { baseURL: baseUrlApi }),
 // 获得房态信息
 // houseStatusList: (dateRange, md5Stamp) =>
 //  fly.get(`/pages/table/table2?date=${date}&time=${time}`,
 //   null, {
 //    baseURL: baseUrlApi
 //   }),
// 获得房态信息   
 houseStatusList: (data) =>
   fly.post(`/hotel/QueryRoomStatus`, data,{ baseURL: baseUrlApi }),
}

