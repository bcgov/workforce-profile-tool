import React, { Component } from 'react'

class Occupation extends Component {
  render () {
    console.log('data', this.props.data)

    const headerRow = this.props.data
      ? <tr>{Object.keys(this.props.data[0]).map(k => <th>{k}</th>)}</tr>
      : null

    const rows = this.props.data ? this.props.data.map(d => {
      return (
        <tr>
          {Object.values(d).map(col => <td>{col}</td>)}
        </tr>
      )
    }) : null

    return (
      <div>
        <h1>Occupation</h1>
        <table>
          <thead>
            {headerRow}
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Occupation
