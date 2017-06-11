/**
 * @description
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { includes } from '../../utils/helper';

// 空透明图片
export const NONE_IMAGE = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

/**
 *
 * @type {string}
 */
export const QUERY_POINT = 'point';
// 查询方式 - 经纬度查询
export const QUERY_LNGLAT = 'lngLat';
// 查询方式 - 多边形查询
export const QUERY_POLYGON = 'polygon';
// 查询方式 - 矩形查询
export const QUERY_RECTANGLE = 'rectangle';
// 查询方式 - 县域查询
export const QUERY_DISTRICT = 'district';
// 查询方式 - 范围导入
export const QUERY_IMPORT = 'import';

// 查询类型 - 点查询
export const QUERY_TYPE_POINT = 'point';
// 查询类型 - 面查询
export const QUERY_TYPE_AREA = 'area';

// 点查询类型数组
export const POINT_QUERIES = [QUERY_POINT, QUERY_LNGLAT];
// 单面查询类型数组
export const SINGLE_AREA_QUERIES = [QUERY_POLYGON, QUERY_RECTANGLE];
// 多面查询类型数组
export const MULTI_AREA_QUERIES = [QUERY_DISTRICT, QUERY_IMPORT];

// 所有查询方式数组
export const QUERIES = POINT_QUERIES.concat(SINGLE_AREA_QUERIES).concat(MULTI_AREA_QUERIES);

export const QUERY_NAME_POINT = '点查询';
export const QUERY_NAME_LNGLAT = '经纬度查询';
export const QUERY_NAME_POLYGON = '多边形查询';
export const QUERY_NAME_RECTANGLE = '矩形查询';
export const QUERY_NAME_DISTRICT = '县域查询';
export const QUERY_NAME_IMPORT = '范围查询';

export const QUERY_NAMES = {
    [QUERY_POINT]: QUERY_NAME_POINT,
    [QUERY_LNGLAT]: QUERY_NAME_LNGLAT,
    [QUERY_POLYGON]: QUERY_NAME_POLYGON,
    [QUERY_RECTANGLE]: QUERY_NAME_RECTANGLE,
    [QUERY_DISTRICT]: QUERY_NAME_DISTRICT,
    [QUERY_IMPORT]: QUERY_NAME_IMPORT
};

export const GEO_TYPE_POINT = 'Point';
export const GEO_TYPE_POLYGON = 'Polygon';
export const GEO_TYPE_MULTI_POLYGON = 'MultiPolygon';

export const GEO_TYPES = {
    [QUERY_POINT]: GEO_TYPE_POINT,
    [QUERY_LNGLAT]: GEO_TYPE_POINT,
    [QUERY_POLYGON]: GEO_TYPE_POLYGON,
    [QUERY_RECTANGLE]: GEO_TYPE_POLYGON,
    [QUERY_DISTRICT]: GEO_TYPE_MULTI_POLYGON,
    [QUERY_IMPORT]: GEO_TYPE_MULTI_POLYGON
};
/**
 * 是否是点查询
 * @param {string} query 查询方式
 * @return {boolean}
 */
export const isPointQuery = query => includes(POINT_QUERIES, query);

/**
 * 是否是面查询
 * @param {string} query 查询方式
 * @return {boolean}
 */
export const isAreaQuery = query => includes(SINGLE_AREA_QUERIES.concat(MULTI_AREA_QUERIES), query);

/**
 * 是否是多面查询
 * @param {string} query 查询方式
 * @return {boolean}
 */
export const isMultiAreaQuery = query => includes(MULTI_AREA_QUERIES, query);

/**
 * 是否是单面查询
 * @param {string} query 查询方式
 * @return {boolean}
 */
export const isSingleAreaQuery = query => includes(SINGLE_AREA_QUERIES, query);

/**
 * 获取查询类型
 * @param {string} query 查询方式
 * @return {string}
 */
export const getQueryType = query => (isPointQuery(query) ? QUERY_TYPE_POINT : QUERY_TYPE_AREA);

/**
 * 获取查询名
 * @param {string} query
 * @return {string}
 */
export const getQueryName = query => QUERY_NAMES[query];

/**
 * 获取geoJson的类型
 * @param {string} query
 */
export const getGeoJsonType = query => GEO_TYPES[query];
