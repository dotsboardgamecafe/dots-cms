type SettingType = {
  setting_code: string,
  set_group: string,
  set_key: string,
  set_label: string,
  set_order: number,
  content_type: string,
  content_value: string,
  is_active: boolean
}

export type ProvinceType = SettingType
export type CityType = SettingType