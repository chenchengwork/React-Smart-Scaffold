/**
 * Created by chencheng on 16-11-17.
 */
const mkWebpackConfig = require("./mkWebpackConfig");
const { doDev, pipe } = require("webpack-pipe");
const webpackConfig = mkWebpackConfig([pipe.development]);

doDev({
	webpackConfig,
    devServerConfig: {},
	host: "localhost",
	port: 8000
});




