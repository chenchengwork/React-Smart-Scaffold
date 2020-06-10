import React from "react";
import { TimePicker } from 'antd';
import moment from 'moment';

function onChange(time, timeString) {
	console.log(time, timeString);
}

const TimePickerTheme: React.FC = () => {

	return (
		<TimePicker onChange={onChange} defaultValue={moment('00:00:00', 'HH:mm:ss')} />
	);
};

export default TimePickerTheme;
