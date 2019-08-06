/**
 * 入口文件
 */
import React  from "react";
import ReactDOM from "react-dom";

import lazyScreen from '@/utils/loadable/lazyScreen';
const Main = lazyScreen(import("./Main"));

ReactDOM.render(<Main />, document.getElementById("wrapper"));


