import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { getAdmins } from "@/lib/api/admin";
import { getBadges, importBadges } from "@/lib/api/badge";
import { getGameList, importGame } from "@/lib/api/games";
import { getAllClaimedInvoice, getMembers } from "@/lib/api/member";

import { ObjectToCSV, THeaderCSV } from "@/helper";

import { AdminType } from "@/types/admin";
import { BadgeType } from "@/types/badge";
import { GameType } from "@/types/game";
import { MemberType, ResponseClaimedInvoice } from "@/types/member";


dayjs.extend(utc)
dayjs.extend(timezone)

export async function exportMember() {
  const exportedColumns: THeaderCSV<MemberType> = ['username', 'email', "fullname", "gender", "date_of_birth", "phone_number", "latest_point", "latest_tier", "total_spent", { title: 'total_vp', key: 'stats.vp' }, { title: 'total_board_game', key: 'stats.game' }, { title: 'total_badge', key: 'stats.badge' }, { title: 'total_sessions', key: 'stats.room_normal' }, { title: 'total_events', key: 'stats.room_event' }, { title: 'total_tournament', key: 'stats.tournament' }, "status", "created_date"]
  const member = await getMembers({ pagination: { limit: 99999999999999 } })
  const csvFile = await ObjectToCSV<MemberType>(member.data, exportedColumns)

  const dateStamp = dayjs(new Date()).format('DD-MMM-YYYY')
  const link = URL.createObjectURL(csvFile)
  const downloadTrigger = document.createElement('a')
  downloadTrigger.href = link
  downloadTrigger.download = `DOTS Member Data [Exported on ${dateStamp}]`
  downloadTrigger.click()
  URL.revokeObjectURL(link)
}

export async function exportClaimedHistory() {
  const getDateValue = (data: ResponseClaimedInvoice) => {
    const timeInUTC = dayjs(data.claimed_time.split(' ').join('T') + 'Z')
    const timeInJakarta = timeInUTC.tz('Asia/Jakarta')

    return timeInJakarta.format('D MMM YYYY, H:mm')
  }

  const exportedColumns: THeaderCSV<ResponseClaimedInvoice> = ['user_code', 'username', 'full_name', 'invoice_code', 'invoice_amount', 'invoice_items.name', { key: 'claimed_date', title: 'claimed_date', getValue: getDateValue }, { key: 'claimed_time', title: 'claimed_time', getValue: getDateValue }]
  const claimedInvoice = await getAllClaimedInvoice({ pagination: { limit: 99999999999999 } })

  const csvFile = await ObjectToCSV<ResponseClaimedInvoice>(claimedInvoice, exportedColumns)

  const dateStamp = dayjs(new Date()).format('DD-MMM-YYYY')
  const link = URL.createObjectURL(csvFile)
  const downloadTrigger = document.createElement('a')
  downloadTrigger.href = link
  downloadTrigger.download = `DOTS Claimed Invoices Data [Exported on ${dateStamp}]`
  downloadTrigger.click()
  URL.revokeObjectURL(link)
}

export async function exportAdmin() {
  const exportedColumns: (keyof AdminType)[] = ['admin_code', "name", 'email', "phone_number", "role", "status"]
  const admin = await getAdmins({ pagination: { limit: 99999999999999 } })
  const csvFile = await ObjectToCSV(admin.data, exportedColumns)

  const dateStamp = dayjs(new Date()).format('DD-MMM-YYYY')
  const link = URL.createObjectURL(csvFile)
  const downloadTrigger = document.createElement('a')
  downloadTrigger.href = link
  downloadTrigger.download = `DOTS Admin Data [Exported on ${dateStamp}]`
  downloadTrigger.click()
  URL.revokeObjectURL(link)
}

export async function exportGameCatalog() {
  const exportedColumns: THeaderCSV<GameType> = ['game_code', "name", 'game_type', 'duration', 'cafe_name', 'level', 'minimal_participant', "maximum_participant", "status", 'description', 'game_masters.admin_code', 'game_masters.name', { title: 'total_played', key: 'stats.played' }]
  const games = await getGameList({ pagination: { limit: 99999999999999 } })
  const csvFile = await ObjectToCSV<GameType>(games.data, exportedColumns)

  const dateStamp = dayjs(new Date()).format('DD-MMM-YYYY')
  const link = URL.createObjectURL(csvFile)
  const downloadTrigger = document.createElement('a')
  downloadTrigger.href = link
  downloadTrigger.download = `DOTS Game Data [Exported on ${dateStamp}]`
  downloadTrigger.click()
  URL.revokeObjectURL(link)
}

export async function exportBadges() {
  const exportedColumns: (keyof BadgeType)[] = ['badge_code', 'name', 'vp_point', 'badge_category', "status", 'description']
  const badges = await getBadges({ pagination: { limit: 999999999999999 } })
  const csvFile = await ObjectToCSV(badges.data, exportedColumns)

  const dateStamp = dayjs(new Date()).format('DD-MMM-YYYY')
  const link = URL.createObjectURL(csvFile)
  const downloadTrigger = document.createElement('a')
  downloadTrigger.href = link
  downloadTrigger.download = `DOTS Badges Data [Exported on ${dateStamp}]`
  downloadTrigger.click()
  URL.revokeObjectURL(link)
}

export async function importGameCatalog() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = async (event: any) => {
      const file = event.target?.files[0]
      const partsOfFileName: string[] = file.name.split('.')
      const fileExtention = partsOfFileName[partsOfFileName.length - 1]

      if (fileExtention.toLowerCase() !== 'csv') return reject('Err: File type not supported!')
      const formData = new FormData()
      formData.append('file', file)

      const result = await importGame(formData)

      if (result.stat_code?.includes('ERR')) return reject(`${result.stat_code} (${result.stat_msg})`)
      resolve(result)
    }
    input.oncancel = () => reject('Err: file not selected!')
    input.click()
  })
}

export async function importBadgesUpdate() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = async (event: any) => {
      const file = event.target?.files[0]
      const partsOfFileName: string[] = file.name.split('.')
      const fileExtention = partsOfFileName[partsOfFileName.length - 1]

      if (fileExtention.toLowerCase() !== 'csv') return reject('Err: File type not supported!')

      const formData = new FormData()
      formData.append('file', file)

      const result = await importBadges(formData)
      if (result.stat_code?.includes('ERR')) return reject(`${result.stat_code} (${result.stat_msg})`)

      resolve(result)
    }
    input.oncancel = () => reject('Err: file not selected!')
    input.click()
  })
}

export const actionProcessList = {
  export_member: exportMember,
  export_admin: exportAdmin,
  export_game: exportGameCatalog,
  export_badges: exportBadges,
  import_game: importGameCatalog,
  import_badges: importBadgesUpdate,
  export_all_claimed_history: exportClaimedHistory,
}