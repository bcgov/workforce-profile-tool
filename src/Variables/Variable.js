import React, { Component } from 'react'
import './Variable.css'

class Variable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      variable: props.variable
    }
    this.toggleActive = this.toggleActive.bind(this)
  }

  toggleActive (option) {
    option.active = !option.active

    // TODO: not super idiomatic; ideally, we'd update the state directly
    this.forceUpdate()
    this.props.updateCallback(this.state.variable)
  }

  render () {
    const options = this.state.variable.options.map(o => {
      return (
        <li
          key={o.key}
          className={o.active ? ' active' : ''}
          onClick={e => this.toggleActive(o)}
        >
          {o.display}
        </li>
      )
    })

    return (
      <div className='Variable'>
        <h3>{this.props.variable.display}</h3>
        <ul>
          {options}
        </ul>
      </div>
    )
  }
}

export default Variable
