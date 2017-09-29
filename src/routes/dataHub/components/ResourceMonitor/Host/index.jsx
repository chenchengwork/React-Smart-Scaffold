/**
 * Created by chencheng on 17-8-31.
 */

import { Component } from 'react';

import { MainHeader, MainContent } from 'templates/MainLayout/MainLayout';

export default class Host extends Component {

    render() {
        return (
            <div>
                <MainHeader title="主机监控" />

                <MainContent>
                    主机监控
                </MainContent>
            </div>
        );
    }
}
