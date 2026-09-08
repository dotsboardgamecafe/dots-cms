import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { getAdmins } from "@/lib/api/admin";
import { getBadges, importBadges } from "@/lib/api/badge";
import { getGameList, importGame } from "@/lib/api/games";
import { getAllClaimedInvoice, getMembers } from "@/lib/api/member";
import { getRoomPlayDetails, getRooms } from "@/lib/api/room";

import type { ProcessActionContext } from "@/components/ui/Modal/processContext";

import { ObjectToCSV, THeaderCSV } from "@/helper";
import { formatTimeHourMinutes } from "@/helper/datetime";

import { AdminType } from "@/types/admin";
import { BadgeType } from "@/types/badge";
import { GameType } from "@/types/game";
import { MemberType, ResponseClaimedInvoice } from "@/types/member";
import { RoomDetailType, RoomParticipant, RoomPlayExportRow, RoomType } from "@/types/room";


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

  const exportedColumns: THeaderCSV<ResponseClaimedInvoice> = ['user_code', 'username', 'full_name', 'invoice_code', 'invoice_amount', 'invoice_items.name', { key: 'claimed_date', title: 'claimed_date', getValue: getDateValue }]
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

const ROOM_EXPORT_BATCH_SIZE = 12

function formatRoomTimeRange(start_time?: string, end_time?: string): string {
  if (!start_time || !end_time) return '-'
  return `${formatTimeHourMinutes(start_time)} - ${formatTimeHourMinutes(end_time)}`
}

function formatWinners(participants: RoomParticipant[]): string {
  const winners = participants.filter((participant) => participant.status_winner || participant.position > 0)
  if (!winners.length) return ''

  return winners
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((participant) => participant.position > 0 ? `${participant.user_name} (#${participant.position})` : participant.user_name)
    .join(', ')
}

function buildRoomPlayRow(room: RoomType, detail?: RoomDetailType): RoomPlayExportRow {
  const participants: RoomParticipant[] = detail?.room_participants ?? []

  return {
    room_code: room.room_code || '-',
    room_name: detail?.name || room.name || '-',
    host_day: room.start_date ? dayjs(room.start_date).format('dddd, DD MMM YYYY') : '-',
    time: formatRoomTimeRange(room.start_time, room.end_time),
    location: detail?.cafe_name || room.cafe_name || '-',
    slot: `${room.current_used_slot ?? 0}/${room.maximum_participant ?? 0}`,
    game_name: detail?.game_name || '-',
    game_master: detail?.game_master_name || room.game_master_name || '-',
    winners: formatWinners(participants),
    players: participants.map((participant) => participant.user_name).join(', '),
  }
}

export async function exportRoomPlay(context?: ProcessActionContext) {
  const rooms = await getRooms({ pagination: { limit: 99999999999999 } })
  const roomList: RoomType[] = rooms.data ?? []
  const total = roomList.length
  context?.onProgress(0, total)

  const rows: RoomPlayExportRow[] = []
  let fetched = 0

  for (let index = 0; index < roomList.length; index += ROOM_EXPORT_BATCH_SIZE) {
    const batch = roomList.slice(index, index + ROOM_EXPORT_BATCH_SIZE)
    const details = await getRoomPlayDetails(batch.map((room) => room.room_code))

    batch.forEach((room, batchIndex) => rows.push(buildRoomPlayRow(room, details[batchIndex])))

    fetched += batch.length
    context?.onProgress(fetched, total)
  }

  const exportedColumns: THeaderCSV<RoomPlayExportRow> = ['room_code', 'room_name', 'host_day', 'time', 'location', 'slot', 'game_name', 'game_master', 'winners', 'players']
  const csvFile = await ObjectToCSV<RoomPlayExportRow>(rows, exportedColumns)

  const dateStamp = dayjs(new Date()).format('DD-MMM-YYYY')
  const link = URL.createObjectURL(csvFile)
  const downloadTrigger = document.createElement('a')
  downloadTrigger.href = link
  downloadTrigger.download = `DOTS Room Play Data [Exported on ${dateStamp}]`
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
  export_room_play: exportRoomPlay,
}