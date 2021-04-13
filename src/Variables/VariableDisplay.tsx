import { useQuery } from 'react-query'
import * as d3 from 'd3'
import React from 'react'

import { MinistryKeyRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import { VariableGroup } from './VariableGroup'
import VariableItemDisplay from './VariableItemDisplay'

import './VariableDisplay.scss'

interface Props {
  variableGroup: VariableGroup
  useShortDisplay?: boolean
}

const VariableDisplay = ({
  useShortDisplay,
  variableGroup,
}: Props): JSX.Element => {
  const { metadata, year } = useDataManager()

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

  const keysForYear = unfilteredData?.map((d) => d.Ministry_Key) || []

  let selectableVariables = variableGroup.selectableVariables

  if (variableGroup.key === 'Ministry_Key') {
    selectableVariables = selectableVariables.filter((sv) => {
      return keysForYear.includes(sv.key)
    })
  }

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
      <h3 className="">{variableGroup.display}</h3>
      <ul>{options}</ul>
    </div>
  )
}

export default VariableDisplay
