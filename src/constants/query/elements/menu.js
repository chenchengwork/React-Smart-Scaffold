/**
 * @description 要素指标菜单的名
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { can } from '../../../utils/auth';

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

export default [
    {
        label: '80米风资源要素',
        show: can('3dMap.80Wind'),
        children: [
            {
                label: '年平均风速',
                dataType: WIND_SPEED_80,
                show: can('3dMap.80Wind.yearAvgWind')
            },
            {
                label: '年平均风功率密度',
                dataType: WIND_POWER_80,
                show: can('3dMap.80Wind.yearAvgPowerDensity')
            },
            {
                label: '空气密度',
                dataType: AIR_DENSITY,
                show: can('3dMap.80Wind.airDensity')
            },
            {
                label: '相对湿度',
                dataType: HUMIDITY_80,
                show: can('3dMap.80Wind.relativeHumidity')
            }
        ]
    },
    {
        label: '100米风资源要素',
        show: can('3dMap.100Wind'),
        children: [
            {
                label: '年平均风速',
                dataType: WIND_SPEED_100,
                show: can('3dMap.100Wind.yearAvgWind')
            },
            {
                label: '年平均风功率密度',
                dataType: WIND_POWER_100,
                show: can('3dMap.100Wind.yearAvgPowerDensity')
            }
        ]
    },
    {
        label: '地理信息',
        show: can('3dMap.geoInfo'),
        children: [
            {
                label: '土地利用',
                dataType: LAND_USE_1KM,
                show: can('3dMap.geoInfo.landUse')
            },
            {
                label: '高程',
                dataType: DEM_1KM,
                show: can('3dMap.geoInfo.altitude')
            },
            {
                label: '坡度',
                dataType: SLOPE_1KM,
                show: can('3dMap.geoInfo.slope')
            },
            {
                label: '自然保护区',
                dataType: NATURAL_RESERVE,
                show: can('3dMap.geoInfo.natureReserve')
            }
        ]
    },
    {
        label: '气象灾害',
        show: can('3dMap.climateDisaster'),
        children: [
            {
                label: '年结冰日数(平均值)',
                dataType: FREEZE_AVG,
                show: can('3dMap.climateDisaster.yearFrozenAvg')
            },
            {
                label: '年结冰日数(极值)',
                dataType: FREEZE_MAX,
                show: can('3dMap.climateDisaster.yearFrozenExtrem')
            },
            {
                label: '年雷暴日数(平均值)',
                dataType: THUNDER_STORM_AVG,
                show: can('3dMap.climateDisaster.yearStormAvg')
            },
            {
                label: '年雷暴日数(极值)',
                dataType: THUNDER_STORM_MAX,
                show: can('3dMap.climateDisaster.yearStormExtrem')
            },
            {
                label: '年沙尘暴日数(平均值)',
                dataType: SAND_STORM_AVG,
                show: can('3dMap.climateDisaster.yearSandAvg')
            },
            {
                label: '年沙尘暴日数(极值)',
                dataType: SAND_STORM_MAX,
                show: can('3dMap.climateDisaster.yearSandExtrem')
            },
            {
                label: '年最低气温(平均值)',
                dataType: LOW_TEMPERATURE_AVG,
                show: can('3dMap.climateDisaster.yearMinTemperatureAvg')
            },
            {
                label: '年最低气温(极值)',
                dataType: LOW_TEMPERATURE_MAX,
                show: can('3dMap.climateDisaster.yearMinTemperatureExtrem')
            },
            {
                label: '年最高气温(平均值)',
                dataType: HIGH_TEMPERATURE_AVG,
                show: can('3dMap.climateDisaster.yearMaxTemperatureAvg')
            },
            {
                label: '年最高气温(极值)',
                dataType: HIGH_TEMPERATURE_MAX,
                show: can('3dMap.climateDisaster.yearMaxTemperatureExtrem')
            }
        ]
    }
];
