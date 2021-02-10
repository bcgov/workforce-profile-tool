import { RouteComponentProps, withRouter } from 'react-router-dom'
import React from 'react'

import { subtitle } from '../Views/Title'
import { useDataManager } from '../Data/DataManager'
import { VARIABLE_MANAGER } from '../Variables/VariableManager'
import Dictionary from '../@types/Dictionary'
import FixTypeLater from '../@types/FixTypeLater'
import MinistrySubGraph from './MinistrySubgraph'

import './Graphs.scss'

interface Props extends RouteComponentProps {
  title: string
  employeeCount: FixTypeLater
}

const MinistryGraph = (props: Props): JSX.Element => {
  const { ministryData: data } = useDataManager()

  if (!data) return <div>&nbsp;</div>

  // Split the data
  const dataMap: Dictionary = {}
  data.forEach((d) => {
    dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
    dataMap[d.Des_Grp].push(d)
  })

  const graphs = Object.keys(dataMap).map((k) => {
    const title = VARIABLE_MANAGER.displayNameByKey('Des_Grp', k)
    const shortTitle = VARIABLE_MANAGER.shortDisplayNameByKey('Des_Grp', k)

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
