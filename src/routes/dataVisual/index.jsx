/**
 * Created by chencheng on 17-8-30.
 */
import EnumRouter from 'constants/EnumRouter';
import { AssembleRoute } from 'routes/routeTool';
import BigScreen from './routes/bigScreen';


export default AssembleRoute([
    {
        path:EnumRouter.dVisual_bigScreen,
        component:BigScreen,
    }
])

