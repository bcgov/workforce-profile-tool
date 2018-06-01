import React, { Component } from 'react'

import Tooltip from '../Core/Tooltip'

import './Legend.css'

class Legend extends Component {
  render () {
    const rows = this.props.items.map((item, index) => {
      return (
        <tr key={item.color}>
          <td className='color'>
            <div className='swatch'>
              <span style={{ 'color': item.color }}>●</span>
            </div>
          </td>
          <td className='label'>
            {item.label}
            {item.tooltip && <span>&nbsp;<Tooltip text={item.tooltip} /></span>}
          </td>
        </tr>
      )
    })

    return (
      <div className='Legend'>
        <h1>Legend</h1>
        <div>
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
        {this.props.notes &&
          <div className='Notes'>
            {this.props.notes}
          </div>
        }
      </div>
    )
  }
}

export default Legend
