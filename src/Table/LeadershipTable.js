import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import { displayNameByKey } from '../Variables/VariableList'

import { parseFloatClean } from '../Services/formatter'

import './Table.css'

class ComparisonTable extends Component {
  render () {
    const columns = [
      {
        id: 'Des_Grp',
        name: 'Designated Group',
        accessor: d => displayNameByKey('Des_Grp', d['Des_Grp'])
      },
      {
        id: 'Applied_Leadership',
        name: 'Applied Leadership, %',
        accessor: d => parseFloatClean(d['Applied_Leadership']),
        displayAccessor: d => d['Applied_Leadership'],
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Business_Leadership',
        name: 'Business Leadership, %',
        accessor: d => parseFloatClean(d['Business_Leadership']),
        displayAccessor: d => d['Business_Leadership'],
        cellClass: 'text-right',
        headerClass: 'text-right'
      },
      {
        id: 'Strategic_Leadership',
        name: 'Strategic Leadership, %',
        accessor: d => parseFloatClean(d['Strategic_Leadership']),
        displayAccessor: d => d['Strategic_Leadership'],
        cellClass: 'text-right',
        headerClass: 'text-right'
      }
    ]

    const rowFilter = (r) => true

    return (
      <div className='Table row'>
        <div className='col'>
          { this.props.data &&
            <div>
              <Reactor.Table
                columns={columns}
                rows={this.props.data}
                rowFilter={rowFilter}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ComparisonTable
