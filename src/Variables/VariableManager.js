class Variable {
  constructor (key, selectable, shortDisplay, display) {
    this._key = key
    this._selectable = selectable
    this._shortDisplay = shortDisplay || display
    this._display = display
  }

  get key () { return this._key }
  get selectable () { return this._selectable }
  get shortDisplay () { return this._shortDisplay }
  get display () { return this._display }
}

class VariableGroup {
  constructor (key, exclusive, display, variables) {
    this._key = key
    this._exclusive = exclusive
    this._display = display
    this._variables = variables
    this._selectableVariables = variables.filter(v => v.selectable)
    this._buildVariableMap()
  }

  get key () { return this._key }
  get exclusive () { return this._exclusive }
  get display () { return this._display }
  get variables () { return this._variables }
  get selectableVariables () { return this._selectableVariables }
  get variableMap () { return this._variableMap }

  _buildVariableMap () {
    this._variableMap = {}
    this._variables.forEach(v => { this._variableMap[v.key] = v })
  }
}

class VariableManager {
  constructor (variableGroups) {
    this._variableGroups = variableGroups
    this._variableGroupMap = {}
    variableGroups.forEach(group => { this._variableGroupMap[group.key] = group })
  }

  emptySelectableVariableMap () {
    const map = {}
    this._variableGroups.forEach(group => {
      map[group.key] = {}
      group.selectableVariables.forEach(variable => {
        map[group.key][variable.key] = false
      })
    })
    return map
  }

  get variableGroupMap () {
    return this._variableGroupMap
  }

  get variableGroups () {
    return this._variableGroups
  }

  variableGroupByKey (variableGroupKey) {
    return this._variableGroupMap[variableGroupKey]
  }

  variableByKey (variableGroupKey, variableKey) {
    try {
      return this._variableGroupMap[variableGroupKey].variableMap[variableKey]
    } catch (e) {
      console.error(`variableByKey: no variableGroupKey '${variableGroupKey}' and variableKey '${variableKey}' match found`)
    }
  }

  variableGroupDisplayNameByKey (variableGroupKey) {
    return this.variableGroupByKey(variableGroupKey).display
  }

  displayNameByKey (variableGroupKey, variableKey) {
    return this.variableByKey(variableGroupKey, variableKey).display
  }

  shortDisplayNameByKey (variableGroupKey, variableKey) {
    return this.variableByKey(variableGroupKey, variableKey).shortDisplay
  }
}

export const VARIABLE_MANAGER = new VariableManager([
  new VariableGroup(
    'Employee_Type', true, 'Employee Type',
    [
      new Variable('Employees_All', true, null, 'All'),
      new Variable('Employees_Reg', true, null, 'Regular'),
      new Variable('Employees_Aux', true, null, 'Auxiliary')
    ]
  ),
  new VariableGroup(
    'Des_Grp', false, 'Designated Group',
    [
      new Variable('IND', true, 'Indigenous', 'Indigenous Peoples'),
      new Variable('DIS', true, 'Disabled', 'People with Disabilities'),
      new Variable('VM', true, 'Vis. Min.', 'Visible Minorities'),
      new Variable('WOM', true, 'Women', 'Women'),
      new Variable('WOM_SM', false, null, 'Women in Senior Mgmt'),
      new Variable('AS_TOTAL', false, null, 'Total')
    ]
  ),
  new VariableGroup(
    'BCPS_Ministry_Group', true, 'Ministry',
    [
      new Variable('BCPS', true, 'BCPS', 'BC Public Service'),
      new Variable('AEST', true, 'AEST', 'Advanced Education, Skills and Training'),
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
      new Variable('FLNRORD', true, 'FLNRORD', 'Forests, Lands, Natural Resource Operations and Rural Development'),
      new Variable('GCPE', true, 'GCPE', 'Government Communications and Public Engagement'),
      new Variable('HLTH', true, 'HLTH', 'Health'),
      new Variable('IRR', true, 'IRR', 'Indigenous Relations and Reconciliation'),
      new Variable('JTT', true, 'JTT', 'Jobs, Trade and Technology'),
      new Variable('LBR', true, 'LBR', 'Labour'),
      new Variable('MAH', true, 'MAH', 'Municipal Affairs and Housing'),
      new Variable('MHA', true, 'MHA', 'Mental Health and Addictions'),
      new Variable('PGT', true, 'PGT', 'Public Guardian and Trustee'),
      new Variable('PO', true, 'PO', 'Office of the Premier'),
      new Variable('PSSG', true, 'PSSG', 'Public Safety and Solicitor General'),
      new Variable('SDPR', true, 'SDPR', 'Social Development and Poverty Reduction'),
      new Variable('TAC', true, 'TAC', 'Tourism, Arts and Culture'),
      new Variable('TRAN', true, 'TRAN', 'Transportation and Infrastructure'),
    ]
  )
])

