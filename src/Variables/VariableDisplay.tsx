import { useQuery } from 'react-query'
import * as d3 from 'd3'

import { MinistryKeyRawData } from '../@types/DataTypes'
import { Variable } from '../@types/Variable'
import { VARIABLE_MAP, useDataManager } from '../Data/DataManager'
import { VariableGroup } from '../@types/VariableGroup'
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
  const url =
    metadata && metadata[dataKey] && year && year !== '2022'
      ? metadata[dataKey].csvURL
      : `/data/${year}/${dataKey}.csv`

  // TODO: Factor out and use useDataQuery
  const { data: unfilteredData } = useQuery(
    dataKey,
    async () => {
      // Handle CSV data.
      return (await d3.csv(url)) as unknown as MinistryKeyRawData[]
    },
    {
      enabled: !!(metadata && year),
      keepPreviousData: true,
    }
  )

  let selectableVariables: Variable[] = variableGroup.variables

  if (variableGroup.key === 'Ministry_Key' && unfilteredData) {
    selectableVariables =
      unfilteredData?.map((d): Variable => {
        return {
          key: d.Ministry_Key,
          name: d.Ministry_Title,
          shortName: d.Ministry_Key,
        }
      }) || []
    const indexOfBCPS = selectableVariables.findIndex((v) => v.key === 'BCPS')
    const bcpsElement = selectableVariables.splice(indexOfBCPS, 1).pop()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    selectableVariables = [bcpsElement!, ...selectableVariables]
    VARIABLE_MAP['Ministry_Key'].variables = selectableVariables
    // TODO: This should probably be moved to the DataManager.
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
    <div
      className={`VariableDisplay ${
        variableGroup.key === 'Ministry_Key' ? 'col-12' : 'col-4'
      } col-sm-12 ${variableGroup.key}`}
    >
      <h3>
        <span className="d-inline d-sm-none">
          {variableGroup.shortName || variableGroup.name}
        </span>
        <span className="d-none d-sm-inline">{variableGroup.name}</span>
      </h3>
      <ul>{options}</ul>
    </div>
  )
}

export default VariableDisplay
