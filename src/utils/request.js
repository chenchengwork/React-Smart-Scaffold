/**
 * @description API请求
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

/**
 * @module request
 */
/**
 * @callback AjaxPromiseResponseCallback
 * @param {Response} 响应对象
 */

/**
 * @function AjaxPromise~then
 * @param {AjaxPromiseResponseCallback} 请求成功的回调函数
 * @param {AjaxPromiseResponseCallback=} 请求失败的回调函数
 * @return {AjaxPromise}
 */
/**
 * @function AjaxPromise~done
 * @param {AjaxPromiseResponseCallback} 请求成功的回调函数
 * @return {AjaxPromise}
 */

/**
 * @function AjaxPromise~fail
 * @param {AjaxPromiseResponseCallback} 请求失败的回调函数
 * @return {AjaxPromise}
 */

/**
 * @function AjaxPromise~always
 * @param {AjaxPromiseResponseCallback} 请求完成的回调函数
 * @return {AjaxPromise}
 */

/**
 * @function AjaxPromise~promise
 * @return {AjaxPromise}
 */

/**
 * @typedef {Object} AjaxDeferred
 */
/**
 * @function AjaxDeferred~resolve
 * @param {Response} 响应对象
 * @return {AjaxDeferred}
 */

/**
 * @function AjaxDeferred~reject
 * @param {Response} 响应对象
 * @return {AjaxDeferred}
 */

/**
 * @function AjaxDeferred~notify
 * @param {number} 上传进度
 * @param {boolean} 是否上传完成
 * @param {ProgressEvent} 上传进度事件
 * @return {AjaxDeferred}
 */

/**
 * @function AjaxDeferred~promise
 * @param {Object=} 要扩展的promise对象
 * @return {AjaxPromise}
 */

/**
 * @callback AjaxOptions~beforeSend
 * @param {XMLHttpRequest} XHR对象
 */

/**
 * @typedef {Object} AjaxOptions
 * @property type {string=} HTTP方法
 * @property method {string=} HTTP方法
 * @property async {boolean=false} 是否异步
 * @property cache {boolean=}
 * @property processData {boolean=}
 * @property timeout {number=}
 * @property username {string=}
 * @property password {string=}
 * @property beforeSend {AjaxOptions~beforeSend}
 * @property headers {Object=}
 */

/**
 * 服务器响应内容
 * @typedef {Object} XMLHttpResult
 * @property code {number}
 * @property message {string}
 * @property data {*}
 */

/**
 * @typedef {function} requester
 * @param {string} url
 * @param {Object=} data
 * @param {AjaxOptions=} AJAX选项
 * @return {AjaxPromise}
 */

// TODO 非静默模式的错误处理
// import jQuery from 'jquery';
// import layer from '../vendor/layer';

// import { defaultsDeep, defaults, isArray, isObject, isPlainObject, isArrayLike, each, createDeferred } from './helper';
import { clearLogin } from './auth';

/**
 * 默认数据过滤器
 * @param data
 */
const defFilter = data => data;

/**
 * 获取一个支持上传进度回调的XHR
 * @param {function} callback
 * @return {XMLHttpRequest}
 */
const getProgressCallback = callback => () => {

    /**
     * @type XMLHttpRequest
     */
    const xhr = jQuery.ajaxSettings.xhr();

    if (xhr.upload) {

        // 绑定progress事件
        xhr.upload.addEventListener('progress', (event) => {

            if (event.lengthComputable) {

                const percent = Math.max(0, Math.min(event.loaded / event.total, 1));
                // 回调
                callback(percent, percent === 1, event);

            }

        }, false);

    }

    return xhr;

};

export class Response {

    static successCode = 'success';

    /**
     * @param {XMLHttpRequest} xhr XHR对象
     * @param {XMLHttpResult} result 服务器返回的响应结果对象
     * @param {function} filter 数据过滤器
     * @return {Response}
     */
    constructor(xhr, result, filter) {

        const self = this;

        /**
         * HTTP状态消息
         * @type {string}
         */
        self.statusText = xhr.statusText || 'error';

        /**
         * 服务器响应的原始内容
         * @type {string}
         */
        self.content = xhr.responseText;

        /**
         * 服务器响应内容
         * @type {XMLHttpResult}
         */
        self.result = result;

        /**
         * HTTP状态码
         * @type {number}
         */
        self.status = xhr.status;

        /**
         * jQuery的XHR对象
         * @type {XMLHttpRequest}
         */
        self.xhr = xhr;

        /**
         * 服务器响应的数据
         * @type {*}
         */
        self.data = null;

        /**
         * 服务器响应的消息
         * @type {string}
         */
        self.message = null;

        /**
         * 服务器响应的代码
         * @type {number}
         */
        self.code = 0;

        if (self.isHttpSuccess() && !jQuery.isEmptyObject(self.result) && self.result.code) {

            self.message = self.result.msg || null;

            self.code = self.result.code || 0;

            if (self.isSuccess()) {
                self.data = filter(self.result.data, self) || null;
            }

        }


    }

