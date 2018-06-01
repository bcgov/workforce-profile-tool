/* global $ */

import React, { Component } from 'react'

import './Legend.css'

class Legend extends Component {
  constructor (props) {
    super(props)
    this.infoButtons = []
  }

  componentDidMount () {
    this.infoButtons.forEach(infoButton => {
      if (infoButton) $(infoButton).tooltip()
    })
  }

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
            {item.tooltip &&
              <a className='Info'
                ref={infoButton => { this.infoButtons[index] = infoButton }}
                data-toggle='tooltip'
                title={item.tooltip}
                data-placement='bottom'
              >
                <i className='fas fa-info-circle' />
              </a>
            }
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
