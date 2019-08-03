import { createContext } from "react";

export const LayoutCtx = createContext({
    leftMenuCollapsed: false,
    handleLeftMenuCollapse: () => {},
});
