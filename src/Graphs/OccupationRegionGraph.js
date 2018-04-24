import React, { Component } from 'react'
import DataLoader from '../Data/DataLoader'
import ORReport from '../Data/ORReport'

class OccupationRegionGraph extends Component {
  constructor () {
    super()

    this.state = { data: [] }
  }

  async componentDidMount () {
    const data = DataLoader.getOccupationRegionReport()
    console.log('data', data)
    this.setState({ data })
  }

  render () {
    return (
      <h1>Occupation</h1>
    )
  }
}

export default OccupationRegionGraph
