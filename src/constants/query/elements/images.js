/**
 * @description 要素指标的图片
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import {
    AIR_DENSITY,
    DEM_1KM,
    FREEZE_AVG,
    FREEZE_MAX,
    HIGH_TEMPERATURE_AVG,
    HIGH_TEMPERATURE_MAX,
    LOW_TEMPERATURE_AVG,
    LOW_TEMPERATURE_MAX,
    HUMIDITY_80,
    LAND_USE_1KM,
    NATURAL_RESERVE,
    SAND_STORM_AVG,
    SAND_STORM_MAX,
    THUNDER_STORM_AVG,
    THUNDER_STORM_MAX,
    WIND_SPEED_80,
    WIND_SPEED_100,
    WIND_POWER_80,
    WIND_POWER_100,
    SLOPE_1KM
} from './index';

import airDensitySize300 from '../../../resources/img/windbase/300/air_density.png';
import dem1kmSize300 from '../../../resources/img/windbase/300/dem_1km.png';
import freezeAvgSize300 from '../../../resources/img/windbase/300/freeze_avg.png';
import freezeMaxSize300 from '../../../resources/img/windbase/300/freeze_max.png';
import highTemperatureAvgSize300 from '../../../resources/img/windbase/300/high_temperature_avg.png';
import highTemperatureMaxSize300 from '../../../resources/img/windbase/300/high_temperature_max.png';
import lowTemperatureAvgSize300 from '../../../resources/img/windbase/300/low_temperature_avg.png';
import lowTemperatureMaxSize300 from '../../../resources/img/windbase/300/low_temperature_max.png';
import humidity80Size300 from '../../../resources/img/windbase/300/humidity_80.png';
import landUse1kmSize300 from '../../../resources/img/windbase/300/land_use_1km.png';
import naturalReserveSize300 from '../../../resources/img/windbase/300/natural_reserve.png';
import sandStormAvgSize300 from '../../../resources/img/windbase/300/sand_storm_avg.png';
import sandStormMaxSize300 from '../../../resources/img/windbase/300/sand_storm_max.png';
import thunderStormAvgSize300 from '../../../resources/img/windbase/300/thunder_storm_avg.png';
import thunderStormMaxSize300 from '../../../resources/img/windbase/300/thunder_storm_max.png';
import windSpeed80Size300 from '../../../resources/img/windbase/300/wind_speed_80.png';
import windSpeed100Size300 from '../../../resources/img/windbase/300/wind_speed_100.png';
import windPower80Size300 from '../../../resources/img/windbase/300/wind_power_80.png';
import windPower100Size300 from '../../../resources/img/windbase/300/wind_power_100.png';
import slop1kmSize300 from '../../../resources/img/windbase/300/slope_1km.png';

import airDensitySize600 from '../../../resources/img/windbase/600/air_density.png';
import dem1kmSize600 from '../../../resources/img/windbase/600/dem_1km.png';
import freezeAvgSize600 from '../../../resources/img/windbase/600/freeze_avg.png';
import freezeMaxSize600 from '../../../resources/img/windbase/600/freeze_max.png';
import highTemperatureAvgSize600 from '../../../resources/img/windbase/600/high_temperature_avg.png';
import highTemperatureMaxSize600 from '../../../resources/img/windbase/600/high_temperature_max.png';
import lowTemperatureAvgSize600 from '../../../resources/img/windbase/600/low_temperature_avg.png';
import lowTemperatureMaxSize600 from '../../../resources/img/windbase/600/low_temperature_max.png';
import humidity80Size600 from '../../../resources/img/windbase/600/humidity_80.png';
import landUse1kmSize600 from '../../../resources/img/windbase/600/land_use_1km.png';
import naturalReserveSize600 from '../../../resources/img/windbase/600/natural_reserve.png';
import sandStormAvgSize600 from '../../../resources/img/windbase/600/sand_storm_avg.png';
import sandStormMaxSize600 from '../../../resources/img/windbase/600/sand_storm_max.png';
import thunderStormAvgSize600 from '../../../resources/img/windbase/600/thunder_storm_avg.png';
import thunderStormMaxSize600 from '../../../resources/img/windbase/600/thunder_storm_max.png';
import windSpeed80Size600 from '../../../resources/img/windbase/600/wind_speed_80.png';
import windSpeed100Size600 from '../../../resources/img/windbase/600/wind_speed_100.png';
import windPower80Size600 from '../../../resources/img/windbase/600/wind_power_80.png';
import windPower100Size600 from '../../../resources/img/windbase/600/wind_power_100.png';
import slop1kmSize600 from '../../../resources/img/windbase/600/slope_1km.png';

// 默认尺寸
export const defaultSize = 300;

// 所有图片
export const images = {
    300: {
        [AIR_DENSITY]: airDensitySize300,
        [DEM_1KM]: dem1kmSize300,
        [FREEZE_AVG]: freezeAvgSize300,
        [FREEZE_MAX]: freezeMaxSize300,
        [HIGH_TEMPERATURE_AVG]: highTemperatureAvgSize300,
        [HIGH_TEMPERATURE_MAX]: highTemperatureMaxSize300,
        [LOW_TEMPERATURE_AVG]: lowTemperatureAvgSize300,
        [LOW_TEMPERATURE_MAX]: lowTemperatureMaxSize300,
        [HUMIDITY_80]: humidity80Size300,
        [LAND_USE_1KM]: landUse1kmSize300,
        [NATURAL_RESERVE]: naturalReserveSize300,
        [SAND_STORM_AVG]: sandStormAvgSize300,
        [SAND_STORM_MAX]: sandStormMaxSize300,
        [THUNDER_STORM_AVG]: thunderStormAvgSize300,
        [THUNDER_STORM_MAX]: thunderStormMaxSize300,
        [WIND_SPEED_80]: windSpeed80Size300,
        [WIND_SPEED_100]: windSpeed100Size300,
        [WIND_POWER_80]: windPower80Size300,
        [WIND_POWER_100]: windPower100Size300,
        [SLOPE_1KM]: slop1kmSize300
    },
    600: {
        [AIR_DENSITY]: airDensitySize600,
        [DEM_1KM]: dem1kmSize600,
        [FREEZE_AVG]: freezeAvgSize600,
        [FREEZE_MAX]: freezeMaxSize600,
        [HIGH_TEMPERATURE_AVG]: highTemperatureAvgSize600,
        [HIGH_TEMPERATURE_MAX]: highTemperatureMaxSize600,
        [LOW_TEMPERATURE_AVG]: lowTemperatureAvgSize600,
        [LOW_TEMPERATURE_MAX]: lowTemperatureMaxSize600,
        [HUMIDITY_80]: humidity80Size600,
        [LAND_USE_1KM]: landUse1kmSize600,
        [NATURAL_RESERVE]: naturalReserveSize600,
        [SAND_STORM_AVG]: sandStormAvgSize600,
        [SAND_STORM_MAX]: sandStormMaxSize600,
        [THUNDER_STORM_AVG]: thunderStormAvgSize600,
        [THUNDER_STORM_MAX]: thunderStormMaxSize600,
        [WIND_SPEED_80]: windSpeed80Size600,
        [WIND_SPEED_100]: windSpeed100Size600,
        [WIND_POWER_80]: windPower80Size600,
        [WIND_POWER_100]: windPower100Size600,
        [SLOPE_1KM]: slop1kmSize600
    }
};

const defaultImagePosition = [[68.6096163928448, 15.9654505397617], [139.992039141987, 54.8956963438891]];

// 图片在地图上对应的西南 - 东北坐标点
export const imagesPosition = {
    [AIR_DENSITY]: defaultImagePosition,
    [DEM_1KM]: defaultImagePosition,
    [FREEZE_AVG]: defaultImagePosition,
    [FREEZE_MAX]: defaultImagePosition,
    [HIGH_TEMPERATURE_AVG]: defaultImagePosition,
    [HIGH_TEMPERATURE_MAX]: [[56.7196163928448, 7.4054505397617], [149.842039141987, 58.3956963438891]],
    [LOW_TEMPERATURE_AVG]: defaultImagePosition,
    [LOW_TEMPERATURE_MAX]: defaultImagePosition,
    [HUMIDITY_80]: defaultImagePosition,
    [LAND_USE_1KM]: [[62.6396163928448, 12.8754505397617], [141.792039141987, 56.1756963438891]],
    [NATURAL_RESERVE]: [[63.8496163928448, 13.0000000000000], [140.822039141987, 55.3556963438891]],
    [SAND_STORM_AVG]: defaultImagePosition,
    [SAND_STORM_MAX]: defaultImagePosition,
    [THUNDER_STORM_AVG]: defaultImagePosition,
    [THUNDER_STORM_MAX]: defaultImagePosition,
    [WIND_SPEED_80]: defaultImagePosition,
    [WIND_SPEED_100]: defaultImagePosition,
    [WIND_POWER_80]: defaultImagePosition,
    [WIND_POWER_100]: defaultImagePosition,
    [SLOPE_1KM]: [[47.6896163928448, -1.0500000000000], [160.322039141987, 60.8756963438891]]
};

/**
 * 根据类型获取图片
 * @param {string} type 类型
 * @param {number|string=} size 图片尺寸,仅300或600
 */
export const getImage = (type, size = defaultSize) => images[size][type];

/**
 * 获取图片的西南 - 东北 定位坐标
 * @param type
 */
export const getImagePosition = type => ({
    sw: {
        longitude: imagesPosition[type][0][0],
        latitude: imagesPosition[type][0][1]
    },
    ne: {
        longitude: imagesPosition[type][1][0],
        latitude: imagesPosition[type][1][1]
    }
});

export default images[defaultSize];
