import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'
import { Variable } from './Variable'
import { VariableGroup } from './VariableGroup'

class VariableManager {
  private _variableGroupMap: Dictionary<VariableGroup>
  private _variableGroups: VariableGroup[]

  constructor(variableGroups: VariableGroup[]) {
    this._variableGroups = variableGroups
    this._variableGroupMap = {}
    variableGroups.forEach((group) => {
      this._variableGroupMap[group.key] = group
    })
  }

  emptySelectableVariableMap() {
    const map: Dictionary<Dictionary<boolean>> = {}
    this._variableGroups.forEach((group) => {
      map[group.key] = {}
      group.selectableVariables.forEach((variable) => {
        map[group.key][variable.key] = false
      })
    })
    return map
  }

  get variableGroupMap() {
    return this._variableGroupMap
  }

  get variableGroups() {
    return this._variableGroups
  }

  variableGroupByKey(variableGroupKey: string) {
    return this._variableGroupMap[variableGroupKey]
  }

  variableByKey(variableGroupKey: string, variableKey: string) {
    try {
      return this._variableGroupMap[variableGroupKey].variableMap[variableKey]
    } catch (e) {
      console.error(
        `variableByKey: no variableGroupKey '${variableGroupKey}' and variableKey '${variableKey}' match found`
      )
    }
  }

  variableGroupDisplayNameByKey(variableGroupKey: string) {
    return this.variableGroupByKey(variableGroupKey).display
  }

  displayNameByKey(variableGroupKey: string, variableKey: string) {
    return this.variableByKey(variableGroupKey, variableKey)?.display
  }

  shortDisplayNameByKey(variableGroupKey: string, variableKey: string) {
    return this.variableByKey(variableGroupKey, variableKey)?.shortDisplay
  }
}

export const VARIABLES = new VariableManager([
  new VariableGroup('Employee_Type', true, 'Employee Type', [
    new Variable('ALL', true, null, 'All'),
    new Variable('REG', true, null, 'Regular'),
    new Variable('AUX', true, null, 'Auxiliary'),
  ]),
  new VariableGroup('Des_Grp', false, 'Designated Group', [
    new Variable('IND', true, 'Indigenous', 'Indigenous Peoples'),
    new Variable('DIS', true, 'Disabled', 'People with Disabilities'),
    new Variable('VM', true, 'Vis. Min.', 'Visible Minorities'),
    new Variable('WOM', true, 'Women', 'Women'),
    new Variable('WOM_SM', false, null, 'Women in Senior Mgmt'),
    new Variable('AS_TOTAL', false, null, 'Total'),
  ]),
  new VariableGroup('Ministry_Key', true, 'Ministry', [
    new Variable('BCPS', true, 'BCPS', 'BC Public Service'),
    new Variable(
      'AEST',
      true,
      'AEST',
      'Advanced Education, Skills and Training'
    ),
    new Variable('AG', true, 'AG', 'Attorney General'),
    new Variable('AGRI', true, 'AGRI', 'Agriculture'),
    new Variable('BCPSA', true, 'BCPSA', 'BC Public Service Agency'),
    new Variable('CFD', true, 'CFD', 'Children and Family Development'),
    new Variable('CITZ', true, 'CITZ', "Citizens' Services"),
    new Variable('EAO', true, 'EAO', 'Environmental Assessment Office'),
    new Variable('EDUC', true, 'EDUC', 'Education'),
    new Variable('EMBC', true, 'EMBC', 'Emergency Management BC'),
    new Variable('EMPR', true, 'EMPR', 'Energy, Mines and Petroleum Resources'),
    new Variable('ENV', true, 'ENV', 'Environment and Climate Change Strategy'),
    new Variable('FIN', true, 'FIN', 'Finance'),
    new Variable(
      'FLNRORD',
      true,
      'FLNRORD',
      'Forests, Lands, Natural Resource Operations and Rural Development'
    ),
    new Variable(
      'GCPE',
      true,
      'GCPE',
      'Government Communications and Public Engagement'
    ),
    new Variable('HLTH', true, 'HLTH', 'Health'),
    new Variable('IRR', true, 'IRR', 'Indigenous Relations and Reconciliation'),
    new Variable('JTT', true, 'JTT', 'Jobs, Trade and Technology'),
    new Variable('LBR', true, 'LBR', 'Labour'),
    new Variable('MAH', true, 'MAH', 'Municipal Affairs and Housing'),
    new Variable('MHA', true, 'MHA', 'Mental Health and Addictions'),
    new Variable('PGT', true, 'PGT', 'Public Guardian and Trustee'),
    new Variable('PO', true, 'PO', 'Office of the Premier'),
    new Variable('PSSG', true, 'PSSG', 'Public Safety and Solicitor General'),
    new Variable(
      'SDPR',
      true,
      'SDPR',
      'Social Development and Poverty Reduction'
    ),
    new Variable('TAC', true, 'TAC', 'Tourism, Arts and Culture'),
    new Variable('TRAN', true, 'TRAN', 'Transportation and Infrastructure'),
  ]),
])

