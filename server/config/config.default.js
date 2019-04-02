/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553857639304_7916';

  // add your middleware config here
  config.middleware = [];

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    database: 'react-smart-scaffold',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
    dialectOptions:{
      dateStrings: true,  // 禁止转换时间
      typeCast: true      // 覆盖了sequelize的转换
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
