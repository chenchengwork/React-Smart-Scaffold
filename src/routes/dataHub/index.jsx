/**
 * Created by chencheng on 17-8-30.
 */
import EnumRouter from 'constants/EnumRouter';
import { AssembleRoute } from 'routes/routeTool';

import PluginManage from './routes/pluginManage';
import HostMonitor from './routes/resourceMonitor/host';
import PluginMonitor from './routes/resourceMonitor/plugin';


export default AssembleRoute([
    {
        path:EnumRouter.dHub_pluginManage,
        component:PluginManage,
    },
    {
        path:EnumRouter.dHub_hostMonitor,
        component:HostMonitor,
    },
    {
        path:EnumRouter.dHub_pluginMonitor,
        component:PluginMonitor,
    },
])

