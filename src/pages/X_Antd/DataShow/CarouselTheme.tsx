import React, { createElement, useState } from "react";
import { Carousel, Radio } from 'antd';

export default class CarouselTheme extends React.Component {
	state = {
		dotPosition: 'top',
	};

	handlePositionChange = ({ target: { value: dotPosition } }) => this.setState({ dotPosition });

	render() {
		const { dotPosition } = this.state;
		return (
			<div>
				<Radio.Group
					onChange={this.handlePositionChange}
					value={dotPosition}
					style={{ marginBottom: 8 }}
				>
					<Radio.Button value="top">Top</Radio.Button>
					<Radio.Button value="bottom">Bottom</Radio.Button>
					<Radio.Button value="left">Left</Radio.Button>
					<Radio.Button value="right">Right</Radio.Button>
				</Radio.Group>
				<Carousel dotPosition={dotPosition} style={{height: 160, lineHeight: "160px", textAlign: "center"}}>
					<div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
				</Carousel>
			</div>
		);
	}
}

