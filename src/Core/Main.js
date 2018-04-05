import React, { Component } from 'react'
import TabInterface from '../Tabs/TabInterface'
import Tab from '../Tabs/Tab'
import './Main.css'

class Main extends Component {
  render () {
    const activeOuterTab = this.props.match.params.highLevelNav || 'indicators-of-progress'
    const activeInnerTab = this.props.match.params.lowLevelNav || 'by-occupation'

    return (
      <div className='Main row'>
        <div className='col'>
          <TabInterface activeTabKey={activeOuterTab} matchURL={this.props.match.url}>
            <Tab key={'indicators-of-progress'} name='Indicators of Progress'>
              <div className='Secondary'>
                <TabInterface activeTabKey={activeInnerTab} baseURL={`/${activeOuterTab}`}>
                  <Tab key={'by-occupation'} name='By Occupation'>
                    <h1>By Occupation</h1>
                  </Tab>
                  <Tab key={'by-region'} name='By Region'>
                    <h1>By Region</h1>
                  </Tab>
                  <Tab key={'flow-report'} name='Flow Report'>
                    <h1>Flow Report</h1>
                  </Tab>
                </TabInterface>
              </div>
            </Tab>
            <Tab key={'comparison'} name='Comparison'>
              <h1>Comparison</h1>
            </Tab>
            <Tab key={'leadership'} name='Leadership'>
              <h1>Leadership</h1>
            </Tab>
            <Tab key={'ministries'} name='Ministries'>
              <h1>Ministries</h1>
            </Tab>
            <Tab key={'representation'} name='Representation'>
              <h1>Representation</h1>
            </Tab>
          </TabInterface>
        </div>
      </div>
    )
  }
}

export default Main
