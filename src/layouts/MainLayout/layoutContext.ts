import { createContext } from "react";
import {theme } from './theme';

interface layoutCtxInterface {
    theme?: typeof theme;
    leftMenuCollapsed: boolean;
    handleLeftMenuCollapse: () => void;
}

export const LayoutCtx = createContext<layoutCtxInterface>({
    leftMenuCollapsed: false,
    handleLeftMenuCollapse: () => {},
});
