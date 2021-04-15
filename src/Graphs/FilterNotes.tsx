import React from 'react'

import {
  VARIABLE_MAP,
  displayNameByKey,
  useDataManager,
} from '../Data/DataManager'
import { VariableGroup } from '../@types/VariableGroup'
import { QueryValues } from '../@types/QueryValues'

interface Props {
  isOrganizationNotes?: boolean
}

const FilterNotes = ({ isOrganizationNotes }: Props): JSX.Element => {
  const { queryValues } = useDataManager()

  if (!queryValues) return <></>

  return (
    <div className="FilterNotes Shadow">
      <h1>Active Filters</h1>
      {Object.values(VARIABLE_MAP)
        .filter((variableGroup) =>
          isOrganizationNotes
            ? variableGroup.key === 'Year' ||
              variableGroup.key === 'Employee_Type'
            : true
        )
        .map(
          (variableGroup: VariableGroup): JSX.Element => (
            <p key={variableGroup.name}>
              <strong>{variableGroup.name}</strong>:{' '}
              {displayNameByKey(
                variableGroup.key,
                queryValues[variableGroup.key as keyof QueryValues]
              )}
            </p>
          )
        )}
    </div>
  )
}

export default FilterNotes
