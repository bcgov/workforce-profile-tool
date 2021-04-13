import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React from 'react'

import { MinistryKeyRawData } from '../@types/DataTypes'
import { VARIABLE_MAP, useDataManager } from '../Data/DataManager'
import VariableItemDisplay from './VariableItemDisplay'

import './VariableDisplay.scss'
import { VariableGroup } from '../@types/VariableGroup'
import { Variable } from '../@types/Variable'

interface Props {
  variableGroup: VariableGroup
  useShortDisplay?: boolean
}

const VariableDisplay = ({
  useShortDisplay,
  variableGroup,
}: Props): JSX.Element => {
  const { metadata, year } = useDataManager()

  console.log('variableGroup', variableGroup)

  const dataKey = `WP${year}_MinistryKey`
  const url = metadata ? metadata[dataKey].url : ''

  const { data: unfilteredData } = useQuery(
    dataKey,
    async () => {
      return (await d3.csv(url)) as MinistryKeyRawData[]
    },
    {
      enabled: !!metadata,
      keepPreviousData: true,
    }
  )

  let selectableVariables: Variable[] = variableGroup.variables

  if (variableGroup.key === 'Ministry_Key' && unfilteredData) {
    selectableVariables =
      unfilteredData?.map(
        (d): Variable => {
          return {
            key: d.Ministry_Key,
            name: d.Ministry_Title,
            shortName: d.Ministry_Key,
          }
        }
      ) || []
    const indexOfBCPS = selectableVariables.findIndex((v) => v.key === 'BCPS')
    const bcpsElement = selectableVariables.splice(indexOfBCPS, 1).pop()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    selectableVariables = [bcpsElement!, ...selectableVariables]
    VARIABLE_MAP['Ministry_Key'].variables = selectableVariables
    // TODO: This should probably be moved to the DataManager.
  }

  console.log(selectableVariables)

  const options = selectableVariables.map((variable) => (
    <VariableItemDisplay
      key={variable.key}
      variable={variable}
      useShortDisplay={useShortDisplay}
      variableGroup={variableGroup}
    />
  ))

  return (
    <div className="VariableDisplay">
      <h3 className="">{variableGroup.name}</h3>
      <ul>{options}</ul>
    </div>
  )
}

export default VariableDisplay
