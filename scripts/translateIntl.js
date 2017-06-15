/**
 * Created by chencheng on 16-7-12.
 */
import * as fs from 'fs';
import {sync as globSync} from 'glob';
import {sync as mkdirpSync} from 'mkdirp';

import crypto from 'crypto'
import reqSyc from 'urllib-sync'
import urlencode from 'urlencode'


const MESSAGES_PATTERN = './i18n-messages/**/*.json';
const LANG_PATTERN = './src/lang/*.js';
const LANG_DIR = './src/lang/';

const lang = {
	"zh":"zh",
	"en":"en",
}

/**
 * 目前系统中的语言包
 * @type {{zh: {}, en: {}}}
 */
const originLangs = {
	zh: {},
	en: {},
};


/**
 * md5算法
 * @param param
 * @returns {*}
 * @private
 */
function _MD5(param){

	const md5 = crypto.createHash('md5');

	md5.update(param);

	return md5.digest('hex')
}

/**
 * 有道翻译方法
 * @param word
 * @returns {{status: boolean, dstWord: string}}
 */
function youdaoTranslateZhToEn(word){

	const url = 'http://fanyi.youdao.com/openapi.do?' +
		'keyfrom=tianjishuju' +
		'&key=460765322' +
		'&type=data' +
		'&doctype=json' +
		'&version=1.1' +
		'&q='+urlencode(word);

	let result = {
		status:true,
		dstWord:'',
	};

	try {
		const resp = reqSyc.request(url);
		result.dstWord = JSON.parse(resp.data).basic.explains[0];

	}catch (e){
		result.status = false;
		result.dstWord = '';
	}

	return result;
}

/**
 * 百度翻译方法
 * @param word
 * @returns {{status: boolean, dstWord: string}}
 */
function baiduTranslateZhToEn(word){

	const appid = '20161208000033638';
	const key = 'xBHh9D12J30YfyjY3hoD';
	const salt = (new Date).getTime();
	const query = word.toString();
	// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
	const from = 'zh';
	const to = 'en';
	const str1 = appid + query + salt +key;
	const sign = _MD5(str1);

	const params ='q='+urlencode(query) +
		'&appid='+appid+
		'&salt=' +salt+
		'&from=' +from+
		'&to=' +to+
		'&sign=' +sign;

	const url = 'http://api.fanyi.baidu.com/api/trans/vip/translate?' +params

	let result = {
		status:true,
		dstWord:'',
	}

	try {
		const resp = reqSyc.request(url);
		const trans_result = JSON.parse(resp.data).trans_result;
		result.dstWord = trans_result[0].dst;

	}catch (e){

		result.status = false;
		result.dstWord = '';
	}

	return result;
}


/**
 * 1.提取待处理的国际化语言
 */
const defaultMessages = globSync(MESSAGES_PATTERN)
    .map((filename) => {
        return fs.readFileSync(filename, 'utf8')
    })
    .map((file) =>{
        return JSON.parse(file)
    })
    .reduce((collection, descriptors) => {

        descriptors.forEach(({id, defaultMessage}) => {
            if (collection.hasOwnProperty(id)) {
                throw new Error(`Duplicate message id: ${id}`);
            }

            collection[id] = defaultMessage;
        });

        return collection;
    }, {});


/**
 * 2.将原始的国际化数据放入到变量中
 */
globSync(LANG_PATTERN)
    .map((filename) => {
        const key = filename.split('/').pop().split('.').shift();
        originLangs[key] = require('../' + filename);
    });


// 更新语言包
// 以编译出来的 key 为准，以默认语言为中文语言包
const defaultMessagesArr = Object.keys(defaultMessages).map((id) => [id, defaultMessages[id]]);
const newLangs = {};
let translateFail = {};
newLangs.zh = defaultMessages;
newLangs.en = defaultMessagesArr.reduce((collection, [id,msg]) => {

    collection[id] = originLangs.en[id] || '';

    if(collection[id] == ''){

        var translateResult = baiduTranslateZhToEn(msg);
        if(translateResult.status){
            collection[id] = translateResult.dstWord;
        }else{
            translateFail[id] = msg;
        }

    }

    return collection;

}, {});

/**
 * 创建国际化目录
 */
mkdirpSync(LANG_DIR);

fs.writeFileSync(LANG_DIR + 'en.js',
    `module.exports = ` +
    JSON.stringify(newLangs.en, null, 2)
);

fs.writeFileSync(LANG_DIR + 'zh.js',
    `// 该文件由脚本自动生成，请勿修改\n
module.exports = ` +
    JSON.stringify(newLangs.zh, null, 2)
);

//自动翻译存在错误，将其记录到错误文件中
if(Object.keys(translateFail).length > 0){
    fs.writeFileSync(LANG_DIR + 'translateFail.js',
        `// 该文件由脚本自动生成，记录自动翻译过程中翻译失败的id\n
module.exports = ` +
        JSON.stringify(translateFail, null, 2)
    );
}
