import React from "react";
import { Collapse, Row, Col, Card } from 'antd';
import { MainContent } from '@/layouts/MainLayout'
import commonComponents from './common';
import navigationComponents from './navigation';
import dataEntryComponents from './dataEntry';
import dataShowComponents from './dataShow';
import feedbackComponents from './feedback';

const X_Antd: React.FC = () => {

	const renderComponents = (components: any[]) => {
		return (
			<Row gutter={5}>
				{components.map(({title, colSpan, Com}, index) => (
					<Col key={index} span={colSpan}>
						<Card size="small" title={title}>
							<Com />
						</Card>
					</Col>
				))}
			</Row>
		)
	};

	return (
		<MainContent isShowMainHeader={false}>
			<Collapse defaultActiveKey={['5']}>
				<Collapse.Panel header="通用组件" key="1">
					{renderComponents(commonComponents)}
				</Collapse.Panel>
				<Collapse.Panel header="导航组件" key="2">
					{renderComponents(navigationComponents)}
				</Collapse.Panel>
				<Collapse.Panel header="数据录入" key="3">
					{renderComponents(dataEntryComponents)}
				</Collapse.Panel>
				<Collapse.Panel header="数据展示" key="4">
					{renderComponents(dataShowComponents)}
				</Collapse.Panel>
				<Collapse.Panel header="反馈" key="5">
					{renderComponents(feedbackComponents)}
				</Collapse.Panel>
			</Collapse>
		</MainContent>
	);
};

export default X_Antd;
