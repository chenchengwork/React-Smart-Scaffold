import EnumEnv from 'constants/EnumEnv';
const to = (route) =>  EnumEnv.rootPath.replace(/\/$/, "") + "/" + route;

/**
 * 路由枚举
 */
const EnumRouter = {
    rootRoute: to(''),		        // 根路由

    login: to('login'),		        // 登录
    screen: to('screen'),		        // 我的可视化
    reactHooks: to("react/hooks"),    // 测试react hooks
    graphql: to("graphql"),           // 测试graphql
};

export default EnumRouter;
