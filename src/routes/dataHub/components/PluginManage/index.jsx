/**
 * Created by chencheng on 17-8-31.
 */

import { Component } from 'react';

import { MainHeader, MainContent } from 'templates/MainLayout/MainLayout';

export default class PluginManage extends Component{

    render(){
        return (
            <div>
                <MainHeader title="插件管理" />

                <MainContent>
                    插件管理
                </MainContent>
            </div>
        )
    }
}
