import React from 'react'

import { MinistryRawData } from '../@types/DataTypes'
import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import Dictionary from '../@types/Dictionary'
import OrganizationSubGraph from './OrganizationSubgraph'

import './Graphs.scss'
import { useDataManager } from '../Data/DataManager'

interface Props {
  data: MinistryRawData[]
}

const MinistryGraph = ({ data }: Props): JSX.Element => {
  const { queryValues } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  // Split the data
  const dataMap: Dictionary<MinistryRawData[]> = {}
  data.forEach((d) => {
    dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
    dataMap[d.Des_Grp].push(d)
  })

  const COLOR_MAP: Dictionary<string> = {
    IND: '#234075',
    DIS: '#70CCDB',
    VM: '#D2E2EE',
    WOM: '#E6B345',
  }

  const graphs = Object.keys(dataMap)
    .filter((key) => dataMap[key].length > 1)
    .map((k) => {
      const title = displayNameByKey('Des_Grp', k)
      const shortTitle = shortDisplayNameByKey('Des_Grp', k)
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
            shortTitle={shortTitle}
            title={title}
            varKey={k}
          />
        </div>
      )
    })

  return <div>{graphs}</div>
}

export default MinistryGraph
