import React, { Component } from 'react'

class Variable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      variable: props.variable
    }
  }

  render () {
    const options = this.state.variable.options.map(o =>
      <li key={o.key} className={o.active ? 'active' : ''}>{o.display}</li>
    )

    console.log(this.state.variable.options)
    console.log('options', options)

    return (
      <div>
        <h3>{this.props.variable.display}</h3>
        <ul>
          {options}
        </ul>
      </div>
    )
  }
}

export default Variable
