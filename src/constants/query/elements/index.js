/**
 * @description 要素查询的数据类型
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */
import { toArray } from '../../../utils/helper';
/**
 * 风资源要素
 */
// 风速 - 年平均 - 80m
export const WIND_SPEED_80 = 'WIND_SPEED_80';
// 风功率密度 - 年平均 - 80m
export const WIND_POWER_80 = 'WIND_POWER_80';
// 空气密度 - 80m
export const AIR_DENSITY = 'AIR_DENSITY';
// 相对湿度 - 80m
export const HUMIDITY_80 = 'HUMIDITY_80';


// 风速 - 年平均 - 100m
export const WIND_SPEED_100 = 'WIND_SPEED_100';
// 风功率密度 - 年平均 - 100m
export const WIND_POWER_100 = 'WIND_POWER_100';


/**
 * 地理信息
 */
// 土地利用 - 1km
export const LAND_USE_1KM = 'LAND_USE_1KM';
// 高程 - 1km
export const DEM_1KM = 'DEM_1KM';
// 坡度 - 1km
export const SLOPE_1KM = 'SLOPE_1KM';
// 自然保护区
export const NATURAL_RESERVE = 'NATURAL_RESERVE';

/**
 * 气候灾害
 */
// 年结冰日数 - 平均值
export const FREEZE_AVG = 'FREEZE_AVG';
// 年结冰日数 - 极值
export const FREEZE_MAX = 'FREEZE_MAX';
// 年雷暴日数 - 平均值
export const THUNDER_STORM_AVG = 'THUNDER_STORM_AVG';
// 年雷暴日数 - 极值
export const THUNDER_STORM_MAX = 'THUNDER_STORM_MAX';
// 年沙尘暴日数 - 平均值
export const SAND_STORM_AVG = 'SAND_STORM_AVG';
// 年沙尘暴日数 - 极值
export const SAND_STORM_MAX = 'SAND_STORM_MAX';
// 年最低气温 - 平均值
export const LOW_TEMPERATURE_AVG = 'LOW_TEMPERATURE_AVG';
// 年最低气温 - 极值
export const LOW_TEMPERATURE_MAX = 'LOW_TEMPERATURE_MAX';
// 年最高气温 - 平均值
export const HIGH_TEMPERATURE_AVG = 'HIGH_TEMPERATURE_AVG';
// 年最高气温 - 极值
export const HIGH_TEMPERATURE_MAX = 'HIGH_TEMPERATURE_MAX';

export default toArray(exports);
