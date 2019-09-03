/**
 * Created by chencheng on 2017/6/16.
 */
import React from 'react'
import * as ReactDOM from 'react-dom';

import * as checkType from './checkType';
const mountDomId = 'tj-render-dom';

/**
 * 验证是否相等
 * 文档说明: https://github.com/ljharb/is-equal
 */
import isEqual from 'is-equal'
export {isEqual}

/**
 * 深度合并对象
 * 文档说明: https://github.com/KyleAMathews/deepmerge
 */
import deepmerge from './deepmerge';
export {deepmerge}
/**
 * 深度clone
 */
import deepClone from './deepClone';
export {deepClone}

/**
 * 模拟数据
 * @param data
 * @param isMockError
 * @return {Promise<any>}
 */
export const mockData = (data: any = null, isMockError = false): Promise<{code: string, data: any, msg: string}> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!isMockError) {
                resolve({
                    code: "success",
                    data,
                    msg: "success"
                })
            } else {
                reject({code: "error", data, msg: "error"});
            }
        }, 500);
    });
};


/**
 * 挂载react组件
 * @param component //reactElement react组件
 */
export const mountReact = (component: React.ReactElement) => {
    const domId = mountDomId;

    let domObject = document.querySelector('#' + domId);
    if(!domObject){
        const el = document.createElement('div');
        el.setAttribute('id', domId);
        document.querySelector('body').appendChild(el);
        domObject = el;
    }

    ReactDOM.unmountComponentAtNode(domObject);

    ReactDOM.render(component, domObject);
};

/**
 * 销毁react组件
 */
export const unmountReact = () => {
    const domObject = document.querySelector('#' + mountDomId);
    if(domObject) ReactDOM.unmountComponentAtNode(domObject);
}


/**
 * 跳转页面
 * @param url
 * @param timeout
 */
export const redirect = (url: string, timeout: number) => {
    setTimeout(function () {
        location.href = url || location.href;
    }, timeout || 0);
};


/**
 * 时间格式化
 * @param {number} timestamp
 * @param {string} fmt
 * @return {string}
 */
export const dateFormat = (timestamp: number|string, fmt = "yyyy-MM-dd hh:mm:ss") => {
    const date = new Date(timestamp);

    const o = {
        "y+": date.getFullYear(),
        "M+": date.getMonth() + 1,                  //月份
        "d+": date.getDate(),                       //日
        "h+": date.getHours(),                      //小时
        "m+": date.getMinutes(),                    //分
        "s+": date.getSeconds(),                    //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S+": date.getMilliseconds()                 //毫秒
    };

    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)){
            if(k == "y+"){
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if(k=="S+"){
                var lens = RegExp.$1.length;
                lens = lens==1?3:lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
            }
            else{
                // @ts-ignore
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }

    return fmt;
};


/**
 * 数组去重
 * @param {Array} data
 * @return {*[]}
 */
export const uniq = <T>(data: T[]): T[] => Array.from(new Set(data));


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
export const throttle = (fn: Function, time: number, context: any) => {
    let lock: boolean, args: boolean | IArguments;

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
 * @param {Number} delay    延迟时间
 * @param {Object} [context]  回调函数上下文
 * @returns {Function}
 */
export const debounce = (fn: Function, delay: number, context: any) => {
    let timeout: any;

    return function(){

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
export const blobToString = (blob: Blob, characterSet: string = 'utf-8') => new Promise((resolve, reject)=> {
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
export const downloadFile = (content: string = "", fileName: string = "") => {
    const blob = new Blob([content]);

    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;

    document.querySelector('body').appendChild(a);
    a.click();
    document.querySelector('body').removeChild(a)
};


