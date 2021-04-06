import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

import { DataDefinition } from '../@types/DataDefinition'
import Tooltip from '../Core/Tooltip'

import './Legend.scss'

interface Props extends RouteComponentProps {
  items: DataDefinition[]
  notes?: React.ReactNode
}

const Legend = (props: Props): JSX.Element => {
  const rows = props.items.map((item) => {
    return (
      <tr key={item.color}>
        <td className="color">
          <div className="swatch">
            <span style={{ color: item.color }}>●</span>
          </div>
        </td>
        <td className="label">
          {item.label}
          {item.tooltip && (
            <span>
              &nbsp;
              <Tooltip text={item.tooltip} />
            </span>
          )}
        </td>
      </tr>
    )
  })

  // TODO: Fix Date.now() as key, and invalidate props properly
  return (
    <div className="Legend" key={Date.now()}>
      <h1>Legend</h1>
      <div>
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
      {props.notes && <div className="Notes">{props.notes}</div>}
    </div>
  )
}

export default withRouter(Legend)
