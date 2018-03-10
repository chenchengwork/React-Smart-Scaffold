/**
 * Created by chencheng on 17-8-31.
 */

import { PureComponent } from 'react';

import { MainHeader, MainContent } from 'templates/MainLayout';

export default class PluginManage extends PureComponent {

    render() {
        return (
            <div>
                <MainHeader title="插件管理" />

                <MainContent>
                    插件管理
                </MainContent>
            </div>
        );
    }
}
