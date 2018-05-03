import React, { Component } from 'react'

import './Legend.css'

class Legend extends Component {
  render () {
    const rows = this.props.items.map(i => {
      return (
        <tr key={i.color}>
          <td className='color'>
            <div className='swatch'>
              <span style={{ 'color': i.color }}>●</span>
            </div>
          </td>
          <td className='label'>
            {i.label}
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
      </div>
    )
  }
}

export default Legend
