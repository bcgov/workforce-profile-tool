import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './VariableList.css'
import VariableDisplay from './VariableDisplay'

class VariableList extends Component {
  render () {
    const variables = this.props.variableManager.variableGroups.map(group =>
      <VariableDisplay
        key={group.key}
        variableGroup={group}
        activeVariables={this.props.activeVariables}
        updateCallback={this.props.updateVariable}
        lockVariables={group.key !== 'Des_Grp' && this.props.lockVariables}
        // useShortDisplay={group.key === 'Ministry_Key'}
      />
    )

    return (
      <div className='VariableList row'>
        <div className='col'>
          {variables}
        </div>
      </div>
    )
  }
}

export default withRouter(VariableList)
