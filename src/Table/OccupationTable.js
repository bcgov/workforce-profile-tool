import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

class OccupationTable extends Component {
  render () {
    console.log('this.props.data', this.props.data)

    const dataRows = this.props.data

    const columns = [
      {
        id: 'id',
        name: 'ID',
        accessor: d => ''.concat(Object.values(d)),
        displayAccessor: d => ''
      },
      {
        id: 'DesignatedMinority_Group',
        name: 'Des. Grp.',
        accessor: d => d['DesignatedMinority_Group']
      },
      {
        id: 'Occupation_Region_Group',
        name: 'Occupation',
        accessor: d => d['Occupation_Region_Group']
      },
      {
        id: 'DesGrp_Count_ORG',
        name: 'Des. Grp.',
        accessor: d => d['DesGrp_Count_ORG']
      },
      {
        id: 'NonDesGrp_Count_ORG',
        name: 'Non-Des. Grp.',
        accessor: d => d['NonDesGrp_Count_ORG']
      },
      {
        id: 'Total_Count_ORG',
        name: 'Total',
        accessor: d => d['Total_Count_ORG']
      }
    ]

    const rowFilter = (r) => true

    return (
      <div className='Table row'>
        <div className='col'>
          { this.props.data &&
            <Reactor.Table
              columns={columns}
              rows={dataRows}
              rowFilter={rowFilter}
            />
          }
        </div>
      </div>
    )
  }
}

export default OccupationTable
