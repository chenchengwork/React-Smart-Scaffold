module.exports = {
    "middlewares": {
        // 收集由babel-plugin-react-intl生成的数据
        "summary": [
            "summary?sourcePattern=i18n-messages/**/*.json"
        ],
        "process": [
            // 获取语言内容,已有的key将跳过翻译
            "fetchLocal?source=locales,skip",

            // 提取元数据中defaultMessage到中文zh
            "metaToResult?from=defaultMessage,to=zh",

            // 用有道自动翻译
            "youdao?apiname=iamatestmanx,apikey=2137553564",

            "reduce?-autoPick,autoReduce[]=local,autoReduce[]=meta"
        ],
        "emit": [
            // 保存文件目录
            "save?dest=locales"
        ]
    }
};
