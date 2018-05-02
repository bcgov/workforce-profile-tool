import React, { Component } from 'react'
import TabInterface from '../Tabs/TabInterface'
import Tab from '../Tabs/Tab'
import './Main.css'
import Occupation from '../Views/Occupation'
import Region from '../Views/Region'
import Ministry from '../Views/Ministry'

class Main extends Component {
  getOccupationData (data) {
    return data ? data.filter(r => r['Variable_Type'] !== 'Region') : data
  }

  getRegionData (data) {
    return data ? data.filter(r => r['Variable_Type'] !== 'Management') : data
  }

  render () {
    const activeOuterTab = this.props.match.params.highLevelNav || 'indicators-of-progress'
    const activeInnerTab = this.props.match.params.lowLevelNav || 'by-occupation'

    return (
      <div className='Main row'>
        <div className='col'>
          <TabInterface activeTabKey={activeOuterTab} matchURL={this.props.match.url} search={this.props.location.search}>
            <Tab key={'indicators-of-progress'} name='Indicators of Progress' />
            <Tab key={'comparison'} name='Comparison'>
              <h1>Comparison</h1>
            </Tab>
            <Tab key={'leadership'} name='Leadership'>
              <h1>Leadership</h1>
            </Tab>
            <Tab key={'ministries'} name='Ministries'>
              <Ministry data={this.props.data.ministryData} />
            </Tab>
            <Tab key={'representation'} name='Representation'>
              <div className='Secondary'>
                <TabInterface activeTabKey={activeInnerTab} baseURL={`/${activeOuterTab}`} search={this.props.location.search}>
                  <Tab key={'by-occupation'} name='By Occupation'>
                    <Occupation data={this.getOccupationData(this.props.data.occupationRegionData)} />
                  </Tab>
                  <Tab key={'by-region'} name='By Region'>
                    <Region data={this.getRegionData(this.props.data.occupationRegionData)} />
                  </Tab>
                  <Tab key={'flow-report'} name='Flow Report'>
                    <h1>Flow Report</h1>
                  </Tab>
                </TabInterface>
              </div>
            </Tab>
          </TabInterface>
        </div>
      </div>
    )
  }
}

export default Main
