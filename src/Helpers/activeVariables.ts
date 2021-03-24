import FixTypeLater from '../@types/FixTypeLater'
import { VARIABLES } from '../Variables/VariableManager'

export const activeMinistry = (
  activeMinistryKey: FixTypeLater
): FixTypeLater => {
  try {
    return VARIABLES.displayNameByKey('Ministry_Key', activeMinistryKey)
  } catch (e) {
    return ''
  }
}

export const activeEmployeeType = (
  employeeTypeKey: FixTypeLater
): FixTypeLater => {
  try {
    return VARIABLES.displayNameByKey('Employee_Type', employeeTypeKey)
  } catch (e) {
    return ''
  }
}
