import "./Table.scss";
import { Table } from 'antd';

/**
 * 表格
 * @param rest
 * @returns {*}
 * @constructor
 */
const Tj_Table = ({...rest}) => {
    const props = Object.assign({},rest);

    return <div className="tj-table"><Table {...props} /> </div>;
};

export default Tj_Table;
