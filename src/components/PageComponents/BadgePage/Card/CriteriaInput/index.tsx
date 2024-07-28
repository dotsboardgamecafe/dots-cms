import { memo } from "react"

import AmountOfBoardGamePlayedCriteriaInput from "@/components/PageComponents/BadgePage/Card/CriteriaInput/AmountOfBoardGamePlayedCriteriaInput"
import AmountOfTournamentWonCriteriaInput from "@/components/PageComponents/BadgePage/Card/CriteriaInput/AmountOfTournamentWonCriteriaInput"
import SpecificBoardGameCriteriaInput from "@/components/PageComponents/BadgePage/Card/CriteriaInput/SpecificBoardGameCriteriaInput"
import TimeLimitCriteriaInput from "@/components/PageComponents/BadgePage/Card/CriteriaInput/TimeLimitCriteriaInput"
import TotalSpentCriteriaInput from "@/components/PageComponents/BadgePage/Card/CriteriaInput/TotalSpentCriteriaInput"

import { BadgeRuleNameType } from "@/types/badge"

type PropsType = {
  parentPath: string,
  badgeRuleCategory: BadgeRuleNameType
  onRemove?: () => void
}

const CriteriaInput: React.FC<PropsType> = ({ badgeRuleCategory, ...props }) => {

  switch (badgeRuleCategory) {
    case 'spesific_board_game_category': return <SpecificBoardGameCriteriaInput {...props} />
    case 'time_limit': return <TimeLimitCriteriaInput {...props} />
    case 'total_spend': return <TotalSpentCriteriaInput {...props} />
    case 'playing_games': return <AmountOfBoardGamePlayedCriteriaInput {...props} />
    case 'tournament_won': return <AmountOfTournamentWonCriteriaInput {...props} />
    default: return null
  }
}

export default memo(CriteriaInput)