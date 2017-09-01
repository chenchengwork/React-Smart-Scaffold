/**
 * Created by chencheng on 17-8-31.
 */

import { Component } from 'react';

import { MainHeader, MainContent } from 'templates/MainLayout/MainLayout';

export default class Plugin extends Component{

    render(){
        return (
            <div>
                <MainHeader title="插件监控" />

                <MainContent>
                    插件监控
                </MainContent>
            </div>
        )
    }
}
