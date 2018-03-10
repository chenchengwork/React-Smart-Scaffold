/**
 * Created by chencheng on 17-8-31.
 */

import { PureComponent } from 'react';

import { MainHeader, MainContent } from 'templates/MainLayout';

export default class BigScreen extends PureComponent {

    render() {
        return (
            <div>
                <MainHeader title="作品集" />

                <MainContent>
                    作品集
                </MainContent>
            </div>
        );
    }
}
