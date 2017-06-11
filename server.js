/**
 * Created by chencheng on 16-11-17.
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./build/webpack.config');
const host = "0.0.0.0";   //主机
const port = 8181;        //端口号

//webpack 自动重新加载，采用inline
config.entry.app.push('webpack-dev-server/client?http://'+host+':'+port+'/')

// 启动服务
const server = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	contentBase: config.output.path,

  watchContentBase:true,

  // 开启服务器的模块热替换(HMR)
	hot: false,

	// 当请求不存在的路由时，直接返回首页
	historyApiFallback: {
		index: '/public/',
		disableDotRule: true,
	},

	stats: {
		colors: true,
	}
});



//将其他路由，全部返回index.html
server.app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});


server.app.route('/config/ENV.js').get( (req, res) => {
	res.sendFile(`${__dirname}/public/config/ENV.js`);
});


server.listen(port,host);


