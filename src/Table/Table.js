import React, { Component } from 'react'
import './Table.css'
import Reactor from '@plot-and-scatter/reactor-table'

class Table extends Component {
  render () {
    const dataRows = [
      { 'key': 1, 'name': 'First' },
      { 'key': 2, 'name': 'Second' },
      { 'key': 3, 'name': 'Third' },
      { 'key': 10, 'name': 'Tenth' },
      { 'key': 11, 'name': 'Eleventh' }
    ]

    const columns = [{
      id: 'id',
      name: 'ID',
      accessor: d => d.key,
      displayAccessor: d => d.key
    },
    {
      id: 'name',
      name: 'Name',
      accessor: d => d.name
    }]

    const rowFilter = (r) => true

    return (
      <div className='Table row'>
        <div className='col'>
          <Reactor.Table
            columns={columns}
            rows={dataRows}
            rowFilter={rowFilter}
          />
        </div>
      </div>
    )
  }
}

export default Table
