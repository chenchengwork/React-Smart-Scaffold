import CreateStore from './CreateStore';
import ListStore from './ListStore';

export { CreateStore };
export { ListStore };

export interface storeType {
        listStore: ListStore,
        createStore: CreateStore,
}
