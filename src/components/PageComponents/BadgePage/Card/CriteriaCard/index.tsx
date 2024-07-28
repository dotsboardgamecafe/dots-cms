import { memo } from "react"

import AmountOfBoardGamePlayedCriteriaView from "@/components/PageComponents/BadgePage/Card/CriteriaCard/AmountOfBoardGamePlayedCriteriaView"
import AmountOfTournamentWonCriteriaView from "@/components/PageComponents/BadgePage/Card/CriteriaCard/AmountOfTournamentWonCriteriaView"
import SpecificBoardGameCriteriaView from "@/components/PageComponents/BadgePage/Card/CriteriaCard/SpecificBoardGameCriteriaView"
import TimeLimitCriteriaView from "@/components/PageComponents/BadgePage/Card/CriteriaCard/TimeLimitCriteriaView"
import TotalSpendCriteriaView from "@/components/PageComponents/BadgePage/Card/CriteriaCard/TotalSpendCriteriaView"

import { BadgePlayingGamesCriteriaValue, BadgeRuleNameType, BadgeRuleType, BadgeSpesificGameBoardCriteriaValue, BadgeTimeLimitCriteriaValue, BadgeTotalSpendCriteriaValue, BadgeTournamentWonCriteriaValue } from "@/types/badge"

type PropsType = {
  criteria: BadgeRuleType
}

const CriteriaCard: React.FC<PropsType> = ({ criteria }) => {
  const badgeRuleName: BadgeRuleNameType = criteria.name

  switch (badgeRuleName) {
    case 'spesific_board_game_category': return <SpecificBoardGameCriteriaView key={criteria.badge_rule_code} data={criteria as BadgeRuleType<BadgeSpesificGameBoardCriteriaValue>} />
    case 'time_limit': return <TimeLimitCriteriaView key={criteria.badge_rule_code} data={criteria as BadgeRuleType<BadgeTimeLimitCriteriaValue>} />
    case 'total_spend': return <TotalSpendCriteriaView key={criteria.badge_rule_code} data={criteria as BadgeRuleType<BadgeTotalSpendCriteriaValue>} />
    case 'playing_games': return <AmountOfBoardGamePlayedCriteriaView key={criteria.badge_rule_code} data={criteria as BadgeRuleType<BadgePlayingGamesCriteriaValue>} />
    case 'tournament_won': return <AmountOfTournamentWonCriteriaView key={criteria.badge_rule_code} data={criteria as BadgeRuleType<BadgeTournamentWonCriteriaValue>} />
    default: return null
  }
}

export default memo(CriteriaCard)