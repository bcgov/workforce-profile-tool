import React, { Component } from 'react'
import TabInterface from '../Tabs/TabInterface'
import Tab from '../Tabs/Tab'
import './Main.css'
import Table from '../Table/Table'

class Main extends Component {
  render () {
    return (
      <div className='Main row'>
        <div className='col'>
          <TabInterface>
            <Tab key={1} name='Indicators of Success'>
              <div className='Secondary'>
                <TabInterface>
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
              <Table />
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
