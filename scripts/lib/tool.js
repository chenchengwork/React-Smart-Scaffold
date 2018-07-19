/**
 * 工具方法
 */

const fs = require('fs');
const os = require('os');

/**
 * 递归删除目录
 * @param path
 */
exports.delDir = (path) => {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach((file) => {
            const curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                exports.delDir(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });

        fs.rmdirSync(path);
    }
};

/**
 * copy文件到目录
 * @param srcFileName
 * @param distPath
 * @param distFileName
 * @param callback
 */
exports.copyFileToDir = (srcFileName, distPath,distFileName, callback = () =>{}) => {
    fs.exists(distPath, function(exists) {
        //目录不存在创建目录
        if(!exists) {
            fs.mkdirSync(distPath);
        }

        fs.writeFileSync(distPath + '/' + distFileName, fs.readFileSync(srcFileName));

        callback();
    });

};

/**
 * 目录或文件是否存在
 * @type {Promise<boolean>}
 */
exports.access = (path, mode) => new Promise(resolve => fs.access(path, mode, err => !err ? resolve(true) : resolve(false)))


/**
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 * @param callback
 */
exports.copyDir = (src, dist, callback = () =>{}) => {
    fs.access(dist, function(err){
        if(err){
            // 目录不存在时创建目录
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if(err){
            callback(err);
        } else {
            fs.readdir(src, function(err, paths) {
                if(err){
                    callback(err)
                } else {
                    paths.forEach(function(path) {
                        const _src = src + '/' +path;
                        const _dist = dist + '/' +path;
                        fs.stat(_src, function(err, stat) {
                            if(err){
                                callback(err);
                            } else {
                                // 判断是文件还是目录
                                if(stat.isFile()) {
                                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                                } else if(stat.isDirectory()) {
                                    // 当是目录是，递归复制
                                    exports.copyDir(_src, _dist, callback)
                                }
                            }
                        })
                    })
                }
            })
        }
    }
};

/**
 * 验证是否是错误
 * @param value
 * @returns {boolean}
 */
exports.isError = (value) => {
    switch (Object.prototype.toString.call(value)) {
        case '[object Error]': return true;
        case '[object Exception]': return true;
        case '[object DOMException]': return true;
        default: return value instanceof Error;
    }
}

/**
 * 清除右侧斜线
 * @param {String} str
 * @returns {*}
 */
exports.rtrimSlash = (str) => str.replace(/\/$/g, '');

/**
 * 格式化时间戳
 * @param {Number} timestamp 时间戳
 * @param {String} fmt       格式
 * @returns {string}
 * usage:
 *  console.log(dateFormat(Date.now(), "yyyy年MM月dd日 hh:mm:ss.S")); //输出: 2016年04月01日 10:41:08.133
    console.log(dateFormat(Date.now(), "yyyy-MM-dd hh:mm:ss")); //输出: 2016-04-01 10:41:08
    console.log(dateFormat(Date.now(), "yy-MM-dd hh:mm:ss")); //输出: 16-04-01 10:41:08
    console.log(dateFormat(Date.now(), "yy-M-d hh:mm:ss")); //输出: 16-4-1 10:41:08
 */
exports.dateFormat = (timestamp = Date.now(), fmt = "yyyy-MM-dd hh:mm:ss") => {
    const date = new Date(timestamp);

    const o = {
        "y+": date.getFullYear(),                       // 年份
        "M+": date.getMonth() + 1,                      // 月份
        "d+": date.getDate(),                           // 日
        "h+": date.getHours(),                          // 小时
        "m+": date.getMinutes(),                        // 分
        "s+": date.getSeconds(),                        // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3),    // 季度
        "S+": date.getMilliseconds()                    // 毫秒
    };

    for (let k in o) {
        if (o.hasOwnProperty(k) && new RegExp("(" + k + ")").test(fmt)){
            if(k == "y+"){
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if(k == "S+"){
                let lens = RegExp.$1.length;
                lens = lens==1 ? 3: lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
            }
            else{
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }

    return fmt;
};

/**
 * 获取本机ip地址
 * @return {*}
 */
exports.getLocalIP = () => {
    let interfaces = os.networkInterfaces();
    const interfacesValues = Object.values(interfaces);
    for (let i = 0; i < interfacesValues.length; i++){
        let iface = interfacesValues[i];
        for (let j = 0; j < iface.length; j++) {
            let alias = iface[j];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }

    return null;
};
