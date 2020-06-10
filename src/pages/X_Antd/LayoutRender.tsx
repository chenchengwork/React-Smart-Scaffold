import React from 'react';
import { Row, Col, Card } from 'antd';
import { MainContent } from '@/layouts/MainLayout';

const LayoutRender: React.FC<{components: any[]}> = ({ components }) => {

	return (
		<MainContent isShowMainHeader={false}>
			<Row gutter={5}>
				{components.map(({title, colSpan, Com}, index) => (
					<Col key={index} span={colSpan}>
						<Card size="small" title={title}>
							<Com />
						</Card>
					</Col>
				))}
			</Row>
		</MainContent>
	)
};

export default LayoutRender;
