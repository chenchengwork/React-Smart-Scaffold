/**
 * Created by chencheng on 17-8-8.
 */
import { connect } from 'react-redux';
import PluginManage from '../../components/PluginManage';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    };
};

const PluginManageComponent = connect(mapStateToProps)(PluginManage);

export default () => <PluginManageComponent />;
