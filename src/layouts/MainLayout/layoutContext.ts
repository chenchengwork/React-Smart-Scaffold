import { createContext } from "react";

interface layoutCtxInterface {
	appMenuLeftWidth?: number;
	leftMenuCollapsed: boolean;
	handleLeftMenuCollapse: () => void;
}

export const LayoutCtx = createContext<layoutCtxInterface>({
	leftMenuCollapsed: false,
	handleLeftMenuCollapse: () => {},
});
