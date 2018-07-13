import { VARIABLE_MANAGER } from '../Variables/VariableManager'

export const activeMinistry = (activeMinistryKey) => {
  try {
    return VARIABLE_MANAGER.displayNameByKey('Ministry_Key', activeMinistryKey)  
  } catch (e) {
    return ''
  }
}
