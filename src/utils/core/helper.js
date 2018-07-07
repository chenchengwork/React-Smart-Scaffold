/**
 * Created by chencheng on 2017/6/16.
 */
import moment from 'moment';
import _ from 'lodash';
import { render as reactDomRender, unmountComponentAtNode } from 'react-dom';

class Helper {

    /**
	 * 渲染弹出窗Modal
     * @param component //reactElement react组件
     */
	renderModal(component) {
        const domId = 'tj-render-dom';

        let domObject = document.querySelector('#' + domId);
        if(!domObject){
            const el = document.createElement('div');
            el.setAttribute('id', domId);
            document.querySelector('body').appendChild(el);
            domObject = el;
        }

        unmountComponentAtNode(domObject);

        reactDomRender(component, domObject);
	}

    /**
     * 模拟request api数据
     * @param data
     * @param type "success" | "error"
     * @param time 延迟时间
     * @return {Promise<any>}
     */
    simulateData(data, type = 'success', time = 500) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (type === 'success') {
                    resolve({ code: window.ENV.apiSuccessCode, data, msg: "success" })
                }else {
                    reject({code: "error", data, msg: 'error'})
                }
            }, time);
        })
    }

	/**
	 * 跳转页面
	 * @param url
	 * @param timeout
	 */
	redirect(url, timeout) {
		if (_.isNumber(url) && typeof timeout === 'undefined') {
			timeout = url;
			url = null;
		}

		setTimeout(function () {
			location.href = url || location.href;
		}, timeout || 0);
	}

    /**
     * 获取包“immutability-helper”中的update内容
     * @param {String | Array}  keyPath "str1.str2..." //依点分割key 或 [key1,key2]
     * @param {Mixed} value
     * @param {String} updateType //可填写类型：$set,$push,$unshift,$splice,$unset,$merge,$apply
     * @return {{}}
     */
    getImmutabilityHelperContent(keyPath, value, updateType = '$set') {
        let keyArr = Array.isArray(keyPath) ? keyPath : keyPath.split('.');
        let keyLen = keyArr.length;
        let result = {};

        /* eslint no-eval:0 */
        /* eslint no-return-assign:0 */
        const getTmpRes = (keys, val = null) => {
            let res = 'result';
            keys.forEach(key => res += "['" + key + "']");
            res += '={}';
            eval(res);
            return eval(res.replace('={}', ''));
        };


        let usedKeys = [];
        keyArr.forEach((key, index) => {
            const currentLen = index + 1;
            usedKeys.push(key);

            if (currentLen === keyLen) {
                getTmpRes(usedKeys)[updateType] = value;
            } else {
                getTmpRes(usedKeys);
            }
        });

        return result;
    }


    /**
     * 时间格式化
     * @param {Date|number|Moment} date
     * @param {string} template
     * @return {string}
     */
    dateFormat(date = _.now(), template = 'YYYY-MM-DD HH:mm:ss') {
        if (/^(\d+\.)?\d+$/.test(date)) {
            date = parseInt(date);
        }

        return moment(date).format(template);
    }

    /**
     * 回调一个函数,并应用context和一个参数数组
     * @param {function} func 函数
     * @param {?*=} context
     * @param {Array=} args
     * @return {*}
     */
    apply(func, context, args = []) {
		if (_.isFunction(func)) {
			return func.apply(context, args);
		}

		return null;
	}

    /**
     * 回调一个函数,并应用context和一个参数列表
     * @param {function} func 函数
     * @param {?*=} context
     * @param {...*} args
     * @return {*}
     */
    call(func, context, ...args) {
    	return this.apply(func, context, args);
    }

    /**
     * 减速节流函数
     * @param {Function} fn 需要延迟执行的函数
     * @param {Number} time 延迟时间毫秒
     * @param {Object} context
     * @return {wrapperFn}
     *
     * usage:

     const a_fn = (params) => {}
     const render = throttle(a_fn, 16, null);
     render(1);
     render(2); // 将延迟16毫秒执行
     */
    throttle = (fn, time, context) => {
        let lock, args;

        function later () {
            // reset lock and call if queued
            lock = false;
            if (args) {
                wrapperFn.apply(context, args);
                args = false;
            }
        }

        function wrapperFn () {
            if (lock) {
                // called too soon, queue to call later
                args = arguments;

            } else {
                // lock until later then call
                lock = true;
                fn.apply(context, arguments);
                setTimeout(later, time);
            }
        }

        return wrapperFn;
    };


    /**
     * 防抖函数
     * @param {Function} fn     回调函数
     * @param {Number} delay    延迟事件
     * @param {Object} [context]  回调函数上下文
     * @returns {Function}
     */
    debounce = (fn, delay, context) => {
        let timeout;

        return function(e){

            clearTimeout(timeout);

            context = context || this;
            let args = arguments

            timeout = setTimeout(function(){

                fn.apply(context, args);

            },delay)

        };
    };


    /**
     * 将Blod转成String
     * @param {Blob} blob       // Blob对象
     * @param {String} [characterSet]  // 字符集
     * @returns {Promise<any>}
     */
    blobToString = (blob, characterSet = 'utf-8') => new Promise((resolve, reject)=> {
        const reader = new FileReader();
        reader.readAsText(blob, characterSet);
        reader.onload = function (e) {
            resolve(reader.result);
        };

        reader.onerror = (e) => {
            reject(e);
        };
    });

    /**
     * 下载文件
     * @param {String} content 下载内容
     * @param {String} fileName 文件名称
     */
    downloadFile = (content = "", fileName = "") => {
        const blob = new Blob([content]);

        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = fileName;

        document.querySelector('body').appendChild(a);
        a.click();
        document.querySelector('body').removeChild(a)
    }
}

export default new Helper();

