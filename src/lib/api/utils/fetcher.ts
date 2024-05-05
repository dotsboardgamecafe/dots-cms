
import { config } from '@/constant/config';
import { cookiesHelper } from '@/helper';
import generateQueryString from '@/helper/generateQueryString';

import endpoints, { EndpointKey } from './endpoints';

import { Pagination, ResponseType as SuccessResponse } from '@/types/network';

export type ApiOptions<T = unknown> = {
	body?: T,
	param?: string;
	query?: Record<string, unknown>,
	pagination?: Pagination;
	isUpload?: boolean;
	requestOpt?: RequestInit;
	limit?: number;
	language?: string;
	overideLang?: 'en' | 'idn';
};

const baseUrl = config.baseUrl ?? 'localhost:3000/v1';

const fetcher = async <Response> ( endpointKey: EndpointKey, options?: ApiOptions ): Promise<SuccessResponse<Response>> => {
	const endpoint = endpoints[ endpointKey ];
	const fetchOpt: Record<string, unknown> = {};
	const safeQueryParam = options?.query ?? {};
	const safePagination = options?.pagination ?? {};
	const Authorization = await cookiesHelper.getToken();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const headers: Record<string, any> = {
		...Authorization ? { Authorization } : {},
		'X-Actor-Type': 'admin',
		'User-Agent': 'PostmanRuntime/7.37.3'
	};
	// if ( !options?.isUpload ) {
	// 	headers[ 'Content-Type' ] = 'application/json';
	// }

	let url = baseUrl + endpoint.path;

	if ( options?.param ) {
		url += `/${options.param}`;
	}
	if ( endpoint.prefix ) {
		url += `/${endpoint.prefix}`;
	}

	url += '?' + generateQueryString( {
		...safeQueryParam,
		...safePagination
	} );

	if ( options && options.body ) {
		fetchOpt[ 'body' ] = options.isUpload ? options.body : JSON.stringify( options.body );
	}

	const res = await fetch( url, {
		method: endpoint.method,
		headers,
		...fetchOpt,
		...options?.requestOpt
	} );
	const response = await res.json();

	if ( !res.ok ) {
		if ( typeof window === 'undefined' ) { // check the origin of the caller is server rendered / client rendered
			// just use console.error since throw, would result in crashing the service
			// eslint-disable-next-line no-console
			console.error( { endpoint, response, options } );
		} else {
			// if client rendered we can safely use throw
			// throw new Error( response.stat_msg );
		}
	}

	// Check if the endpoint def have payload def or not if yes then return typed response
	return response;

};

export default fetcher;