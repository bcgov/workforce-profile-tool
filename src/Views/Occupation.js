import React, { Component } from 'react'

class Occupation extends Component {
  generateKey (d, colKey = null) {
    let key = `${d.BCPS_Ministry_Group}-${d.DesignatedMinority_Group}-${d.Employee_Type}-${d.Occupation_Region_Group}`

    if (colKey) {
      key += `-${colKey}`
    }

    return key
  }

  render () {
    console.log('data', this.props.data)

    const headerRow = this.props.data
      ? <tr>{Object.keys(this.props.data[0]).map(k => <th key={k}>{k}</th>)}</tr>
      : null

    const rows = this.props.data ? this.props.data.map(d => {
      return (
        <tr key={this.generateKey(d)}>
          {Object.keys(d).map(colKey => {
            const col = d[colKey]
            return <td key={this.generateKey(d, colKey)}>{col}</td>
          })
          }
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
