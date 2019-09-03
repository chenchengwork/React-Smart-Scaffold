import React from 'react';
const { useState } = React;
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout } from 'antd';
import prompt from '@/utils/prompt';

import { UrlToExtraInfoMap, getLeftMenu, getMenus, isRemoveLeftMenu } from './menuUtil';
import { logout } from '@/services/auth';
import EnumRouter from '@/constants/EnumRouter';
import { LayoutCtx } from './layoutContext';
import {theme} from './theme';

import MenuHeader from './MenuHeader';
import MenuLeft from './MenuLeft';

import MainHeader from './MainHeader';
export {MainHeader}
import MainContent from "./MainContent"
export {MainContent}

const MainLayout: React.FC<RouteComponentProps> = (props) => {

    /**
     * 获取左侧菜单宽度
     * @param {bool} collapsed
     * @return {number}
     */
    const getLeftMenuWidth = (collapsed: boolean) => {
        // 是否移除左侧菜单
        const currentUrl = props.match.path;
        if(isRemoveLeftMenu(currentUrl)) return 0;

        return collapsed ? 80 : 200;
    };

    const [collapsed, setCollapsed] = useState(!UrlToExtraInfoMap[props.match.path]);
    const [appMenuLeftWidth, setAppMenuLeftWidth] = useState(getLeftMenuWidth(collapsed));

    /**
     * 退出登录
     */
    const doLogout = ():any => prompt.confirm(
        () =>  logout().then(() => props.history.push(EnumRouter.login), resp => prompt.error(resp.msg)),
        {title: "确定退出登录?"}
    );

    /**
     * 左侧菜单的收起和关闭
     */
    const onLeftMenuCollapse = () => {
        const newCollapsed = !collapsed;
        setCollapsed(newCollapsed)
        setAppMenuLeftWidth(getLeftMenuWidth(newCollapsed))
    };

    const currentUrl = props.match.path;

    return (
        <LayoutCtx.Provider value={{handleLeftMenuCollapse: onLeftMenuCollapse, leftMenuCollapsed: collapsed, appMenuLeftWidth, theme}}>
            <Layout style={{height: "100%"}}>
                {/*头部菜单*/}
                <MenuHeader
                    currentUrl={currentUrl}
                    menus={getMenus()}
                    logout={doLogout}
                />

                {/*左侧菜单*/}
                <MenuLeft
                    currentUrl={currentUrl}
                    leftMenu={getLeftMenu(currentUrl)}
                    leftWidth={appMenuLeftWidth}
                    collapsed={collapsed}
                    onLeftMenuCollapse={onLeftMenuCollapse}
                />

                {/*内容区域*/}
                <Layout style={{ marginLeft: getLeftMenuWidth(collapsed), height: "100%" }}>
                    {props.children}
                </Layout>
            </Layout>
        </LayoutCtx.Provider>
    )
};



export default withRouter(MainLayout)
