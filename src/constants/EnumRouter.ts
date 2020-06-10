import EnumEnv from '@/constants/EnumEnv';
const to = (route: string) =>  EnumEnv.rootPath.replace(/\/$/, "") + "/" + route;

/**
 * 路由枚举
 */
const EnumRouter = {
    rootRoute: to(''),		        // 根路由

    login: to('login'),		        // 登录
    demoList: to('demoList'),		    // 我的可视化
    x_components: to("x_components"), // 测试x-components

    //-----------测试antd主题----------------
    xAntdCommon: to("antdTheme/common"),
    xAntdDataEntry: to("antdTheme/dataEntry"),
    xAntdDataShow: to("antdTheme/dataShow"),
    xAntdFeedback: to("antdTheme/feedback"),
    xAntdNavigation: to("antdTheme/navigation"),
};

export default EnumRouter;
