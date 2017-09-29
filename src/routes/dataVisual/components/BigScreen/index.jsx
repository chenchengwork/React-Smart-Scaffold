/**
 * Created by chencheng on 17-8-31.
 */

import { Component } from 'react';

import { MainHeader, MainContent } from 'templates/MainLayout/MainLayout';

export default class BigScreen extends Component{

    render(){
        return (
            <div>
                <MainHeader title="作品集" />

                <MainContent>
                    作品集
                </MainContent>
            </div>
        )
    }
}
