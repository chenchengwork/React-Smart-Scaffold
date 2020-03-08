import React from "react";
import { observer } from 'mobx-react-lite';
import Sk_Pagination, { PaginationProps } from '@/components/sk_antd/Sk_Pagination'
import { ListStoreType } from "./model/ListStore";

interface DemoPaginationProps extends PaginationProps{
	listStore: ListStoreType;
}

const DemoPagination: React.FC<DemoPaginationProps> = ({listStore, ...rest}) => {
	const { currentPage, pageSize } = listStore;
	const { totalCount } = listStore.data;

	return (
		<Sk_Pagination
			current={currentPage}
			total={totalCount}
			pageSize={pageSize}
			showSizeChanger={true}
			showQuickJumper={true}
			onChange={(page) => {
				listStore.fetchPageList(page);
			}}
			onShowSizeChange={(current,size) => {
				listStore.setPageSize(size);
				listStore.fetchPageList();
			}}
			{...rest}
		/>
	)
};

export default observer(DemoPagination);
