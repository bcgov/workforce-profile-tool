import React from 'react'

import { MinistryRawData } from '../@types/DataTypes'
import { VARIABLES } from '../Variables/VariableManager'
import Dictionary from '../@types/Dictionary'
import OrganizationSubGraph from './OrganizationSubgraph'

import './Graphs.scss'

interface Props {
  data: MinistryRawData[]
}

const MinistryGraph = ({ data }: Props): JSX.Element => {
  if (!data) return <div>&nbsp;</div>

  // Split the data
  const dataMap: Dictionary<MinistryRawData[]> = {}
  data.forEach((d) => {
    dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
    dataMap[d.Des_Grp].push(d)
  })

  console.log('dataMap', dataMap)

  const COLOR_MAP: Dictionary<string> = {
    IND: '#234075',
    DIS: '#70CCDB',
    VM: '#D2E2EE',
    WOM: '#E6B345',
  }

  const graphs = Object.keys(dataMap).map((k) => {
    const title = VARIABLES.displayNameByKey('Des_Grp', k)
    const shortTitle = VARIABLES.shortDisplayNameByKey('Des_Grp', k)
    const color = COLOR_MAP[k]

    return (
      <div key={k}>
        <h2>
          {title}, regular employees {/* TODO: tidy up */}
        </h2>
        <OrganizationSubGraph
          color={color}
          data={dataMap[k]}
          masterTitle={title}
          title={title}
          shortTitle={shortTitle}
          varKey={k}
        />
      </div>
    )
  })

  return <div>{graphs}</div>
}

export default MinistryGraph
