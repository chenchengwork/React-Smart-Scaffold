import {
    useReducer,
} from 'react';

const initialState = {count: 0};

export default function UseReducerHook() {
    // 非常有用，能够替代一部分redux的功能
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>数量: {state.count}</p>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </div>
    );
}


function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
}
