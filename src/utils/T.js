/**
 * Created by chencheng on 2017/6/15.
 */

import {get,post,postJSON,upload,all} from './core/request'

import {setStorage,getStorage,clearStorage,keepStorage,removeStorage} from './core/storage'

import lodash from 'lodash'

import cookies from 'js-cookie'


/**
 *
 * @type {{request: {get: get, post: post, postJSON: postJSON, upload: upload, all: all}, storage: {setStorage: setStorage, getStorage: getStorage, clearStorage: clearStorage, keepStorage: keepStorage, removeStorage: removeStorage}, lodash, cookies}}
 */
const T = {
	request:{get,post,postJSON,upload,all},

	storage:{setStorage,getStorage,clearStorage,keepStorage,removeStorage},

	//说明文档:http://www.css88.com/doc/lodash/
	lodash:lodash,

	//说明文档:https://github.com/js-cookie/js-cookie
	cookies:cookies,
}

export default T;

