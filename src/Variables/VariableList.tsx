import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './VariableList.scss'
import VariableDisplay from './VariableDisplay'
import FixTypeLater from '../@types/FixTypeLater'

interface Props extends RouteComponentProps {
  activeVariables?: FixTypeLater
  updateVariable?: FixTypeLater
  variablesToLock?: FixTypeLater
  variableManager?: FixTypeLater
}

class VariableList extends Component<Props> {
  render(): JSX.Element {
    // const variables = this.props.variableManager.variableGroups.map(
    //   (group: FixTypeLater) => (
    //     <VariableDisplay
    //       key={group.key}
    //       variableGroup={group}
    //       activeVariables={this.props.activeVariables}
    //       updateCallback={this.props.updateVariable}
    //       lockVariables={this.props.variablesToLock[group.key]}
    //       // useShortDisplay={group.key === 'Ministry_Key'}
    //     />
    //   )
    // )
    const variables: FixTypeLater[] = []

    return (
      <div className="VariableList row">
        <div className="col">{variables}</div>
      </div>
    )
  }
}

export default withRouter(VariableList)
