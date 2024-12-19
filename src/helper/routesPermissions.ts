

export function mapRouteToPermissionName(routePath: string) {
  if (routePath === '/room') return 'rooms-get-list'
  if (routePath === '/tournament') return 'tournament-get-list'
  if (routePath === '/game') return 'game-get-list'
  if (routePath === '/tier') return 'tier-get-list'
  if (routePath === '/rewards') return 'reward-get-list'
  if (routePath === '/badges') return 'badge-get-list'
  if (routePath === '/cafe') return 'cafe-get-list'
  if (routePath === '/banner') return 'banner-get-list'
  if (routePath === '/member') return 'member-get-list'
  if (routePath === '/admin') return 'admin-get-list'
  if (routePath === '/mechanic') return 'get-game-mechanics'

  // for child pages
  if (routePath.startsWith('/room/add')) return 'rooms-add'
  if (routePath.startsWith('/room/view')) return 'rooms-get-detail'
  if (routePath.startsWith('/room/edit')) return 'rooms-update'

  if (routePath.startsWith('/tournament/add')) return 'tournament-add'
  if (routePath.startsWith('/tournament/view')) return 'tournament-get-detail'
  if (routePath.startsWith('/tournament/edit')) return 'tournament-update'

  if (routePath.startsWith('/game/add')) return 'game-add'
  if (routePath.startsWith('/game/view')) return 'game-get-detail'
  if (routePath.startsWith('/game/edit')) return 'game-update'

  // if (routePath.startsWith('/member/invoices')) return 'member-claimed-invoice-history'
  if (routePath.startsWith('/member/invoices')) return 'invoice-history-cms'

  return ''
}

export function getLandingPage(permissions: string[]) {
  if (permissions.includes('rooms-get-list')) return '/room'
  if (permissions.includes('tournament-get-list')) return '/tournament'
  if (permissions.includes('game-get-list')) return '/game'
  if (permissions.includes('tier-get-list')) return '/tier'
  if (permissions.includes('reward-get-list')) return '/rewards'
  if (permissions.includes('badge-get-list')) return '/badges'
  if (permissions.includes('cafe-get-list')) return '/cafe'
  if (permissions.includes('banner-get-list')) return '/banner'
  if (permissions.includes('member-get-list')) return '/member'
  if (permissions.includes('admin-get-list')) return '/admin'
  if (permissions.includes('get-game-mechanics')) return '/mechanic'
  return '/'
}