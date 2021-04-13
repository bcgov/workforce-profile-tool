import FixTypeLater from '../@types/FixTypeLater'
import { displayNameByKey } from '../Data/DataManager'

export const activeMinistry = (
  activeMinistryKey: FixTypeLater
): FixTypeLater => {
  try {
    console.log(
      '-->',
      activeMinistryKey,
      displayNameByKey('Ministry_Key', activeMinistryKey)
    )
    return displayNameByKey('Ministry_Key', activeMinistryKey)
  } catch (e) {
    return ''
  }
}

export const activeEmployeeType = (
  employeeTypeKey: FixTypeLater
): FixTypeLater => {
  try {
    return displayNameByKey('Employee_Type', employeeTypeKey)
  } catch (e) {
    return ''
  }
}
