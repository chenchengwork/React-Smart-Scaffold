/**
 * Created by chencheng on 17-8-31.
 */

import { PureComponent } from 'react';

import { MainHeader, MainContent } from 'templates/MainLayout';

export default class Plugin extends PureComponent {

    render() {
        return (
            <div>
                <MainHeader title="插件监控" />

                <MainContent>
                    插件监控
                </MainContent>
            </div>
        );
    }
}
