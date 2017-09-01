/**
 * Created by chencheng on 2017/6/14.
 */

import axios from 'axios'
import EnumRouter from '../../constants/EnumRouter';

//解决IE报warning Unhandled Rejections Error 参数书不正确的问题
Promise._unhandledRejectionFn = function (rejectError) {}

const requestMethod = {
	get:'get',
	post:'post',
	postJSON:'postJSON',
	upload:'upload'
}

const Singleton = (function () {
	let instantiated;

	function init() {

		return axios.create({
			baseURL:ENV.mock.isStart ? ENV.mock.apiDomain : ENV.apiDomain,

			// `withCredentials`指示是否跨站点访问控制请求
			withCredentials: true,

			// “responseType”表示服务器将响应的数据类型
			// 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
			responseType: 'json',

			//headers`是要发送的自定义 headers
			headers: {
				// 'X-Requested-With': 'XMLHttpRequest'
			},

		});
	}

	return {
		getInstance: function () {

			if (!instantiated) {
				instantiated = init();
			}

			return instantiated;
		}
	};
})();


/**
 *
 * @param method
 * @param url
 * @param params
 * @returns {Promise}
 * @private
 */
const _request = (method,url,params,options ={})=>{
	const successCode = 'success';
	const noLoginCode = 'uupm.user.not.login';

	Object.assign(options,{
        url:url,
	});
	switch (method){
		case requestMethod.get:
			Object.assign(options,{
				method:'get',
				params:params,
			})

			break;

		case requestMethod.post:
			let requestParams = new URLSearchParams();
			for(let [k,v] of Object.entries(params)) {
				requestParams.append(k, v);
			}

			Object.assign(options,{
				method:'post',
				data:requestParams,
				headers:{
					"Content-Type":'application/x-www-form-urlencoded'
				}
			})

			break;

		case requestMethod.postJSON:
			Object.assign(options,{
				method:'post',
				data:JSON.stringify(params),
				headers:{
					"Content-Type": 'application/json, text/plain'
				}
			})
			break;

		case requestMethod.upload:

			Object.assign(options,{
				method:'post',
				data:params,
				headers:{
					"Content-Type":'multipart/form-data'
				},

				// `onUploadProgress`允许处理上传的进度事件
				onUploadProgress:  (progressEvent) => {
					console.log(progressEvent)
				},

			})

		default:
			break;
	}

	return new Promise((resolve,reject)=>{

		Singleton.getInstance().request(options).then((resp)=>{

			const {data,code,msg} = resp.data;

			if(successCode === code){
				resolve({code,data,msg})
			}
			//判断是否登录
			else if(noLoginCode == code){
				location.href = EnumRouter.login;

			}else{
				reject({code,data,msg})
			}

		}).catch((error)=>{
			reject({
				code:"error",
				data:null,
				msg:error.message
			})
		})

	})
}



/**
 * get请求
 * @param {string} url
 * @param {object} params
 * @param {object} options
 * @returns {Promise}
 */
export function get(url,params,options){

	return _request(requestMethod.get,url,params,options);
}

/**
 * post请求
 * @param {string} url
 * @param {object} params
 * @param {object} options
 * @returns {Promise}
 */
export function post(url,params,options){
	return _request(requestMethod.post,url,params,options);
}


/**
 * post json请求
 * @param {string} url
 * @param {object} params
 * @param {object} options
 * @returns {Promise}
 */
export function postJSON(url,params,options){
	return _request(requestMethod.postJSON,url,params,options);
}


/**
 * 请求上传文件
 * @param {string} url
 * @param {object} params
 * @param {object} options
 * @returns {Promise}
 */
export function upload(url,params,options){
	if(!(params instanceof FormData)){
		let formData = new FormData();
		for(let [k,v] of Object.entries(params)){
			formData.append(k,v);
		}

		params = formData
	}

	return _request(requestMethod.upload,url,params,options);
}


/**
 * 并发执行多个请求
 * @returns {Promise.<*>}
 */
export function all() {
	return Promise.all([...arguments]);
}


/**
 * 给数据附带上appId
 * @param data
 * @returns {*|{}}
 */
export function withAppId(data) {
	data = data || {};

	//TODO 注意应为app的概念在平台中没有启用，所以暂时将appId先取固定值
	//data.appId = 1;

	return data;
}



