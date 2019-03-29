'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // 支持cors
    cors:{
        enable: true,
        package: 'egg-cors',
    },

    // 支持graphql
    graphql: {
        enable: true,
        package: 'egg-graphql',
    }
};
