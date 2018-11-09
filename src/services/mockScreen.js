// TODO 是测试用的,实际生产可以把文件删除

import { helper, localStore } from 'utils/T';

const mockStoreKey = "test_mockScreenKey";

const defaultData = {count: 0, rows: []};

export const getPageList = () => {

    const data  = localStore.get(mockStoreKey);

    return helper.mockData(data || defaultData);
};

export const getItem = (screen_id) => {
    const data = localStore.get(mockStoreKey) || defaultData;

    return helper.mockData(data.rows[screen_id]);
};

export const createItem = (params) => {
    const data = localStore.get(mockStoreKey) || defaultData;

    data.rows.push(params);
    data.count = data.rows.length;

    localStore.set(mockStoreKey, data);

    return helper.mockData();
};

export const updateItem = (screen_id, params) => {
    const data = localStore.get(mockStoreKey) || defaultData;

    data.rows[screen_id] = params;

    localStore.set(mockStoreKey, data);

    return helper.mockData();
};

export const deleteItem = (screen_id) => {
    localStore.remove(screen_id);

    return helper.mockData();
};
