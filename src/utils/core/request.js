/**
 * Created by chencheng on 2017/6/14.
 */
import axios from 'axios';
import EnumRouter from '../../constants/EnumRouter';

// 解决IE报warning Unhandled Rejections Error 参数书不正确的问题
Promise._unhandledRejectionFn = function (rejectError) {};

const Singleton = (function () {
	let instantiated;

	function init() {

		return axios.create({
			baseURL: window.ENV.mock.isStart ? window.ENV.mock.apiDomain : window.ENV.apiDomain,

			// `withCredentials`指示是否跨站点访问控制请求
			withCredentials: true,

			// “responseType”表示服务器将响应的数据类型
			// 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
			responseType: 'json',

			// headers`是要发送的自定义 headers
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
 * @param options
 * @return {Promise}
 * @private
 */
const _request = (options = {}) => {
	const successCode = 0;
	const noLoginCode = 'uupm.user.not.login';

	return new Promise((resolve, reject) => {

		Singleton.getInstance().request(options).then((resp) => {

			const { data, code, msg } = resp.data;
			/* eslint prefer-promise-reject-errors:0 */
			if (successCode === code) {
				resolve({ code, data, msg });
			}
			// 判断是否登录
			else if (noLoginCode === code) {
				location.href = EnumRouter.login;

			} else {
				reject({ code, data, msg });
			}

		}).catch((error) => {
			reject({
				code: 'error',
				data: null,
				msg: error.message
			});
		});

	});
};



/**
 * get请求
 * @param {string} url
 * @param {object} params
 * @param {object} options
 * @returns {Promise}
 */
export function get(url, params = {}, options = {}) {
    Object.assign(options, {
        url,
        method: 'get',
        params: params,
    });

	return _request(options);
}

/**
 * post请求
 * @param {string} url
 * @param {object} params
 * @param {object} options
 * @returns {Promise}
 */
export function post(url, params = {}, options = {}) {
    let requestParams = new URLSearchParams();
    for (let [k, v] of Object.entries(params)) {
        requestParams.append(k, v);
    }

    options = Object.assign({
        url,
        method: 'post',
        data: requestParams,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
	}, options);

	return _request(options);
}


/**
 * post json请求
 * @param {string} url
 * @param {object} params
 * @param {object} options
 * @returns {Promise}
 */
export function postJSON(url, params = {}, options = {}) {
    options = Object.assign({
		url,
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    }, options);

	return _request(options);
}


/**
 * 请求上传文件
 * @param {String} url
 * @param {Object} params
 * @param {Function} onUploadProgress
 * @param {Object} options
 * @returns {Promise}
 */
export function upload(url, params = {}, onUploadProgress = (progressEvent) => {}, options = {}) {

	if (!(params instanceof FormData)) {
		let formData = new FormData();
		for (let [k, v] of Object.entries(params)) {
			formData.append(k, v);
		}
		params = formData;
	}

    options = Object.assign({
        url,
        method: 'post',
        data: params,
        onUploadProgress: onUploadProgress,	// 允许处理上传的进度事件

        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }, options);


	return _request(options);
}

/**
 * restful delete
 * @param {String} url
 * @param {Object} params
 * @param {Object} options
 * @returns {Promise}
 */
export function del(url, params = {}, options = {}) {
    options = Object.assign({
        url,
        method: 'delete',
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    }, options);

    return _request(options);
}


/**
 * restful put
 * @param {String} url
 * @param {Object} params
 * @param {Object} options
 * @returns {Promise}
 */
export function put(url, params = {}, options = {}) {
    options = Object.assign({
        url,
        method: 'put',
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    }, options);

    return _request(options);
}


/**
 * 并发执行多个请求
 * @returns {Promise.<*>}
 */
export function all(args = null) {

	return Array.isArray(args) ? Promise.all(args) : Promise.all([...arguments]);
}

/**
 * 格式化URL参数
 * @param url
 * @param params
 * @returns {*}
 */
export function formatUrlParams(url, params = {}) {
	Object.keys(params).forEach((key, index) => {
		if (index === 0) {
			url += '?' + key + '=' + params[key];
		} else {
			url += '&' + key + '=' + params[key];
		}
	});

	return url;
}

