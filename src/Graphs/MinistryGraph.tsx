import { RouteComponentProps, withRouter } from 'react-router-dom'
import React from 'react'

import { MinistryRawData } from '../@types/DataTypes'
import { subtitle } from '../Views/Title'
import { useDataManager } from '../Data/DataManager'
import { VARIABLES } from '../Variables/VariableManager'
import Dictionary from '../@types/Dictionary'
import MinistrySubGraph from './MinistrySubgraph'

import './Graphs.scss'

interface Props extends RouteComponentProps {
  title: string
}

const MinistryGraph = (props: Props): JSX.Element => {
  const { ministryData: data } = useDataManager()

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
        <h2>{subtitle('', title)}</h2>
        <MinistrySubGraph
          data={dataMap[k]}
          masterTitle={props.title}
          title={title}
          shortTitle={shortTitle}
          varKey={k}
        />
      </div>
    )
  })

  return <div>{graphs}</div>
}

export default withRouter(MinistryGraph)
