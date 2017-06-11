/**
 * @description 要素指标图例
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import naturalReserveImg from '../../../resources/img/legends/nature-reserve.png';
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

// 风速
const windSpeed = {
    title: '风速(m/s)',
    legends: [
        {
            color: '#e1e1e1',
            label: '0 - 2'
        },
        {
            color: '#bfffe7',
            label: '2 - 2.5'
        },
        {
            color: '#bee8ff',
            label: '2.5 - 3'
        },
        {
            color: '#bdd2ff',
            label: '3 - 3.5'
        },
        {
            color: '#a0c7fe',
            label: '3.5 - 4'
        },
        {
            color: '#73b2ff',
            label: '4 - 4.5'
        },
        {
            color: '#0078ff',
            label: '4.5 - 5'
        },
        {
            color: '#a3ff74',
            label: '5 - 5.5'
        },
        {
            color: '#78ff00',
            label: '5.5 - 6'
        },
        {
            color: '#ffff01',
            label: '6 - 6.5'
        },
        {
            color: '#fedc00',
            label: '6.5 - 7'
        },
        {
            color: '#ffaa01',
            label: '7 - 7.5'
        },
        {
            color: '#ff8e01',
            label: '7.5 - 8'
        },
        {
            color: '#ff7f7e',
            label: '8 - 8.5'
        },
        {
            color: '#ff5b80',
            label: '8.5 - 9'
        },
        {
            color: '#fe0000',
            label: '9 - 9.5'
        },
        {
            color: '#e60000',
            label: '9.5 - 10'
        },
        {
            color: '#a80000',
            label: ' > 10'
        }
    ]
};
// 风功率密度(W/m2)
const windPower = {
    title: '风功率密度(W/m2)',
    legends: [
        {
            color: '#ffffff',
            label: ' <100 '
        },
        {
            color: '#e1e1e1',
            label: '100 - 150'
        },
        {
            color: '#cccccc',
            label: '150 - 200'
        },
        {
            color: '#b2b2b2',
            label: '200 - 250'
        },
        {
            color: '#72dffe',
            label: '250 - 300'
        },
        {
            color: '#0071fe',
            label: '300 - 350'
        },
        {
            color: '#b6cf8d',
            label: '350 - 400'
        },
        {
            color: '#cbdb82',
            label: '400 - 450'
        },
        {
            color: '#e0e879',
            label: '450 - 500'
        },
        {
            color: '#f3f56e',
            label: '500 - 550'
        },
        {
            color: '#faef5f',
            label: '550 - 600'
        },
        {
            color: '#fdd853',
            label: '600 - 650'
        },
        {
            color: '#fdc24c',
            label: '650 - 700'
        },
        {
            color: '#fcab42',
            label: '700 - 750'
        },
        {
            color: '#f99537',
            label: '750 - 800'
        },
        {
            color: '#f87f30',
            label: '800 - 850'
        },
        {
            color: '#f66828',
            label: '850 - 900'
        },
        {
            color: '#f2501f',
            label: '900 - 950'
        },
        {
            color: '#ee361a',
            label: '950 - 1000'
        },
        {
            color: '#e71514',
            label: ' > 1000'
        }
    ]
};
// 相对湿度(%)
const humidity = {
    title: '相对湿度(%)',
    legends: [
        {
            color: '#cc704b',
            label: ' < 30 '
        },
        {
            color: '#d18450',
            label: '30 - 35'
        },
        {
            color: '#e39e43',
            label: '35 - 40'
        },
        {
            color: '#efbe3e',
            label: '40 - 45'
        },
        {
            color: '#fcd14f',
            label: '45 - 50'
        },
        {
            color: '#fff753',
            label: '50 - 55'
        },
        {
            color: '#c6f74d',
            label: '55 - 60'
        },
        {
            color: '#84e645',
            label: ' 60 - 65 '
        },
        {
            color: '#5dde3b',
            label: '65 - 70'
        },
        {
            color: '#57c06b',
            label: '70 - 75'
        },
        {
            color: '#49b699',
            label: '75 - 80'
        },
        {
            color: '#4794a8',
            label: '80 - 85'
        },
        {
            color: '#2b6b9b',
            label: '85 - 90'
        },
        {
            color: '#0b3782',
            label: ' > 90 '
        }
    ]
};
// 空气密度(kg/m3)
const airDensity = {
    title: '空气密度(kg/m3)',
    legends: [
        {
            color: '#ffff81',
            label: ' <0.75 '
        },
        {
            color: '#cdf964',
            label: '0.75 - 0.8'
        },
        {
            color: '#98f046',
            label: '0.8 - 0.85'
        },
        {
            color: '#61e927',
            label: '0.85 - 0.9'
        },
        {
            color: '#3bd924',
            label: '0.9 - 0.95'
        },
        {
            color: '#3fc353',
            label: '0.95 - 1'
        },
        {
            color: '#37ad79',
            label: '1 - 1.05'
        },
        {
            color: '#27989e',
            label: '1.05 - 1.1'
        },
        {
            color: '#217aa4',
            label: '1.1 - 1.15'
        },
        {
            color: '#215294',
            label: '1.15 - 1.2'
        },
        {
            color: '#1b3187',
            label: '1.2 - 1.25'
        },
        {
            color: '#0d1079',
            label: ' >1.25'
        }
    ]
};
// 土地利用
const landUse = {
    title: '土地利用',
    legends: [
        {
            color: '#a9a800',
            label: ' 水田 '
        },
        {
            color: '#feff73',
            label: ' 旱地'
        },
        {
            color: '#38a700',
            label: ' 有林地'
        },
        {
            color: '#4de600',
            label: ' 灌木林'
        },
        {
            color: '#98e501',
            label: ' 疏林地'
        },
        {
            color: '#e7e600',
            label: ' 其它林地'
        },
        {
            color: '#55ff00',
            label: ' 高覆盖度草地'
        },
        {
            color: '#d0ff73',
            label: ' 中覆盖度草地'
        },
        {
            color: '#e9ffbe',
            label: ' 低覆盖度草地'
        },
        {
            color: '#00a8e6',
            label: ' 河渠'
        },
        {
            color: '#004da7',
            label: ' 湖泊'
        },
        {
            color: '#73004d',
            label: ' 水库坑塘'
        },
        {
            color: '#aa00e5',
            label: ' 永久性冰雪'
        },
        {
            color: '#d7b19e',
            label: ' 滩涂'
        },
        {
            color: '#d69e9d',
            label: ' 滩地'
        },
        {
            color: '#fe0000',
            label: ' 城镇用地'
        },
        {
            color: '#e69800',
            label: ' 农村居民点'
        },
        {
            color: '#febebe',
            label: ' 其它建设用地'
        },
        {
            color: '#ffffbf',
            label: ' 沙地'
        },
        {
            color: '#ffebb0',
            label: ' 戈壁'
        },
        {
            color: '#d69dbd',
            label: ' 盐碱地'
        },
        {
            color: '#9eabd8',
            label: ' 沼泽地'
        },
        {
            color: '#f5ca7b',
            label: ' 裸土地'
        },
        {
            color: '#cd6667',
            label: ' 裸岩石质地'
        },
        {
            color: '#ffbee8',
            label: ' 其它未利用地'
        },
        {
            color: '#002573',
            label: ' 海洋'
        }
    ]
};
// 高程
const dem = {
    title: '高程',
    legends: [
        {
            color: '#cff9c9',
            label: ' < 0 '
        },
        {
            color: '#e9fcce',
            label: ' 0 - 100'
        },
        {
            color: '#e3e99f',
            label: ' 100 - 200'
        },
        {
            color: '#0a8b36',
            label: ' 200 - 400'
        },
        {
            color: '#36984b',
            label: ' 400 - 600'
        },
        {
            color: '#82a155',
            label: ' 600 - 800'
        },
        {
            color: '#c2b856',
            label: ' 800 - 1000'
        },
        {
            color: '#faa83a',
            label: ' 1000 - 1500'
        },
        {
            color: '#bc5f24',
            label: ' 1500 - 2000'
        },
        {
            color: '#9b1d11',
            label: ' 2000 - 2500'
        },
        {
            color: '#7e2515',
            label: ' 2500 - 3000'
        },
        {
            color: '#6c3715',
            label: ' 3000 - 3500 '
        },
        {
            color: '#72471c',
            label: ' 3500 - 4000'
        },
        {
            color: '#916a59',
            label: ' 4000 - 4500'
        },
        {
            color: '#b5ab9f',
            label: ' 4500 - 5000'
        },
        {
            color: '#c8cdc9',
            label: ' 5000 - 5500'
        },
        {
            color: '#e4e4e4',
            label: ' 5500 - 6000'
        },
        {
            color: '#ffffff',
            label: ' > 6000 '
        }
    ]
};
// 坡度
const slope = {
    title: '坡度',
    legends: [
        {
            color: '#6bab3b',
            label: ' 0 - 1 '
        },
        {
            color: '#71b430',
            label: ' 1 - 2'
        },
        {
            color: '#81bd39',
            label: ' 2 - 3 '
        },
        {
            color: '#93c647',
            label: ' 3 - 4 '
        },
        {
            color: '#a4cf41',
            label: ' 4 - 5 '
        },
        {
            color: '#b6d845',
            label: ' 5 - 6 '
        },
        {
            color: '#cce645',
            label: ' 6 - 8 '
        },
        {
            color: '#dcea4c',
            label: ' 8 - 10 '
        },
        {
            color: '#f2f158',
            label: ' 10 - 12 '
        },
        {
            color: '#ffec48',
            label: ' 12 - 15 '
        },
        {
            color: '#ffd63c',
            label: ' 15 - 18 '
        },
        {
            color: '#f6c24a',
            label: ' 18 - 20 '
        },
        {
            color: '#f4aa2f',
            label: ' 20 - 30 '
        },
        {
            color: '#f3912e',
            label: ' 30 - 40 '
        },
        {
            color: '#f1772e',
            label: ' 40 - 50 '
        },
        {
            color: '#f26122',
            label: ' 50 - 60 '
        },
        {
            color: '#ea4623',
            label: ' 60 - 70 '
        },
        {
            color: '#ef411f',
            label: ' > 70 '
        }
    ]
};
// 自然保护区
const naturalReserve = {
    title: '自然保护区',
    legends: [
        {
            img: naturalReserveImg,
            label: '自然保护区'
        }
    ]
};
// 雷暴日数平均值
const thunderStormAvg = {
    title: '雷暴平均值',
    legends: [
        {
            color: '#56a0d1',
            label: ' < 10 '
        },
        {
            color: '#6ca7c9',
            label: ' 10 - 15'
        },
        {
            color: '#7ab2c1',
            label: ' 15 - 20'
        },
        {
            color: '#85b7b8',
            label: ' 20 - 25'
        },
        {
            color: '#9cc2b7',
            label: ' 25 - 30'
        },
        {
            color: '#b0c6af',
            label: ' 30 - 35'
        },
        {
            color: '#bbd0a7',
            label: ' 35 - 40'
        },
        {
            color: '#ccd8aa',
            label: ' 40 - 45'
        },
        {
            color: '#dbe0a8',
            label: ' 45 - 50'
        },
        {
            color: '#eee997',
            label: ' 50 - 55'
        },
        {
            color: '#f8f197',
            label: ' 55 - 60'
        },
        {
            color: '#fbf182',
            label: ' 60 - 65'
        },
        {
            color: '#f9e27a',
            label: ' 65 - 70'
        },
        {
            color: '#f2d464',
            label: ' 70 - 75'
        },
        {
            color: '#f6be6b',
            label: ' 75 - 80'
        },
        {
            color: '#f4b162',
            label: ' 80 - 85'
        },
        {
            color: '#f29f51',
            label: ' 85 - 90'
        },
        {
            color: '#eb9143',
            label: ' 90 - 95'
        },
        {
            color: '#e98142',
            label: ' 95 - 100'
        },
        {
            color: '#e06e38',
            label: ' 100 - 110'
        },
        {
            color: '#dd5940',
            label: ' 110 - 120'
        },
        {
            color: '#da4421',
            label: ' > 120 '
        }
    ]
};

// 雷暴日数极值
const thunderStormMax = {
    title: '雷暴极值',
    legends: thunderStormAvg.legends
};

// 结冰日数平均值
const freezeAvg = {
    title: '结冰平均值',
    legends: [
        {
            color: '#438524',
            label: ' < 5 '
        },
        {
            color: '#61ae3c',
            label: ' 5 - 10'
        },
        {
            color: '#67bf37',
            label: ' 10 - 20'
        },
        {
            color: '#69e17f',
            label: ' 20 - 40'
        },
        {
            color: '#6bdf8c',
            label: ' 40 - 60'
        },
        {
            color: '#76e9a6',
            label: ' 60 - 80'
        },
        {
            color: '#68ecbb',
            label: ' 80 - 100'
        },
        {
            color: '#72e8da',
            label: ' 100 - 120'
        },
        {
            color: '#64eee1',
            label: ' 120 - 140 '
        },
        {
            color: '#6df6ff',
            label: ' 140 - 160'
        },
        {
            color: '#5fe0fd',
            label: ' 160 - 180'
        },
        {
            color: '#63d0fb',
            label: ' 180 - 200'
        },
        {
            color: '#68b9ee',
            label: ' 200 - 220'
        },
        {
            color: '#5aaeee',
            label: ' 220 - 240'
        },
        {
            color: '#4f8eed',
            label: ' 240 - 260'
        },
        {
            color: '#3c81e9',
            label: ' 260 - 280'
        },
        {
            color: '#3364ed',
            label: ' 280 - 300'
        },
        {
            color: '#1759e3',
            label: ' 300 - 320'
        },
        {
            color: '#0844c9',
            label: ' > 320 '
        }
    ]
};

// 结冰日数极值
const freezeMax = {
    title: '结冰极值',
    legends: freezeAvg.legends
};

// 沙暴日数平均值
const sandStormAvg = {
    title: '沙尘暴平均值',
    legends: [
        {
            color: '#fff997',
            label: ' 0 - 1 '
        },
        {
            color: '#faee9c',
            label: ' 1 - 2'
        },
        {
            color: '#f6e37a',
            label: ' 2 - 3'
        },
        {
            color: '#f5d570',
            label: ' 3 - 5'
        },
        {
            color: '#f3c967',
            label: ' 5 - 10'
        },
        {
            color: '#f0b863',
            label: ' 10 - 15'
        },
        {
            color: '#ddac43',
            label: ' 15 - 20'
        },
        {
            color: '#ce8d3d',
            label: ' 20 - 25'
        },
        {
            color: '#b6712c',
            label: ' 25 - 30 '
        },
        {
            color: '#a8571f',
            label: ' 30 - 35'
        },
        {
            color: '#8a391b',
            label: ' 35 - 40'
        },
        {
            color: '#7a180b',
            label: ' > 40'
        }
    ]
};

// 沙暴日数极值
const sandStormMax = {
    title: '沙尘暴极值',
    legends: sandStormAvg.legends
};
// 最低气温
const lowTemperatureAvg = {
    title: '最低气温平均值',
    legends: [
        {
            color: '#476dd2',
            label: ' < -40 '
        },
        {
            color: '#6e8cc8',
            label: ' -40 - -35'
        },
        {
            color: '#909ad5',
            label: ' -35 - -30'
        },
        {
            color: '#9caacf',
            label: ' -30 - -25'
        },
        {
            color: '#b9bbd2',
            label: ' -25 - -20'
        },
        {
            color: '#c7d5d5',
            label: ' -20 - -15'
        },
        {
            color: '#e3e3d9',
            label: ' -15 - -10'
        },
        {
            color: '#fffccf',
            label: ' -10 - -8 '
        },
        {
            color: '#fefdcd',
            label: ' -8 - -5 '
        },
        {
            color: '#fde1af',
            label: ' -5 - -3'
        },
        {
            color: '#f8c99b',
            label: ' -3 - 0'
        },
        {
            color: '#e7bb94',
            label: ' 0 - 3'
        },
        {
            color: '#e6a07e',
            label: ' 3 - 5'
        },
        {
            color: '#da8f6f',
            label: ' 5 - 10'
        },
        {
            color: '#c5735b',
            label: ' 10 - 15'
        },
        {
            color: '#c6624a',
            label: ' > 15'
        }
    ]
};
// 最低气温极值
const lowTemperatureMax = {
    title: '最低气温极值',
    legends: lowTemperatureAvg.legends
};
// 最高气温平均值
const highTemperatureAvg = {
    title: '最高气温平均值',
    legends: [
        {
            color: '#ffffff',
            label: ' < 20 '
        },
        {
            color: '#fefdcd',
            label: ' 20 - 22 '
        },
        {
            color: '#fffb8f',
            label: ' 22 - 24 '
        },
        {
            color: '#fff84a',
            label: ' 24 - 26'
        },
        {
            color: '#f8e549',
            label: ' 26 - 28 '
        },
        {
            color: '#fdd542',
            label: ' 28 - 30 '
        },
        {
            color: '#fbc944',
            label: ' 30 - 32 '
        },
        {
            color: '#f2b946',
            label: ' 32 - 34 '
        },
        {
            color: '#f19e40',
            label: ' 34 - 35 '
        },
        {
            color: '#f28528',
            label: ' 35 - 36 '
        },
        {
            color: '#ed7924',
            label: ' 36 - 37 '
        },
        {
            color: '#e55530',
            label: ' 37 - 38 '
        },
        {
            color: '#f75628',
            label: ' 38 - 39 '
        },
        {
            color: '#e94428',
            label: ' 39 - 40 '
        },
        {
            color: '#e83725',
            label: ' 40 - 41 '
        },
        {
            color: '#bc3019',
            label: ' 41 - 42 '
        },
        {
            color: '#b12919',
            label: ' 42 - 43 '
        },
        {
            color: '#871713',
            label: ' > 43 '
        }
    ]
};
// 最高气温极值
const highTemperatureMax = {
    title: '最高气温极值',
    legends: highTemperatureAvg.legends
};
// 数据类型和图例映射
const mapping = {
    [AIR_DENSITY]: airDensity,
    [DEM_1KM]: dem,
    [FREEZE_AVG]: freezeAvg,
    [FREEZE_MAX]: freezeMax,
    [HIGH_TEMPERATURE_AVG]: highTemperatureAvg,
    [HIGH_TEMPERATURE_MAX]: highTemperatureMax,
    [LOW_TEMPERATURE_AVG]: lowTemperatureAvg,
    [LOW_TEMPERATURE_MAX]: lowTemperatureMax,
    [HUMIDITY_80]: humidity,
    [LAND_USE_1KM]: landUse,
    [NATURAL_RESERVE]: naturalReserve,
    [SAND_STORM_AVG]: sandStormAvg,
    [SAND_STORM_MAX]: sandStormMax,
    [THUNDER_STORM_AVG]: thunderStormAvg,
    [THUNDER_STORM_MAX]: thunderStormMax,
    [WIND_SPEED_80]: windSpeed,
    [WIND_SPEED_100]: windSpeed,
    [WIND_POWER_80]: windPower,
    [WIND_POWER_100]: windPower,
    [SLOPE_1KM]: slope
};

/**
 * 获取图例
 * @param {string} dataType
 * @return {Object}
 */
export const getLegend = dataType => mapping[dataType];

export default mapping;