export const isVariableActive = (
  activeVariables: FixTypeLater,
  variableGroupKey: FixTypeLater,
  variableKey: FixTypeLater
): FixTypeLater => {
  try {
    return activeVariables[variableGroupKey][variableKey]
  } catch (e) {
    return false
  }
}

export const areAllVariablesActive = (
  activeVariables: FixTypeLater,
  variableGroupKey: FixTypeLater
): FixTypeLater => {
  return VARIABLES.variableGroupByKey(
    variableGroupKey
  ).selectableVariables.every((variable) => {
    return isVariableActive(activeVariables, variableGroupKey, variable.key)
  })
}

export const areNoVariablesActive = (
  activeVariables: FixTypeLater,
  variableGroupKey: FixTypeLater
): FixTypeLater => {
  return VARIABLES.variableGroupByKey(
    variableGroupKey
  ).selectableVariables.every((variable) => {
    return !isVariableActive(activeVariables, variableGroupKey, variable.key)
  })
}

export const toggleVariable = (
  activeVariables: FixTypeLater,
  varGroupKey: FixTypeLater,
  varKey: FixTypeLater
): FixTypeLater => {
  const isExclusive = VARIABLES.variableGroupByKey(varGroupKey).exclusive
  if (!isExclusive) {
    // Just toggle the variable
    activeVariables[varGroupKey][varKey] = !activeVariables[varGroupKey][varKey]
  } else {
    // Set all variables to false
    Object.keys(activeVariables[varGroupKey]).forEach((key) => {
      activeVariables[varGroupKey][key] = false
    })
    // Set this variable to true
    activeVariables[varGroupKey][varKey] = true
  }
  return activeVariables
}

export const toActiveVariableArray = (
  activeVariables: FixTypeLater
): FixTypeLater => {
  const map: Dictionary<FixTypeLater> = {}
  Object.keys(activeVariables).forEach((varGroupKey) => {
    const variables = activeVariables[varGroupKey]
    const activeVariableKeys = Object.keys(variables).filter(
      (varKey) => variables[varKey] === true
    )
    map[varGroupKey] = activeVariableKeys
  })
  return map
}

export const fromActiveVariableArray = (
  activeVariables: FixTypeLater,
  parsedQS: FixTypeLater
): FixTypeLater => {
  Object.keys(parsedQS).forEach((key) => {
    const values = parsedQS[key]
    if (values instanceof Array) {
      values.forEach((value) => {
        activeVariables[key][value] = true
      })
    } else {
      activeVariables[key][values] = true
    }
  })
  if (areNoVariablesActive(activeVariables, 'Employee_Type')) {
    activeVariables['Employee_Type']['ALL'] = true
  }
  if (areNoVariablesActive(activeVariables, 'Des_Grp')) {
    Object.keys(activeVariables['Des_Grp']).forEach((k) => {
      activeVariables['Des_Grp'][k] = true
    })
  }
  if (areNoVariablesActive(activeVariables, 'Ministry_Key')) {
    activeVariables['Ministry_Key']['BCPS'] = true
  }
  return activeVariables
}

export const activeVariablesToDisplay = (
  activeVariables: Dictionary<Dictionary<boolean>>
): FixTypeLater => {
  const result: FixTypeLater[] = []
  const activeVariableArray = toActiveVariableArray(activeVariables)
  Object.keys(activeVariableArray).forEach((k) => {
    const name = VARIABLES.variableGroupDisplayNameByKey(k)
    const optionNames = activeVariableArray[k].map((vk: FixTypeLater) => {
      return VARIABLES.displayNameByKey(k, vk)
    })
    result.push({ name, optionNames })
  })
  return result
}
