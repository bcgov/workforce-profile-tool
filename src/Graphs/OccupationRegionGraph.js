import React, { Component } from 'react'
import DataLoader from '../Data/DataLoader'
import { GROUPS } from '../Data/Group'
import OccupationRegionReport from '../Data/OccupationRegionReport'

class OccupationRegionGraph extends Component {
  constructor () {
    super()

    this.state = { data: [] }
  }

  async componentDidMount () {
    const lineArray = await DataLoader.getOccupationRegionReport(GROUPS.aboriginal)
    const data = new OccupationRegionReport(lineArray)
    this.setState({ data })
  }

  render () {
    return (
      <h1>Occupation by Region</h1>
    )
  }
}

export default OccupationRegionGraph
