import { VARIABLE_MANAGER } from '../Variables/VariableManager'

export const activeMinistry = (activeMinistryKey) => {
  return VARIABLE_MANAGER.displayNameByKey('Ministry_Key', activeMinistryKey)
}
