import { memo } from "react"

import SpecificBoardGameCriteriaView from "@/components/PageComponents/BadgePage/Card/CriteriaCard/SpecificBoardGameCriteriaView"
import TimeLimitCriteriaView from "@/components/PageComponents/BadgePage/Card/CriteriaCard/TimeLimitCriteriaView"
import TotalSpendCriteriaView from "@/components/PageComponents/BadgePage/Card/CriteriaCard/TotalSpendCriteriaView"

import { BadgeRuleNameType, BadgeRuleType, BadgeSpesificGameBoardCriteriaValue, BadgeTimeLimitCriteriaValue, BadgeTotalSpendCriteriaValue } from "@/types/badge"

type PropsType = {
  criteria: BadgeRuleType
}

const CriteriaCard: React.FC<PropsType> = ({ criteria }) => {
  const badgeRuleName: BadgeRuleNameType = criteria.name

  switch (badgeRuleName) {
    case 'spesific_board_game_category': return <SpecificBoardGameCriteriaView key={criteria.badge_rule_code} data={criteria as BadgeRuleType<BadgeSpesificGameBoardCriteriaValue>} />
    case 'time_limit': return <TimeLimitCriteriaView key={criteria.badge_rule_code} data={criteria as BadgeRuleType<BadgeTimeLimitCriteriaValue>} />
    case 'total_spend': return <TotalSpendCriteriaView key={criteria.badge_rule_code} data={criteria as BadgeRuleType<BadgeTotalSpendCriteriaValue>} />
    default: return null
  }
}

export default memo(CriteriaCard)