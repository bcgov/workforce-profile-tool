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
      new Variable('AEST', true, 'AEST', 'AEST'),
      new Variable('AG', true, 'AG', 'AG'),
      new Variable('AGRI', true, 'AGRI', 'AGRI'),
      new Variable('BCPSA', true, 'BCPSA', 'BCPSA'),
      new Variable('CFD', true, 'CFD', 'CFD'),
      new Variable('CITZ', true, 'CITZ', 'CITZ'),
      new Variable('EAO', true, 'EAO', 'EAO'),
      new Variable('EDUC', true, 'EDUC', 'EDUC'),
      new Variable('EMBC', true, 'EMBC', 'EMBC'),
      new Variable('EMPR', true, 'EMPR', 'EMPR'),
      new Variable('ENV', true, 'ENV', 'ENV'),
      new Variable('FIN', true, 'FIN', 'FIN'),
      new Variable('FLNRORD', true, 'FLNRORD', 'FLNRORD'),
      new Variable('GCPE', true, 'GCPE', 'GCPE'),
      new Variable('HLTH', true, 'HLTH', 'HLTH'),
      new Variable('IRR', true, 'IRR', 'IRR'),
      new Variable('JTT', true, 'JTT', 'JTT'),
      new Variable('LBR', true, 'LBR', 'LBR'),
      new Variable('MAH', true, 'MAH', 'MAH'),
      new Variable('MHA', true, 'MHA', 'MHA'),
      new Variable('PGT', true, 'PGT', 'PGT'),
      new Variable('PO', true, 'PO', 'PO'),
      new Variable('PSSG', true, 'PSSG', 'PSSG'),
      new Variable('SDPR', true, 'SDPR', 'SDPR'),
      new Variable('TAC', true, 'TAC', 'TAC'),
      new Variable('TRAN', true, 'TRAN', 'TRAN')
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
