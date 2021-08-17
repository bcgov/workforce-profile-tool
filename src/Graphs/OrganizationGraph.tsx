import React from 'react'

import { displayNameByKey, shortDisplayNameByKey } from '../Data/DataManager'
import { MinistryRawData } from '../@types/DataTypes'
import Dictionary from '../@types/Dictionary'
import OrganizationSubGraph from './OrganizationSubgraph'
import Title from '../Views/Title'

import './Graphs.scss'
import { DataDictionaryEntry } from '../Data/useDataQuery'

interface Props {
  data?: MinistryRawData[]
  dataDictionary: DataDictionaryEntry[]
}

const MinistryGraph = ({ data, dataDictionary }: Props): JSX.Element => {
  if (!data || data.length === 0) return <div>&nbsp;</div>

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
          <Title title={title} />
          <OrganizationSubGraph
            color={color}
            data={dataMap[k]}
            dataDictionary={dataDictionary}
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
