/**
 * Created by chencheng on 2017/8/28.
 */
import T from 'utils/T';
import EnumRouter from 'constants/EnumRouter';

//--图片资源--
import AdminIcon from './img/admin.svg';
import HelpIcon from './img/help.svg';
import LogoutIcon from './img/logout.svg';

/**
 * url和分类值的对应关系
 * @type {{}}
 */
export const UrlToCategoryMap = {};

/**
 * 配置菜单文件
 */
const EnumMenus = (()=>{
    const defaultMenus = [
        {
            label:"数据平台",
            value:"dataPlatform",
            childrenMenu:[
                {
                    label:"数据采集",
                    children:[
                        {
                            label:"插件管理",
                            icon:"switcher",
                            url:EnumRouter.dHub_pluginManage,
                            children:[]
                        },
                        {
                            label:"资源监控",
                            icon:"hdd",
                            children:[
                                {
                                    label:"主机监控",
                                    url:EnumRouter.dHub_hostMonitor,
                                    children:[]
                                },
                                {
                                    label:"插件监控",
                                    url:EnumRouter.dHub_pluginMonitor,
                                    children:[]
                                }
                            ]
                        }
                    ]
                },

            ]
        }
    ];


    //加工默认菜单配置
    defaultMenus.forEach((appMenus) => {
        appMenus.childrenMenu.forEach((menus) => {
            menus.url =[];
            if(menus.children.length > 0){
                menus.children.forEach((itemMenu) => {

                    if(itemMenu.children.length > 0){
                        itemMenu.url = [];
                        itemMenu.children.forEach((menu) => {
                            menus.url.push(menu.url);
                            itemMenu.url.push(menu.url);
                            UrlToCategoryMap[menu.url] = appMenus.value;
                        })
                    }else{
                        menus.url.push(itemMenu.url);

                        UrlToCategoryMap[itemMenu.url] = appMenus.value;
                    }
                })
            }
        })
    });

    return defaultMenus;

})();


/**
 * 枚举碎片
 * @type {[*]}
 */
export const EnumFragmentMenu = [
    {
        label: "admin",
        url: "",
        icon: AdminIcon,
        children: []
    },
    {
        label: "帮助",
        url: "",
        icon: HelpIcon,
        children: []
    },
    {
        label: "退出",
        url: "",
        icon: LogoutIcon,
        children: []
    }
];

/**
 * 获取菜单分类的label
 * @param category
 * @returns {*}
 */
export const getMenuCategoryLabel = (category) => {

    for(let i = 0; i < EnumMenus.length; i++ ){
        if(category == EnumMenus[i].value){
            return EnumMenus[i].label;
        }
    }

    return null;
};

/**
 * 获取菜单类别
 */
export const getMenuCategory = () => EnumMenus.map((val) => {
    const { label, value } = val;
    return {
        label,
        value,
		url:val.childrenMenu[0]['url'][0]
    }
});

/**
 * 获取菜单的类别
 * @param {String} category
 * @returns {Array}
 */
export const getMenusByCategory = (category) => {
	for(let i = 0; i < EnumMenus.length; i++ ){
		if(category == EnumMenus[i].value){
			return EnumMenus[i].childrenMenu;
		}
	}

	return [];
};


/**
 * 获取左侧菜单
 * @param url
 * @param type
 * @returns {Array}
 */
export const getLeftMenu = (url, type = EnumMenus[0]['value']) => {
    const menu = getMenusByCategory(type);

	for(let i = 0; i < menu.length; i++){
		if((T.lodash.isArray(menu[i].url) && T.lodash.indexOf(menu[i].url,url) !== -1) ||
			(T.lodash.isString(menu[i].url) && menu[i].url == url)
		){
			return menu[i].children;
		}
	}

	return [];
};
