import FixTypeLater from '../@types/FixTypeLater'
import { VARIABLE_MANAGER } from '../Variables/VariableManager'

export const activeMinistry = (
  activeMinistryKey: FixTypeLater
): FixTypeLater => {
  try {
    return VARIABLE_MANAGER.displayNameByKey('Ministry_Key', activeMinistryKey)
  } catch (e) {
    return ''
  }
}

export const activeEmployeeType = (
  employeeTypeKey: FixTypeLater
): FixTypeLater => {
  try {
    return VARIABLE_MANAGER.displayNameByKey('Employee_Type', employeeTypeKey)
  } catch (e) {
    return ''
  }
}
