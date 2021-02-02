import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import FixTypeLater from '../@types/FixTypeLater'

import Tooltip from '../Core/Tooltip'

import './Legend.scss'

interface Props extends RouteComponentProps {
  items: FixTypeLater[]
  notes?: React.ReactNode
}

class Legend extends Component<Props> {
  render(): JSX.Element {
    const rows = this.props.items.map((item) => {
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

    return (
      <div className="Legend">
        <h1>Legend</h1>
        <div>
          <table>
            <tbody>{rows}</tbody>
          </table>
        </div>
        {this.props.notes && <div className="Notes">{this.props.notes}</div>}
      </div>
    )
  }
}

export default withRouter(Legend)
