import { z } from "zod"

export type BadgeRuleNameType = 'spesific_board_game_category' | 'total_spend' | 'time_limit' | 'playing_games' | 'tournament_won'

export enum MappingBadgeRuleNameTypeToDisplay {
  spesific_board_game_category = 'Spesific Board Game Category',
  total_spend = 'Total Spend',
  time_limit = 'Time Limit'
}

export type BadgeRuleType<T = BadgeTimeLimitCriteriaValue | BadgeTotalSpendCriteriaValue | BadgeSpesificGameBoardCriteriaValue | { position: number }> = {
  badge_rule_code: string,
  badge_id: number,
  category_badge_rule: string,
  name: BadgeRuleNameType,
  image_url: string,
  value: T
}

export type BadgeTimeLimitCriteriaValue = {
  category: string,
  name: string,
  start_date: string,
  end_date: string
}

export type BadgeTotalSpendCriteriaValue = number
export type BadgeTournamentWonCriteriaValue = number
export type BadgePlayingGamesCriteriaValue = number

export type BadgeSpesificGameBoardCriteriaValue = {
  game_code: string[]
  need_gm: boolean
  total_played: number
  booking_price?: number
}

export type BadgeType<T = BadgeTimeLimitCriteriaValue | BadgeTotalSpendCriteriaValue | BadgeSpesificGameBoardCriteriaValue | BadgeTournamentWonCriteriaValue | BadgePlayingGamesCriteriaValue | { position: number }> = {
  badge_code: string,
  badge_category: string,
  parent_code: string,
  name: string,
  image_url: string,
  badge_rules: BadgeRuleType<T>[],
  vp_point: number,
  status: string,
  created_date: string,
  updated_date: string,
  deleted_date: string,
  description: string
}

export type TournamentBadgeType = {
  badge_code: string,
  badge_category: 'tournament',
  name: string,
  image_url: string,
  badge_rules: [
    {
      badge_rule_code: string,
      badge_id: number,
      category_badge_rule: string,
      name: string,
      image_url: string,
      value: {
        position: number
      }
    }
  ],
  vp_point: number,
  status: 'active' | 'inactive',
  parent_code: string,
  created_date: string,
  updated_date: string,
  deleted_date: string,
  description: string
}

export const badgePostPayloadSchema = z.object({
  badge_category: z.string({ required_error: "You need to select the badge category.", }).min(1, "You need to select the badge category."),
  name: z.string({ required_error: "You need to input the badge name." }).min(1, "You need to input the badge name."),
  description: z.string({ required_error: "You need to input the badge description." }).min(1, "You need to input the badge description."),
  image_url: z.string({ required_error: "You need to upload the badge image." }).min(1, "You need to upload the badge image."),
  status: z.string({ required_error: "You need to input the badge status.", }),
  vp_point: z.number({ required_error: "You need to input the amount of VP.", }).min(1, "You need to input the amount of VP."),
  badge_rule: z.object({
    key_condition: z.string(),
    value_type: z.string(),
    value: z.number({ required_error: "You need to input the amount total spent." }).min(1, "You need to input the amount total spent.").or(
      z.object({
        game_code: z.string().array().min(1, 'You need to select the game'),
        need_gm: z.boolean({ required_error: 'You need to select the GM option' }),
        total_played: z.number({ required_error: 'You need to input the number of played' }).min(1, 'You need to input the number of played'),
        booking_price: z.number().optional()
      })
    ).or(
      z.object({
        position: z.number()
      })
    )
      .or(
        z.object({
          category: z.string({ required_error: "You need to input the time limit category." }).min(1, "You need to input the time limit category."),  // time_limit || life_time 
          name: z.string(),
          start_date: z.string({ required_error: "You need to input the start date." }).min(1, 'You need to input the start date'),
          end_date: z.string({ required_error: 'You need to input the start date' }).min(1, 'You need to input the start date')
        }).superRefine(({ category, name }, ctx) => {
          if (category === 'seasonal' && name.length === 0) ctx.addIssue({
            type: 'string',
            code: z.ZodIssueCode.too_small,
            inclusive: true,
            minimum: 1,
            message: 'You need to input the event name',
            path: ['name']
          })
        })
      )
  }).array().min(1, 'You need to atleast select 1 badge criteria')
})

export type BadgePostPayloadType = z.infer<typeof badgePostPayloadSchema>

export const TournamentBadgePayloadSchema = z.object({
  badge_category: z.string(),
  name: z.string({ required_error: 'You need to input the badge name.' }).min(1, 'You need to input the badge name.'),
  status: z.string(),
  image_url1: z.string({ required_error: 'You need to input the bage image for 1st position.' }).min(1, 'You need to input the bage image for 1st position'),
  image_url2: z.string({ required_error: 'You need to input the bage image for 2nd position' }).min(1, 'You need to input the bage image for 2nd position'),
  image_url3: z.string({ required_error: 'You need to input the bage image for 3rd position' }).min(1, 'You need to input the bage image for 3rd position'),
  vp_point1: z.number({ required_error: 'You need to input the VP amount for 1st position' }).min(1, 'You need to input the VP amount for 1st position'),
  vp_point2: z.number({ required_error: 'You need to input the bage image for 2nd position' }).min(1, 'You need to input the VP amount for 2nd position'),
  vp_point3: z.number({ required_error: 'You need to input the bage image for 3rd position' }).min(1, 'You need to input the VP amount for 3rd position'),
  description: z.string({ required_error: "You need to input the badge description." }).min(1, "You need to input the badge description."),
})

export type TournamentBadgeSchemaType = z.infer<typeof TournamentBadgePayloadSchema>

export type TournamentBadgePayloadType = {
  tournament_badges: {
    badge_category: string,
    name: string,
    image_url: string,
    status: string,
    vp_point: number,
    description: string,
    badge_rule: {
      key_condition: string,
      value_type: string,
      value: {
        position: number
      }
    }
  }[],
}
