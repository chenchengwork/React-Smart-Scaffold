/**
 * Created by chencheng on 17-9-14.
 */
import EnumRouter from 'constants/EnumRouter';

/**
 * 枚举默认收起左侧菜单的URL
 * @type {[*]}
 */
export const EnumCollapsedLeftMenuUrls = [];


/**
 * 菜单配置
 *
 * Usage:
 * 左侧菜单参数使用说明:
 * {
        label:"ETL应用",

        //antd中的icon type
        icon:"swap",

        //可以是字符串,也可以是数组,当作为数组时可以将数组内的所有url都让该栏目保持高亮
        url:"url1" || ["url1", "url2"],

        children:[]
    }
 * @type {[*]}
 */
export const EnumDefaultMenus = [
    {
        label: '数据平台',
        value: 'dataPlatform',
        childrenMenu: [
            {
                label: '数据采集',
                children: [
                    {
                        label: '插件管理',
                        icon: 'switcher',
                        url: EnumRouter.dHub_pluginManage,
                        children: []
                    },
                    {
                        label: '资源监控',
                        icon: 'hdd',
                        children: [
                            {
                                label: '主机监控',
                                url: EnumRouter.dHub_hostMonitor,
                                children: []
                            },
                            {
                                label: '插件监控',
                                url: EnumRouter.dHub_pluginMonitor,
                                children: []
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        label: '数据应用',
        value: 'dataApp',
        childrenMenu: [
            {
                label: '数据可视化',
                children: [
                    {
                        label: '作品集',
                        icon: 'pie-chart',
                        url: EnumRouter.dVisual_bigScreen,
                        children: []
                    }
                ]
            },
        ]
    }
];

