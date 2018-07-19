/**
 * Created by chencheng on 16-11-17.
 */
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

const paths = require('./config/paths');
const tool = require('./lib/tool');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config/webpack.config');
const host = true ? 'localhost' : tool.getLocalIP();
const port = 8000;        		// 端口号

// webpack 自动重新加载，采用inline
Object.keys(config.entry).forEach(key => {
    config.entry[key].push('webpack-dev-server/client?http://' + host + ':' + port + '/')
});

// 启动服务
const server = new WebpackDevServer(webpack(config), {
	publicPath: paths.webpackPublicPath,

	// 指定服务器内容指定目录
	contentBase: paths.webContentPath,

  	watchContentBase: true,

    // 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用,这个选项可以排除一些巨大的文件夹
    watchOptions: {
        ignored: /node_modules/
    },

  	// 开启服务器的模块热替换(HMR)
	hot: false,

	// 当请求不存在的路由时，直接返回首页
	historyApiFallback: {
		index: '/public/',
		disableDotRule: true,
	},

	stats: {
		colors: true,
	},
    proxy: {}
});

// 将其他路由，全部返回index.html
server.app.get('*', (req, res) => {
    res.sendFile(`${paths.webContentPath}/index.html`);
});

console.log('http://' + host + ':' + port);

server.listen(port, host);

