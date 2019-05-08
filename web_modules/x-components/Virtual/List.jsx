import React from 'react';
import { AutoSizer, List as VList } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

// List data as an array of strings
const list = [
    '大数据量列表'
    // And so on...
];

function rowRenderer ({ key, index, style }) {
    return (
        <div
            key={key}
            style={style}
        >
            {list[index]}
        </div>
    )
}

const List = () => {
    for(let i = 0; i < 1000; i++){
        list.push("大数据量列表")
    }

    return (
        <div style={{height: 300}}>
            <AutoSizer defaultHeight={100}>
                {({ height, width }) => (
                    <VList
                        height={height}
                        rowCount={list.length}
                        rowHeight={20}
                        rowRenderer={rowRenderer}
                        width={width}
                    />
                )}
            </AutoSizer>
        </div>
    )
}

export default List;
