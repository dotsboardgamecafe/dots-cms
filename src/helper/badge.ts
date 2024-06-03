import { BadgeRuleNameType } from "@/types/badge"

export function getDefaultRulesObject(type: BadgeRuleNameType) {
  switch (type) {
    case 'time_limit': return ({
      key_condition: "time_limit",
      value_type: "json",
      value: {
        category: "",
        name: "",
        start_date: "",
        end_date: ""
      }
    })
    case 'spesific_board_game_category': return ({
      key_condition: "spesific_board_game_category",
      value_type: "json",
      value: {
        game_code: [],
        need_gm: true,
        total_played: 0
      }
    })
    case 'total_spend': return ({
      key_condition: "total_spend",
      value_type: "int",
      value: 0
    })

    default: return null
  }
}