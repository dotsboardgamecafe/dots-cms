
// These are endpoints that will be used to call Backend endpoints services
const endpointData = {

	// GET
	getMembers: { path: '/users', method: 'GET', prefix: '' },
	getAdmins: { path: '/admins', method: 'GET', prefix: '' },
	getGames: { path: '/games', method: 'GET', prefix: '' },
	getRooms: { path: '/rooms', method: 'GET', prefix: '' },
	getCafes: { path: '/cafes', method: 'GET', prefix: '' },
	getRoomDetail: { path: '/rooms', method: 'GET', prefix: '' },

	// POST
	auth: { path: '/auths/login', method: 'POST', prefix: '' },
	upload: { path: '/uploads', method: 'POST', prefix: '' },
	login: { path: '/auths/login', method: 'POST', prefix: '' },
	addGame: { path: '/games', method: 'POST', prefix: '' },
	createRoom: { path: '/rooms', method: 'POST', prefix: '' },

	// PUT
	changeStatusMember: { path: '/users', method: 'PUT', prefix: 'status' },
	updateRoom: { path: '/rooms', method: 'PUT', prefix: '' },
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
