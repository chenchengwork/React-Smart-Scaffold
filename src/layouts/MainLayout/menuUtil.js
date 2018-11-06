/**
 * Created by chencheng on 2017/8/28.
 */
import {checkType, helper} from 'utils/T';
import { EnumDefaultMenus, EnumCollapsedLeftMenuUrls } from 'constants/EnumDefaultMenus';

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
    const getUrlToExtraInfoMapItem = (category, url, icon) => ({ category, icon, isCollapsedLeftMenu: EnumCollapsedLeftMenuUrls.indexOf(url) !== -1 });

    const formatMenus = (category, menus, urls = []) => {
        menus.forEach(menu => {
            if (checkType.isUndefined(menu.children)) menu.children = [];

            if (Array.isArray(menu.url)) {
                urls = urls.concat(menu.url);
                menu.url.forEach(url => UrlToExtraInfoMap[url] = getUrlToExtraInfoMapItem(category, url,menu.icon));

            } else if (checkType.isString(menu.url)) {
                urls.push(menu.url);
                UrlToExtraInfoMap[menu.url] = getUrlToExtraInfoMapItem(category, menu.url,menu.icon)
            }

            if (Array.isArray(menu.children) && menu.children.length > 0) {
                if(menu.url){
                    if(checkType.isString(menu.url)){
                        menu.url = [menu.url];
                    }
                } else {
                    menu.url = [];
                }

                const result = formatMenus(category, menu.children);

                menu.url = helper.uniq(menu.url.concat(result.urls));
                urls = helper.uniq(urls.concat(menu.url));
            }
        });

        return {
            menus,
            urls
        };
    };

    // 加工默认菜单配置
    EnumDefaultMenus.forEach((appMenus) => appMenus.childrenMenu = formatMenus(appMenus.value, appMenus.childrenMenu).menus);

    return EnumDefaultMenus;

})();


/**
 * 是否移除左侧菜单
 * @param url
 * @return {boolean}
 */
export const isRemoveLeftMenu = (url) => {
    for (let i = 0; i < EnumDefaultMenus.length; i++){
        const childrenMenu = EnumDefaultMenus[i].childrenMenu;
        for (let j = 0; j < childrenMenu.length; j++) {
            const menu = childrenMenu[j];
            let isCheck = false;

            if (menu.url){
                if (Array.isArray(menu.url) && menu.url.indexOf(url) !== -1){
                    isCheck = true;
                } else if(checkType.isString(menu.url) && menu.url == url) {
                    isCheck = true;
                }
            }

            if (isCheck){
                if (!menu.children || menu.children.length < 1) {
                    return true;
                }else {
                    return false;
                }
            }
        }
    }

    return false;
};


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
        if ((Array.isArray(menu[i].url) && menu[i].url.indexOf(url) !== -1) ||
            (checkType.isString(menu[i].url) && menu[i].url === url)
        ) {
            return menu[i].children;
        }
    }

    return [];
};
