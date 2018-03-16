import React, { Component } from 'react'
import TabInterface from '../Tabs/TabInterface'
import Tab from '../Tabs/Tab'
import './Main.css'

class Main extends Component {
  render () {
    const outerTabIndex = +this.props.match.params.highLevelNav || 0
    const innerTabIndex = +this.props.match.params.lowLevelNav || 0

    return (
      <div className='Main row'>
        <div className='col'>
          <TabInterface activeTabIndex={outerTabIndex} matchURL={this.props.match.url}>
            <Tab key={1} name='Indicators of Success'>
              <div className='Secondary'>
                <TabInterface activeTabIndex={innerTabIndex} baseURL={`/${outerTabIndex}`}>
                  <Tab key={11} name='By Occupation'>
                    <h1>By Occupation</h1>
                  </Tab>
                  <Tab key={12} name='By Region'>
                    <h1>By Region</h1>
                  </Tab>
                  <Tab key={13} name='Flow Report'>
                    <h1>Flow Report</h1>
                  </Tab>
                </TabInterface>
              </div>
            </Tab>
            <Tab key={2} name='Comparison'>
              <h1>Comparison</h1>
            </Tab>
            <Tab key={3} name='Leadership'>
              <h1>Leadership</h1>
            </Tab>
            <Tab key={4} name='Ministries'>
              <h1>Ministries</h1>
            </Tab>
            <Tab key={4} name='Representation'>
              <h1>Representation</h1>
            </Tab>
          </TabInterface>
        </div>
      </div>
    )
  }
}

export default Main
