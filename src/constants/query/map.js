/**
 * @description 地图相关枚举
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

// 定位点图标
import markerImage from '../../resources/img/marker.png';

// 默认中心点
export const CENTER = [94.923828, 39.272688];
// 默认缩放等级
export const ZOOM = 4;
// 最小缩放等级
export const MIN_ZOOM = 4;
// 最大缩放等级
export const MAX_ZOOM = 18;
// 默认底图显示的内容(背景,标记点,道路)
export const FEATURES = ['bg', 'point', 'road'];
// 图层配置
export const LAYER_MAP = {
    // 默认底图
    normal: 'default',
    // 卫星底图
    satellite: 'TileLayer.Satellite',
    // 路网图
    roadNet: 'TileLayer.RoadNet',
    // 地形图 - 高程
    terrain: {
        // 使用谷歌地图切片
        getTileUrl: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x=[x]&y=[y]&z=[z]&s=Galil'
    }
};

// 地图底图
export const BASE_LAYER = {
    normal: [],
    // 卫星图时需要显示路网图
    satellite: ['roadNet'],
    terrain: []
};

// 默认显示的地图底图
export const DEFAULT_LAYER = 'satellite';

// 标记点样式
export const MARKER_STYLE = {
    icon: markerImage
};
// 矩形样式
export const RECTANGLE_STYLE = {
    strokeColor: '#D53C50',
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: '#D53C50',
    fillOpacity: 0.15,
    strokeStyle: 'solid'
};
// 多边形样式
export const POLYGON_STYLE = RECTANGLE_STYLE;
