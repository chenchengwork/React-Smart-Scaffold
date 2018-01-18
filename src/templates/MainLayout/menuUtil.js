/**
 * Created by chencheng on 2017/8/28.
 */
import T from 'utils/T';
import { EnumDefaultMenus, EnumCollapsedLeftMenuUrls } from 'constants/EnumDefaultMenus';

// --图片资源--
import LogoutIcon from './img/logout.svg';

/**
 * url和分类值的对应关系
 * @type {{}}
 */
export const UrlToExtraInfoMap = {};

/**
 * 配置菜单文件
 */
const EnumMenus = (() => {

    /**
     * 获取url对应额外信息的Item
     * @param category
     * @param url
     */
    const getUrlToExtraInfoMapItem = (category, url) => ({
        category,
        isCollapsedLeftMenu: EnumCollapsedLeftMenuUrls.indexOf(url) !== -1
    });

    /**
     * 格式化菜单
     * @param category
     * @param menus
     * @param urls
     * @returns {{menus: *, urls: Array}}
     */
    const formatMenus = (category, menus, urls = []) => {
        menus.forEach(menu => {
            if (T.lodash.isUndefined(menu.children)) menu.children = [];

            if (Array.isArray(menu.url)) {
                urls = urls.concat(menu.url);
            } else if (T.lodash.isString(menu.url)) {
                urls.push(menu.url);
            }

            if (Array.isArray(menu.children) && menu.children.length > 0) {
                menu.url = Array.isArray(menu.url) || [];
                const result = formatMenus(category, menu.children);

                menu.url = T.lodash.uniq(menu.url.concat(result.urls));
                urls = T.lodash.uniq(urls.concat(menu.url));
            }
        });

        urls.forEach(url => UrlToExtraInfoMap[url] = getUrlToExtraInfoMapItem(category, url));

        return { menus, urls };
    }

    // 加工默认菜单配置
    EnumDefaultMenus.forEach((appMenus) => appMenus.childrenMenu = formatMenus(appMenus.value, appMenus.childrenMenu).menus);

    return EnumDefaultMenus;
})();


/**
 * 枚举碎片
 * @type {[*]}
 */
export const EnumFragmentMenu = [
    {
        label: '退出',
        url: '',
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

    for (let i = 0; i < EnumMenus.length; i++) {
        if (category === EnumMenus[i].value) {
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
		url: val.childrenMenu[0]['url'][0]
    };
});

/**
 * 获取菜单的类别
 * @param {String} category
 * @returns {Array}
 */
export const getMenusByCategory = (category) => {
	for (let i = 0; i < EnumMenus.length; i++) {
		if (category === EnumMenus[i].value) {
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

	for (let i = 0; i < menu.length; i++) {
		if ((T.lodash.isArray(menu[i].url) && T.lodash.indexOf(menu[i].url, url) !== -1) ||
			(T.lodash.isString(menu[i].url) && menu[i].url === url)
		) {
			return menu[i].children;
		}
	}

	return [];
};
