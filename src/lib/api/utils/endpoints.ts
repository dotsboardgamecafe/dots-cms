
// These are endpoints that will be used to call Backend endpoints services
const endpointData = {

	// GET
	getMembers: { path: '/users', method: 'GET', prefix: '' },
	getAdmins: { path: '/admins', method: 'GET', prefix: '' },
	getGames: { path: '/games', method: 'GET', prefix: '' },
	getRooms: { path: '/rooms', method: 'GET', prefix: '' },
	getCafes: { path: '/cafes', method: 'GET', prefix: '' },
	getRoomDetail: { path: '/rooms', method: 'GET', prefix: '' },
	getTournaments: { path: '/tournaments', method: 'GET', prefix: '' },
	getTiers: { path: '/tiers', method: 'GET', prefix: '' },
	getBanners: { path: '/banners', method: 'GET', prefix: '' },
	getSettings: { path: '/settings', method: 'GET', prefix: '' },
	getBadges: { path: '/badges', method: 'GET', prefix: '' },
	getRewards: { path: '/rewards', method: 'GET', prefix: '' },
	getTournamentBadgeDetails: { path: '/tournament-badges', method: 'GET', prefix: '' },
	getUserInvoices: { path: '/invoices', method: 'GET', prefix: 'history' },
	getGameMechanics: { path: '/game-mechanics', method: 'GET', prefix: '' },

	// POST
	auth: { path: '/auths/login', method: 'POST', prefix: '' },
	upload: { path: '/uploads', method: 'POST', prefix: '' },
	login: { path: '/auths/login', method: 'POST', prefix: '' },
	addGame: { path: '/games', method: 'POST', prefix: '' },
	createRoom: { path: '/rooms', method: 'POST', prefix: '' },
	addBanner: { path: '/banners', method: 'POST', prefix: '' },
	addCafe: { path: '/cafes', method: 'POST', prefix: '' },
	addBadges: { path: '/badges', method: 'POST', prefix: '' },
	addTournamentBadge: { path: '/tournament-badges', method: 'POST', prefix: '' },
	addTournaments: { path: '/tournaments', method: 'POST', prefix: '' },
	addReward: { path: '/rewards', method: 'POST', prefix: '' },
	claimInvoice: { path: '/invoices', method: 'POST', prefix: 'claim' },
	createAdmin: { path: '/admins', method: 'POST', prefix: '' },
	addGameMechanics: { path: '/game-mechanics', method: 'POST', prefix: '' },

	// PUT
	changeStatusMember: { path: '/users', method: 'PUT', prefix: 'status' },
	updateRoom: { path: '/rooms', method: 'PUT', prefix: '' },
	updateRoomStatus: { path: '/rooms', method: 'PUT', prefix: 'status' },
	setRoomWinner: { path: '/rooms', method: 'PUT', prefix: 'close' },
	updateBanner: { path: '/banners', method: 'PUT', prefix: '' },
	updateCafe: { path: '/cafes', method: 'PUT', prefix: '' },
	editBadges: { path: '/badges', method: 'PUT', prefix: '' },
	editTournamentBadge: { path: '/tournament-badges', method: 'PUT', prefix: '' },
	editTournaments: { path: '/tournaments', method: 'PUT', prefix: '' },
	setTournamentWinner: { path: '/tournaments', method: 'PUT', prefix: 'close' },
	editGame: { path: '/games', method: 'PUT', prefix: '' },
	updateReward: { path: '/rewards', method: 'PUT', prefix: '' },
	updateAdmin: { path: '/admins', method: 'PUT', prefix: '' },
	changeStatusAdmin: { path: '/admins', method: 'PUT', prefix: 'status' },
	updateGameMechanics: { path: '/game-mechanics', method: 'PUT', prefix: '' },
	updateTournamentsStatus: { path: '/tournaments', method: 'PUT', prefix: 'status' },

	// DELETE
	deleteGameMechanics: { path: '/game-mechanics', method: 'DELETE', prefix: '' },
	deleteMember: { path: '/users', method: 'DELETE', prefix: '' },
	deleteGame: { path: '/games', method: 'DELETE', prefix: '' },
	deleteRoom: { path: '/rooms', method: 'DELETE', prefix: '' },
	deleteTournament: { path: '/tournaments', method: 'DELETE', prefix: '' },
	deleteBanner: { path: '/banners', method: 'DELETE', prefix: '' },
} as const;

// Typing schema, do not modify if not necessary

type EndpointDefinition<T extends string> = {
	[key in T]: {
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

