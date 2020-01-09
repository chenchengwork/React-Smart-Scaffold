// TODO 是测试用的,实际生产可以把文件删除

import { helper, localStore } from '@/utils/T';

const mockStoreKey = "test_mockScreenKey";

const defaultData = {count: 0, rows: Array()};

const mkScreenId = () => "id_" + Date.now()

export const getPageList = ()  => {

    const data  = localStore.get(mockStoreKey);

    return helper.mockData(data || defaultData);
};

export const getItem = (screen_id: string) => {
    const data = localStore.get(mockStoreKey) || defaultData;

    for(let i = 0; i < data.rows.length; i++){
        const row = data.rows[i];
        if(row.id == screen_id){
            return helper.mockData(row);
        }
    }
};

export const createItem = (params: {[index: string]: any}) => {
    const data = localStore.get(mockStoreKey) || defaultData;

    params.id = mkScreenId();
    data.rows.push(params);
    data.count = data.rows.length;

    localStore.set(mockStoreKey, data);

    return helper.mockData();
};

export const updateItem = (screen_id: string, params: {[index: string]: any}) => {
    const data = localStore.get(mockStoreKey) || defaultData;

    for(let i = 0; i < data.rows.length; i++){
        const row = data.rows[i];
        if(row.id == screen_id){
            data.rows[i] = {
                id: screen_id,
                ...params
            };
            break;
        }
    }

    localStore.set(mockStoreKey, data);
    return helper.mockData();
};

export const deleteItem = (screen_ids: string[]) => {
    const data = localStore.get(mockStoreKey) || defaultData;
    const newData = {count: 0, rows: Array()};
    for(let i = 0; i < data.rows.length; i++){
        const row = data.rows[i];
        if(screen_ids.indexOf(row.id) === -1 ){
            newData.rows.push(row);
        }
    }

    newData.count = newData.rows.length;
    localStore.set(mockStoreKey, newData);

    return helper.mockData();
};
