/**
 * 入口文件
 */
import * as React  from "react";
import * as ReactDOM from "react-dom";

import lazyScreen from '@/utils/loadable/lazyScreen';
const Main = lazyScreen(import("./Main"));

ReactDOM.render(<Main />, document.getElementById("wrapper"));


