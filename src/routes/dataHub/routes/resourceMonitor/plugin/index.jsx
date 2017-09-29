/**
 * Created by chencheng on 17-8-8.
 */
import { connect } from 'react-redux';
import Plugin from '../../../components/ResourceMonitor/Plugin';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    };
};

const PluginComponent = connect(mapStateToProps)(Plugin);

export default () => <PluginComponent />;
