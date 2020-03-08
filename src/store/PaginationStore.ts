import {action, observable} from 'mobx';

export default class PaginationStore {
	@observable loading = true;
	@observable currentPage = 1;
	@observable pageSize = 10;
	@observable.ref pageSizeOptions = ['10', '20', '30', '40', '50'];

	@action
	setCurrentPage = (current: number) => this.currentPage = current;

	@action
	setPageSize = (pageSize: number) => this.pageSize = pageSize;

	@action
	setPageSizeOptions = (pageSizeOptions: string[]) => this.pageSizeOptions = pageSizeOptions;

	@action
	getPageListParams = () => ({
		page: this.currentPage,
		size: this.pageSize,
	})
}
