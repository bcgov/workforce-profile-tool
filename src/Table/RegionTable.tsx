import React, { Component } from 'react'
import Reactor from '@plot-and-scatter/reactor-table'

import Tooltip from '../Core/Tooltip'
import Definitions from './Definitions'
import DownloadDataLink from './DownloadDataLink'
import { VARIABLES } from '../Variables/VariableManager'
import { formatNumber, formatPercent } from '../Services/formatter'
import FixTypeLater from '../@types/FixTypeLater'

import './Table.scss'
import Dictionary from '../@types/Dictionary'
import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { OccupationRegionRawData } from '../@types/DataTypes'

interface Props {
  data: FixTypeLater[]
  shortTitle?: string
}

class RegionTable extends Component<Props> {
  render(): JSX.Element {
    if (!this.props.data) return <div>&nbsp;</div>

    // Split the data
    const dataMap: Dictionary<any> = {}
    this.props.data.forEach((d) => {
      dataMap[d.Des_Grp] = dataMap[d.Des_Grp] || []
      dataMap[d.Des_Grp].push(d)
    })

    const tables = Object.keys(dataMap).map((k) => {
      const title = VARIABLES.displayNameByKey('Des_Grp', k)
      const shortTitle = VARIABLES.shortDisplayNameByKey('Des_Grp', k)
      return (
        <div key={k}>
          <h2>{title}</h2>
          <RegionSubTable data={dataMap[k]} shortTitle={shortTitle} />
          <br />
          <br />
        </div>
      )
    })

    return <div>{tables}</div>
  }
}

interface RegionSubTableProps {
  data: FixTypeLater[]
  shortTitle?: string
}

class RegionSubTable extends Component<RegionSubTableProps> {
  render(): JSX.Element {
    let regionRows = []
    let totalRow = []

    if (this.props.data) {
      regionRows = this.props.data.filter(
        (d) => d['Variable_Type'] === 'Region'
      )
      totalRow = this.props.data.filter((d) => d['Variable_Type'] === 'Total')
    }

    const columns: ColumnWithClassName<OccupationRegionRawData>[] = [
      {
        id: 'Occupation_Region_Group',
        Header: 'Occupation',
        accessor: (d) => d['Occupation_Region_Group'],
      },
      {
        id: 'DesGrp_Count_ORG',
        Header: this.props.shortTitle,
        accessor: (d) => formatNumber(d['DesGrp_Count_ORG']),
        className: 'text-right',
      },
      {
        id: 'NonDesGrp_Count_ORG',
        Header: `Non-${this.props.shortTitle}`,
        accessor: (d) => formatNumber(d['NonDesGrp_Count_ORG']),
        className: 'text-right',
      },
      {
        id: 'Total_Count_ORG',
        Header: (
          <span>
            Total &nbsp;
            <Tooltip
              text={`Total includes all members of the population, including non-respondents and employees for whom there is no relevant demographic data available.`}
            />
          </span>
        ),
        accessor: (d) => formatNumber(d['Total_Count_ORG']),
        className: 'text-right',
      },
      {
        id: 'DesGrp_Percent_ORG',
        Header: `Rate of ${this.props.shortTitle}`,
        accessor: (d) => formatPercent(d['DesGrp_Percent_ORG'], 1, 100),
        className: 'text-right',
      },
      {
        id: 'DesGrp_Percent_AvailableWorkforce',
        Header: (
          <span>
            {this.props.shortTitle} as % of Available Workforce &nbsp;
            <Tooltip
              text={`The representation of visible minorities in the BC Workforce according to Statistics Canada's 2011 National Household Survey. The "Available Workforce" is adjusted in accordance with the occupational distribution of jobs within the Public Service, and the geographic area from which recruitment is carried out, in order to reflect the "available" workforce to the Public Service.`}
            />
          </span>
        ),
        accessor: (d) =>
          formatPercent(d['DesGrp_Percent_AvailableWorkforce'], 1, 100),
        className: 'text-right',
      },
      {
        id: 'DesGrp_Count_Expected',
        Header: (
          <span>
            Expected # {this.props.shortTitle}
            &nbsp;
            <Tooltip
              text={`Shortfall numbers are only shown when the shortfall is equal to or greater than 30 employees or 20% of the expected number, where:
            <br />Expected Number = (Available Workforce Representation x Total in Occupation), and
            <br />Shortfall = Expected Number - Visible Minority.
            <br />Shortfall must be at least 2 to be considered a "significantly under-represented" occupation.</span>`}
            />
          </span>
        ),
        accessor: (d) => formatNumber(d['DesGrp_Count_Expected'], ''),
        className: 'text-right',
      },
      {
        id: 'DesGrp_Count_Shortfall',
        Header: `Shortfall of ${this.props.shortTitle}`,
        accessor: (d) => formatNumber(d['DesGrp_Count_Shortfall'], ''),
        className: 'text-right',
      },
    ]

    const rowFilter = () => true

    return (
      <div className="Table RegionTable row">
        <div className="col">
          {this.props.data && (
            <div>
              <Reactor.Table
                columns={columns}
                rows={regionRows}
                rowFilter={rowFilter}
                totalRows={totalRow}
              />
              <DownloadDataLink
                columns={columns}
                rows={regionRows}
                filename={'region'}
              />
            </div>
          )}
          <Definitions />
        </div>
      </div>
    )
  }
}

export default RegionTable
