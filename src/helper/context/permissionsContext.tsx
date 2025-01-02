'use client'

import React from "react";

import { cookiesHelper } from "@/helper";

interface IBasePermissions {
  view?: boolean
  add?: boolean
  update?: boolean
  delete?: boolean
  status?: boolean
  detail?: boolean
}

export interface IPermissionsContextValue {
  [key: string]: any
  room?: IBasePermissions & {
    setWinner?: boolean
  }
  tournament?: IBasePermissions & {
    setWinner?: boolean
  }
  games?: IBasePermissions
  tier?: IBasePermissions
  cafeManagement?: IBasePermissions
  rewards?: IBasePermissions
  admin?: IBasePermissions
  member?: IBasePermissions & {
    viewInvoice?: boolean
    claimInvoice?: boolean
    giftBadge?: boolean
  }
  mechanics?: IBasePermissions
  banner?: IBasePermissions
  badge?: IBasePermissions & {
    add_tournament_badge?: boolean
    update_tournament_badge?: boolean
    detail_tournament_badge?: boolean
  }
}

export const PermissionContext = React.createContext<IPermissionsContextValue>({})

export const usePermissions = () => React.useContext<IPermissionsContextValue>(PermissionContext)

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissionsObject, setPermissionObject] = React.useState<IPermissionsContextValue>({})


  React.useEffect(() => {
    const getPermissionsObject = async () => {
      const permissionList = await cookiesHelper.getUserPermission()

      const permissionObject: IPermissionsContextValue = {
        admin: {
          view: permissionList.includes('admin-get-list'),
          add: permissionList.includes('admin-add'),
          update: permissionList.includes('admin-update'),
          status: permissionList.includes('admin-update-status'),
          detail: permissionList.includes('admin-get-detail')
        },
        badge: {
          add: permissionList.includes('badge-add'),
          view: permissionList.includes('badge-get-list'),
          detail: permissionList.includes('badge-get-detail'),
          update: permissionList.includes('badge-update'),
          add_tournament_badge: permissionList.includes('add-tournament-badges'),
          detail_tournament_badge: permissionList.includes('get-tournament-badges'),
          update_tournament_badge: permissionList.includes('update-tournament-badges'),
        },
        banner: {
          add: permissionList.includes('banner-add'),
          view: permissionList.includes('banner-get-list'),
          detail: permissionList.includes('banner-get-detail'),
          update: permissionList.includes('banner-update'),
          delete: permissionList.includes('banner-delete'),
        },
        cafeManagement: {
          view: permissionList.includes('cafe-get-list'),
          add: permissionList.includes('cafe-add'),
          detail: permissionList.includes('cafe-get-detail'),
          update: permissionList.includes('cafe-update')
        },
        mechanics: {
          view: permissionList.includes('get-game-mechanics'),
          add: permissionList.includes('add-game-mechanics'),
          detail: permissionList.includes('get-detail-game-mechanics'),
          update: permissionList.includes('update-game-mechanics'),
          delete: permissionList.includes('delete-game-mechanics')
        },
        games: {
          view: permissionList.includes('game-get-list'),
          detail: permissionList.includes('game-get-detail'),
          add: permissionList.includes('game-add'),
          update: permissionList.includes('game-update'),
          delete: permissionList.includes('game-delete')
        },
        rewards: {
          view: permissionList.includes('reward-get-list'),
          detail: permissionList.includes('reward-get-detail'),
          add: permissionList.includes('reward-add'),
          update: permissionList.includes('reward-update')
        },
        room: {
          view: permissionList.includes('rooms-get-list'),
          detail: permissionList.includes('rooms-get-detail'),
          add: permissionList.includes('rooms-add'),
          update: permissionList.includes('rooms-update'),
          status: permissionList.includes('room-update-status'),
          setWinner: permissionList.includes('rooms-setwinner'),
          delete: permissionList.includes('rooms-delete')
        },
        tier: {
          view: permissionList.includes('tier-get-list'),
          detail: permissionList.includes('tier-get-detail')
        },
        tournament: {
          view: permissionList.includes('tournament-get-list'),
          detail: permissionList.includes('tournament-get-detail'),
          add: permissionList.includes('tournament-add'),
          update: permissionList.includes('tournament-update'),
          setWinner: permissionList.includes('tournament-setwinner'),
          status: permissionList.includes('update-tournament-status'),
          delete: permissionList.includes('tournament-delete')
        },
        member: {
          view: permissionList.includes('member-get-list'),
          giftBadge: permissionList.includes('badge-gift-to-user'),
          detail: permissionList.includes('member-get-detail'),
          status: permissionList.includes('member-update-status'),
          delete: permissionList.includes('member-delete-account'),
          viewInvoice: permissionList.includes('invoice-history-cms') || permissionList.includes('member-claimed-invoice-history'),
          claimInvoice: permissionList.includes('claim-invoice-cms') || permissionList.includes('member-claim-invoice')
        }
      }

      setPermissionObject(permissionObject)
    }

    getPermissionsObject()
  }, [])

  return <PermissionContext.Provider value={permissionsObject}>{children}</PermissionContext.Provider>
}