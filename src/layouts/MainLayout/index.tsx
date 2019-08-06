import React from 'react';
const { useState } = React;
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as css from 'styled-jsx/css';
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
    const  onLeftMenuCollapse = () => {
        const newCollapsed = !collapsed;
        setCollapsed(newCollapsed)
        setAppMenuLeftWidth(getLeftMenuWidth(newCollapsed))
    };

    const currentUrl = props.match.path;

    // language=SCSS
    const { styles, className: mainLayoutClassName } = css.resolve`
        .main-layout {
            height: 100%;
            
            //左侧菜单样式
            :global(.main-content) {
                height: 100%;
                margin-top: ${theme.headerHeight}px;
                :global(.app-content) {
                    //应用区中的header
                    height: 100%;
                    background-color: #edf1f5;
                    padding: 5px;
                }
            }
        }
    `;

    return (
        <LayoutCtx.Provider value={{handleLeftMenuCollapse: onLeftMenuCollapse, leftMenuCollapsed: collapsed, appMenuLeftWidth, theme}}>
            <Layout className={`${mainLayoutClassName} main-layout`}>
                <MenuHeader
                    currentUrl={currentUrl}
                    menus={getMenus()}
                    logout={doLogout}
                />

                <MenuLeft
                    currentUrl={currentUrl}
                    leftMenu={getLeftMenu(currentUrl)}
                    leftWidth={appMenuLeftWidth}
                    collapsed={collapsed}
                    onLeftMenuCollapse={onLeftMenuCollapse}
                />

                <Layout className="main-content" style={{ marginLeft: getLeftMenuWidth(collapsed) }}>
                    <Layout className="app-content">
                        {props.children}
                    </Layout>
                </Layout>

                {/*language=SCSS*/}
                <style jsx>{`
                    :global(body){
                        height: 100%;
                        #wrapper {
                            height: 100%;
                        }
                    }
                `}</style>

                {styles}

            </Layout>
        </LayoutCtx.Provider>
    )
};



export default withRouter(MainLayout)
