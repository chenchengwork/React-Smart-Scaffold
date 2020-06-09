import React from 'react';
import { message, Button, Space } from 'antd';

const success = () => {
	message.success('This is a success message');
};

const error = () => {
	message.error('This is an error message');
};

const warning = () => {
	message.warning('This is a warning message');
};

const MessageTheme: React.FC = () => {

	return (
		<Space>
			<Button onClick={success}>Success</Button>
			<Button onClick={error}>Error</Button>
			<Button onClick={warning}>Warning</Button>
		</Space>
	)
}

export default MessageTheme;