    /**
     * 获取XHR
     * @return {Object}
     */
    getXHR() {

        return this.xhr;

    }

    /**
     * 获取所有响应header头消息
     * @return {Object}
     */
    getHeaders() {

        return this.xhr.getAllResponseHeaders();

    }

    /**
     * 根据name获取响应header头消息
     * @param {string} name header名
     * @return {?string}
     */
    getHeader(name) {

        return this.xhr.getResponseHeader(name);

    }

    /**
     * 获取HTTP状态码
     * @return {number}
     */
    getStatus() {

        return this.status;

    }

    /**
     * 获取HTTP状态消息
     * @return {string}
     */
    getStatusText() {

        return this.statusText;

    }

    /**
     * 获取原始的响应内容(未格式化)
     * @return {string}
     */
    getContent() {

        return this.content;

    }

    /**
     * 获取服务器响应内容
     * @return {XMLHttpResult}
     */
    getResult() {

        return this.result;

    }

    /**
     * HTTP请求是否成功
     * @return {boolean}
     */
    isHttpSuccess() {

        return this.status === 200;

    }

    /**
     * HTTP请求是否发生错误
     * @return {boolean}
     */
    isHttpError() {

        return !this.isHttpSuccess();

    }

    /**
     * 请求成功,并且服务器处理成功
     * @return {boolean}
     */
    isSuccess() {

        return this.isHttpSuccess() && this.code === Response.successCode;

    }

    /**
     * 请求不成功或者服务器处理不成功
     * @return {boolean}
     */
    isError() {

        return !this.isSuccess();

    }

    /**
     * 获取数据
     * @return {*}
     */
    getData() {

        return this.data;

    }

    /**
     * 响应结果是否包含数据
     * @return {boolean}
     */
    hasData() {

        return !jQuery.isEmptyObject(this.getData());

    }

    /**
     * 是否有消息
     * @return {boolean}
     */
    hasMessage() {

        return this.message !== null;

    }

    /**
     * 获取服务器返回的消息
     *
     * @return Response
     */
    getMessage() {

        return this.message || '';

    }

    /**
     * 获取错误消息
     * @return {string}
     */
    getError() {

        return this.hasMessage() ? this.getMessage() : this.getStatusText();

    }
}


/**
 * 发起HTTP请求
 * @param {string} url 请求地址
 * @param {AjaxOptions=} options AJAX选项
 * @return {AjaxPromise}
 */
