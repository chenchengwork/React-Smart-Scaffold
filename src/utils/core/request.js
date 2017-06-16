/**
 * Created by chencheng on 2017/6/14.
 */

import axios from 'axios'

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
				'X-Requested-With': 'XMLHttpRequest'
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
const _request = (method,url,params)=>{
	const successCode = 'success';

	let options = {
		url:url,
	};

	switch (method){
		case requestMethod.get:
			Object.assign(options,{
				method:'get',
				params:params,
			})

			break;

		case requestMethod.post:
			Object.assign(options,{
				method:'post',
				data:params,
			})

			break;

		case requestMethod.postJSON:
			Object.assign(options,{
				method:'post',
				headers:{
					contentType: 'application/json, text/javascript'
				}
			})
			break;

		case requestMethod.upload:

			Object.assign(options,{
				headers:{
					contentType:'multipart/form-data'
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
 * @returns {Promise}
 */
export function get(url,params){

	return _request(requestMethod.get,url,params);
}

/**
 * post请求
 * @param {string} url
 * @param {object} params
 * @returns {Promise}
 */
export function post(url,params){
	return _request(requestMethod.post,url,params);
}


/**
 * post json请求
 * @param {string} url
 * @param {object} params
 * @returns {Promise}
 */
export function postJSON(url,params){
	return _request(requestMethod.postJSON,url,params);
}


/**
 * 请求上传文件
 * @param {string} url
 * @param {object} params
 * @returns {Promise}
 */
export function upload(url,params){

	if(!(params instanceof FormData)){
		let formData = new FormData();
		for(let [k,v] of Object.entries(params)){
			formData.append(k,v);
		}

		params = formData
	}

	return _request(requestMethod.upload,url,params);
}


/**
 * 并发执行多个请求
 * @returns {Promise.<*>}
 */
export function all() {
	return Promise.all([...arguments]);
}



