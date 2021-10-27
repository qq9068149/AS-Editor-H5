/**请求路径
 * 
 */
import { post, get } from '@/request/request'


export default {
	// instance 
		
		/* 
			params：{
					roomId: 房间id,
			}
		*/
	// login: params => {
	// 	return post('apizb/zb_people/login.x', params)
	// },
	login: params => {
			return post('apizb/zb_people/login.x', params)
		},
	
	// 登录
	// login: params => {
	// 	return axios.post('apizb/zb_people/login.x', params)
	// },

	// 用户信息
	userInfo: params => {
		return axios.post('apizb/zb_people/info', params)
	},

	// 直播信息
	liveSetting: params => {
		return axios.post('apizb/zb_room/setting', params)
	},

	// 设置房间参数
	setLiveInfo: params => {
		return axios.post('apizb/zb_room/setting', params)
	},



	/*********************************************助教端******************************************************/

	// 登录
	loginAssistant: params => {
		return axios.post('/apizb/zb_assistant/login.x', params)
	},





	/*********************************************直播流******************************************************/

	// 开始屏幕录制
	startRecord: params => {
		/* 
			params：{
					roomId: 房间id,
					mainVIdeoUserId: 讲师id（直播者id）
			}
		*/
		return axios.post('/apizb/zb_room/startRecord', params)
	},

	// 停止屏幕录制
	stopRecord: params => {
		/* 
			params：{
					roomId: 房间id,
			}
		*/
		return axios.post('/apizb/zb_room/shopRecord', params)
	},



}