const request = (url, options = {}) => {

    /**
     * @type {AjaxDeferred}
     */
    const deferred = createDeferred();

    /**
     * 是否静默处理(遇到错误直接忽略)
     * @type {boolean}
     */
    let silence = false;

    /**
     * 数据过滤器
     * @type {function}
     */
    let filter = defFilter;

    const params = defaults(options, {
        type: 'GET',
        dataType: 'json',
        xhrFields: {
            // 允许不同源的ajax带有cookie信息
            withCredentials: true
        },
        // IE部分浏览器和safari需要设置此选项才能跨域请求携带cookie
        crossDomain: true,
        xhr: getProgressCallback((...args) => deferred.notify(...args))
    });

    // 发起请求
    const ajax = jQuery.ajax(url, params).always((result, statusText, xhr) => {

        /* eslint-disable  no-param-reassign  */
        if (statusText !== 'success') {

            xhr = result;
            result = null;

            xhr.statusText = statusText;
        }
        /* eslint-enable  no-param-reassign  */

        /**
         * 请求失败时, 返回的顺序是xhr,statusText
         * @type {Response}
         */
        const response = new Response(xhr, result, filter);

        if (response.isSuccess()) {
            // const loginInfo = response.getHeader('__LOGIN_INFO__');
            //
            // if (!isNull(loginInfo) && !isEmpty(loginInfo) && loginInfo !== 'null') {
            //     LocalStore.setItem('__LOGIN_INFO__', JSON.parse(loginInfo), 24 * 7 * 3600);
            // }

            deferred.resolve(response);

            // 未登录
        } else if (response.code === 'cwopNotLoginError') {
            // 清除本地登录状态
            clearLogin();

            if (silence !== true) {
                location.href = '/login';
            }
        } else {

            // 非静默模式
            if (silence !== true && response.getStatusText() !== 'abort') {

                // 错误提示
                // TODO 弹窗提示错误
                layer.alert(response.getError(), { title: '抱歉,发生错误' });
                console.groupCollapsed(`Ajax请求错误:${response.getError()}`);
                console.log(`Method:${params.type || params.method || 'GET'}`);
                console.log(`URL:${url}`);
                console.log('响应内容:');
                console.error(response.getContent());
                console.log('响应实例', response);
                console.groupEnd();

            }

            deferred.reject(response);

        }

    });

    return deferred.promise(/** @lends {AjaxPromise} */{

        /**
         * 是否正在请求中
         * @return {boolean}
         */
        isPending() {

            return deferred.state() === 'pending';
        },
        /**
         * 开启/关闭静默模式
         * @function AjaxPromise~silence
         * @param {boolean=} force 强制开启或关闭
         * @return {AjaxPromise}
         */
        silence(force = true) {

            silence = force;

            return this;

        },

        /**
         * 设置数据过滤器
         * @function AjaxPromise~filter
         * @param {function} dataFilter 数据过滤器
         * @return {AjaxPromise}
         */
        filter(dataFilter = defFilter) {

            filter = dataFilter;

            return this;

        },
        /**
         * 终止请求
         * @function AjaxPromise~abort
         * @param {string=} statusText 状态消息
         * @return {AjaxPromise}
         */
        abort(statusText) {

            ajax.abort(statusText);

            return this;

        }
    });

};

/**
 * 创建一个请求函数
 * @param {string} type HTTP请求方法
 * @param {AjaxOptions=} setting AJAX默认设置
 * @param {function=} callback AJAX选项的回调函数
 * @return {requester}
 */
export const make = (type, setting = {}, callback = opts => opts) =>
    (url, data = {}, options = {}) => request(url, callback(defaultsDeep({ type, data }, options, setting)));

/**
 * 发起一个GET请求
 * @type {requester}
 * @return {AjaxPromise}
 */
export const get = make('GET');

/**
 * 发起一个POST请求
 * @type {requester}
 * @return {AjaxPromise}
 */
export const post = make('POST');

/**
 * 发起一个POST请求,发送的数据是JSON格式
 * @type {requester}
 * @return {AjaxPromise}
 */
export const postJSON = make('POST', {
    contentType: 'application/json, text/javascript',
    processData: false
}, (options = {}) => {

    let data = options.data;

    data = (isPlainObject(data) || isArrayLike(data)) ? JSON.stringify(data) : data;

    return defaults({ data }, options);

});

/**
 * 发起一个上传文件的请求
 * @type {requester}
 * @return {AjaxPromise}
 */
export const upload = make('POST', { contentType: false, processData: false }, (options = {}) => {

    // 创建一个formData,利用formData改变contentType
    const form = new FormData();

    each(options.data || {}, (value, key) => {

        form.append(key, value);

    });

    return defaults({ data: form }, options);

});

/**
 * 发送一个form请求
 * @param {string} url
 * @param {Object<string|number>} args
 * @param {Object} opt
 */
export const formRequest = (url, args = {}, opt = {}) => {
    const options = defaults(opt, {
        method: 'POST',
        target: '_blank',
        submit: true
    });

    const $form = jQuery('<form></form>').hide().appendTo('body').attr({
        action: url,
        method: options.method,
        target: options.target
    });

    each(args, (value, key) => {
        let newValue = value;
        if (isArray(value) || isObject(value)) {
            newValue = JSON.stringify(value);
        }
        $form.append(`<input type="hidden" name="${key}" value="${encodeURIComponent(newValue)}"/>`);
    });

    if (options.submit) {
        $form.submit();
    }

    return $form;
};

/**
 * @type {jQuery.when}
 * @return {AjaxPromise}
 */
export const all = jQuery.when;

export default request;
