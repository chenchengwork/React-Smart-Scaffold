import React, { useRef } from "react";
import { Scrollbars, ScrollbarProps } from "react-custom-scrollbars";

const defaultStyle = {
	height: "100%",
	width: "100%",
	overflowX: "hidden"
};

interface AutoScrollbarsProps extends ScrollbarProps{
	style?: React.CSSProperties;
}

const AutoScrollbars: React.FC<AutoScrollbarsProps> = ({style,children, ...rest}) => {
	const scrollRef = useRef(null);

	const newStyle = Object.assign({},defaultStyle, style);

	const onScrollStop = () => {
		// @ts-ignore
		rest.onScrollStop && rest.onScrollStop(scrollRef.current.getScrollTop(), scrollRef.current.getClientHeight())
	}

	return (
		<Scrollbars
			ref={scrollRef}
			onScrollStop={onScrollStop}
			renderTrackHorizontal={({ style, ...props }) => {
				const finalStyle = {
					...style,
					right: 2,
					bottom: 2,
					left: 2,
					borderRadius: 3
				};

				return newStyle.overflowX === "hidden" ? <div /> : <div style={finalStyle} {...props} />;
			}}

			{...rest}

		>
			{children}
		</Scrollbars>
	)
};

AutoScrollbars.defaultProps = {
	autoHide: true,
	autoHideTimeout: 1000,
	autoHideDuration: 200,
	thumbMinSize: 0,
};

export default AutoScrollbars;
