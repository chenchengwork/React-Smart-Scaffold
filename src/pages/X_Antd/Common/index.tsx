import LayoutRender from '../LayoutRender';

export default () => (<LayoutRender
	components={[
		{
			title: "Button",
			colSpan: 6,
			Com: require("./ButtonTheme").default,
		}
	]}
/>)
