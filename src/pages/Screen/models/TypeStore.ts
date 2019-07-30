import CreateStore from './CreateStore';
import ListStore from './ListStore';

export { CreateStore };
export { ListStore };

export interface typeStore {
        listStore: ListStore,
        createStore: CreateStore,
}