export const isVariableActive = (activeVariables, variableGroupKey, variableKey) => {
  try {
    return activeVariables[variableGroupKey][variableKey]
  } catch (e) {
    return false
  }
}

export const areAllVariablesActive = (activeVariables, variableGroupKey) => {
  return VARIABLE_MANAGER.variableGroupByKey(variableGroupKey)
    .selectableVariables.every(variable => {
      return isVariableActive(activeVariables, variableGroupKey, variable.key)
    })
}

export const areNoVariablesActive = (activeVariables, variableGroupKey) => {
  return VARIABLE_MANAGER.variableGroupByKey(variableGroupKey)
    .selectableVariables.every(variable => {
      return !isVariableActive(activeVariables, variableGroupKey, variable.key)
    })
}

export const toggleVariable = (activeVariables, varGroupKey, varKey) => {
  const isExclusive = VARIABLE_MANAGER.variableGroupByKey(varGroupKey).exclusive
  if (!isExclusive) {
    // Just toggle the variable
    activeVariables[varGroupKey][varKey] = !activeVariables[varGroupKey][varKey]
  } else {
    // Set all variables to false
    Object.keys(activeVariables[varGroupKey]).forEach(key => {
      activeVariables[varGroupKey][key] = false
    })
    // Set this variable to true
    activeVariables[varGroupKey][varKey] = true
  }
  return activeVariables
}

export const toActiveVariableArray = (activeVariables) => {
  const map = {}
  Object.keys(activeVariables).forEach(varGroupKey => {
    const variables = activeVariables[varGroupKey]
    const activeVariableKeys = Object.keys(variables).filter(varKey => variables[varKey] === true)
    map[varGroupKey] = activeVariableKeys
  })
  return map
}

export const fromActiveVariableArray = (activeVariables, parsedQS) => {
  Object.keys(parsedQS).forEach(key => {
    const values = parsedQS[key]
    if (values instanceof Array) {
      values.forEach(value => { activeVariables[key][value] = true })
    } else {
      activeVariables[key][values] = true
    }
  })
  if (areNoVariablesActive(activeVariables, 'Employee_Type')) {
    activeVariables['Employee_Type']['Employees_All'] = true
  }
  if (areNoVariablesActive(activeVariables, 'Des_Grp')) {
    Object.keys(activeVariables['Des_Grp']).forEach(k => {
      activeVariables['Des_Grp'][k] = true
    })
  }
  return activeVariables
}

export const activeVariablesToDisplay = (activeVariables) => {
  const result = []
  const activeVariableArray = toActiveVariableArray(activeVariables)
  Object.keys(activeVariableArray).forEach(k => {
    const name = VARIABLE_MANAGER.variableGroupDisplayNameByKey(k)
    const optionNames = activeVariableArray[k].map(vk => {
      return VARIABLE_MANAGER.displayNameByKey(k, vk)
    })
    result.push({ name, optionNames })
  })
  return result
}
