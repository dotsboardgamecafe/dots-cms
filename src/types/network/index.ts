export interface ResponseStatus {
	stat_code?: string;
	stat_msg?: string;
}
export interface ResponseType<T> extends ResponseStatus {
	data: T;
	pagination: Pagination;
}

export interface Pagination {
	count?: number;
	keyword?: string;
	limit?: number;
	offset?: number;
	order?: string;
	page?: number;
	post_type?: string;
	sort?: 'DESC' | 'ASC' | `${'ASC' | 'DESC'},${'ASC' | 'DESC'}`;
	status?: string;
	search?: string;
	tag?: string;
	total_page?: number;
}

export enum StatusCode {
	SUCCESS = 200,
	FAILED = 400,
}

export type RequestOptionGenericType<T> = {
	pagination?: Pagination;
	payload?: T;
	queryParam?: Record<any, any>;
	id?: number | string;
};