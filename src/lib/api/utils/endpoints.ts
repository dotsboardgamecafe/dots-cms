
// These are endpoints that will be used to call Backend endpoints services
const endpointData = {

	// GET
	getMembers: { path: '/users', method: 'GET', prefix: '' },
	getAdmins: { path: '/admins', method: 'GET', prefix: '' },

	// POST
	auth: { path: '/auths/login', method: 'POST', prefix: '' },
	upload: { path: '/api/upload', method: 'POST', prefix: '' },
	login: { path: '/auths/login', method: 'POST', prefix: '' },

	// PUT
	changeStatusMember: { path: '/users', method: 'PUT', prefix: 'status' },
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
