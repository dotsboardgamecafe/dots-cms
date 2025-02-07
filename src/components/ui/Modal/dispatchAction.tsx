import dayjs from "dayjs";

import { getAdmins } from "@/lib/api/admin";
import { getBadges } from "@/lib/api/badge";
import { getGameList } from "@/lib/api/games";
import { getMembers } from "@/lib/api/member";

import { CSVReader, ObjectToCSV } from "@/helper";

import { AdminType } from "@/types/admin";
import { BadgeType } from "@/types/badge";
import { NestedKeyOf } from "@/types/common";
import { GameType } from "@/types/game";
import { MemberType } from "@/types/member";


export async function exportMember() {
  const exportedColumns: (keyof MemberType)[] = ['username', 'email', "fullname", "gender", "date_of_birth", "phone_number", "latest_point", "latest_tier", "total_spent", "status", "created_date"]
  const member = await getMembers({ pagination: { limit: 99999999999999 } })
  const csvFile = await ObjectToCSV(member.data, exportedColumns)

  const dateStamp = dayjs(new Date()).format('DD-MMM-YYYY')
  const link = URL.createObjectURL(csvFile)
  const downloadTrigger = document.createElement('a')
  downloadTrigger.href = link
  downloadTrigger.download = `DOTS Member Data [Exported on ${dateStamp}]`
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
  const exportedColumns: (NestedKeyOf<GameType>)[] = ['game_code', "name", 'game_type', 'duration', 'cafe_name', 'level', 'minimal_participant', "maximum_participant", "status", 'description', 'game_masters.admin_code', 'game_masters.name']
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
  const input = document.createElement('input')
  input.type = 'file'
  input.onchange = (event: any) => {
    const file = event.target?.files[0]
    CSVReader(file).then((data) => console.log(data)).catch((err) => console.log(err))
  }
  input.click()
}
export const actionProcessList = {
  export_member: exportMember,
  export_admin: exportAdmin,
  export_game: exportGameCatalog,
  export_badges: exportBadges,
  import_game: importGameCatalog,
}