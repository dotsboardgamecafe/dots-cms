import { Pagination } from '@/types/network';

const generateQueryString = ( obj: Pagination ) => {
	const str: string[] = [];
	for ( const p in obj ) {
		str.push( p + '=' + encodeURIComponent( obj[ p as keyof Pagination ] ?? '' ) );
	}
	return str.join( '&' );
};

export default generateQueryString;