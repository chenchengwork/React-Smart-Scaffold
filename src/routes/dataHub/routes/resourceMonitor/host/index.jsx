/**
 * Created by chencheng on 17-8-8.
 */
import { connect } from 'react-redux';
import Host from '../../../components/ResourceMonitor/Host';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    };
};

const HostComponent = connect(mapStateToProps)(Host);

export default () => <HostComponent />;
