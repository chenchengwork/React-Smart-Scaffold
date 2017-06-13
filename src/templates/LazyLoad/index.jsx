/**
 * @description 延迟加载工具
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */
import React from 'react';
import LazyLoad from './lazyLoad';

export default (lazyLoader,store) => props => <LazyLoad {...props} store={store} lazyLoader={lazyLoader} />;
