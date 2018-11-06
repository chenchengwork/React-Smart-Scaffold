import styles from './index.scss';
import { MainContent, MainHeader } from 'layouts/MainLayout'
import React, { PureComponent } from 'react';

export default class Screen extends PureComponent{

    render(){

        return (
            <MainContent className={styles.screen}>
                <MainHeader title="可视化列表" />
            </MainContent>
        )
    }
}
