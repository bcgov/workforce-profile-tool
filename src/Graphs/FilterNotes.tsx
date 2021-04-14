import React from 'react'

import {
  VARIABLE_MAP,
  displayNameByKey,
  useDataManager,
} from '../Data/DataManager'
import { VariableGroup } from '../@types/VariableGroup'
import { QueryValues } from '../@types/QueryValues'

const FilterNotes = (): JSX.Element => {
  const { queryValues } = useDataManager()

  return (
    <div className="FilterNotes Shadow">
      <h1>Active Filters</h1>
      {Object.values(VARIABLE_MAP).map(
        (variableGroup: VariableGroup): JSX.Element => (
          <p key={variableGroup.name}>
            <strong>{variableGroup.name}</strong>:{' '}
            {displayNameByKey(
              variableGroup.key,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              queryValues![variableGroup.key as keyof QueryValues]
            )}
          </p>
        )
      )}
    </div>
  )
}

export default FilterNotes
