import EnumRouter from '@/constants/EnumRouter';

/**
 * 定义路由
 * @type {*[]}
 * 说明:
 *  {
         uri: "/",                                          // 该字段必填
         component: import("./components/CodeEditor"),      // 该字段必填
         storeKeys: "mobx的状态对象key",                      // 该字段可选
         props: "传入组件的props"                             // 该字段可选, 必须是对象
         isMainLayout: true,                                // 该字段可选, 是否开启MainLayout布局, 默认是true
     }
 */
export const x_antdRoutes = [
    {
        uri: EnumRouter.xAntdCommon,
        component: import("@/pages/X_Antd/Common"),
    },
    {
        uri: EnumRouter.xAntdDataEntry,
        component: import("@/pages/X_Antd/DataEntry"),
    },
    {
        uri: EnumRouter.xAntdDataShow,
        component: import("@/pages/X_Antd/DataShow"),
    },
    {
        uri: EnumRouter.xAntdFeedback,
        component: import("@/pages/X_Antd/Feedback"),
    },
    {
        uri: EnumRouter.xAntdNavigation,
        component: import("@/pages/X_Antd/Navigation"),
    },
];




