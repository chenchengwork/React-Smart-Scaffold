import React from "react";
import { Radio } from 'antd';

export default class RadioTheme extends React.Component {
	state = {
		value: 1,
	};

	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};

	render() {
		return (
			<div>
				<Radio.Group onChange={this.onChange} value={this.state.value}>
					<Radio value={1}>A</Radio>
					<Radio value={2}>B</Radio>
					<Radio value={3}>C</Radio>
					<Radio value={4}>D</Radio>
				</Radio.Group>

				<Radio defaultChecked={false} disabled>
					Disabled
				</Radio>
				<Radio defaultChecked disabled>
					Disabled
				</Radio>
			</div>
		);
	}
}
