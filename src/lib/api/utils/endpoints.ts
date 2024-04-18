
// These are endpoints that will be used to call Backend endpoints services
const endpointData = {
	auth: { path: '/auths/login', method: 'POST' },

	// GET



	// POST

} as const;

// Typing schema, do not modify if not necessary

type EndpointDefinition<T extends string> = {
	[ key in T ]: {
		method: 'GET' | 'POST' | 'PUT' | 'DELETE';
		path: string;
		payload?: any;
		params?: any;
	};
};
export type EndpointKey = keyof typeof endpointData;

export type EndpointDefs = EndpointDefinition<EndpointKey>;

const endpoints = endpointData;

export default endpoints;
