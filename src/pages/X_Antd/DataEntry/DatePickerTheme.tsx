import React from "react";
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const DatePickerTheme: React.FC = () => {

	return (
		<div>
			<DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
			<br />
			<br />
			<DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
			<br />
			<br />
			<DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" />
			<br />
			<br />
			<RangePicker
				defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
				format={dateFormat}
			/>
		</div>
	);
};

export default DatePickerTheme;
