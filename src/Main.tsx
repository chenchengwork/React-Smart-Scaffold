import React from 'react'
import Router from './router';
import LocaleWrapper from './intl';

export default () => (
    <LocaleWrapper>
        <Router />
    </LocaleWrapper>
);

