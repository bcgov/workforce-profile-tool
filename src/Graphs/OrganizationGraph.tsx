import React from 'react'

import { MinistryRawData } from '../@types/DataTypes'
import { VARIABLES } from '../Variables/VariableManager'
import Dictionary from '../@types/Dictionary'
import OrganizationSubGraph from './OrganizationSubgraph'

import './Graphs.scss'

interface Props {
  data: MinistryRawData[]
  title: string
}

const MinistryGraph = ({ data, title }: Props): JSX.Element => {
  if (!data) return <div>&nbsp;</div>

  // Split the data
  const dataMap: Dictionary<MinistryRawData[]> = {}
  data.forEach((d) => {
    dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
    dataMap[d.Des_Grp].push(d)
  })

  const graphs = Object.keys(dataMap).map((k) => {
    const title = VARIABLES.displayNameByKey('Des_Grp', k)
    const shortTitle = VARIABLES.shortDisplayNameByKey('Des_Grp', k)

    return (
      <div key={k}>
        <h2>
          {title}, regular employees {/* TODO: tidy up */}
        </h2>
        <OrganizationSubGraph
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
