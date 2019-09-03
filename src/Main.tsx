import React, { Fragment} from 'react'
import Router from './router';
import css from 'styled-jsx/css';
import LocaleWrapper from './intl';

export default () => {
    const globalStyle = getGlobalStyle();
    return (
        <Fragment>
            <LocaleWrapper>
                <Router />
            </LocaleWrapper>
            <style jsx global>{globalStyle}</style>
        </Fragment>
    );
}

/**
 * 全局样式
 */
const getGlobalStyle = () => {

    // language=SCSS
    return css.global`
        body {
            height: 100%;

            > #wrapper {
                height: 100%;
            }
        }
        
        // 修改滚动条
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-thumb{
            border-radius:16px;
            background:rgba(6,6,6,0.5);
            -webkit-box-shadow:2px 2px 6px rgba(0,0,0,.5),inset -2px 2px 2px rgba(204,204,204,0.1),inset 2px -2px 2px rgba(0,0,0,0.2);
        }
    `
}
