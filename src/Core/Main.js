import React, { Component } from 'react'
import TabInterface from '../Tabs/TabInterface'
import Tab from '../Tabs/Tab'
import './Main.css'
import Occupation from '../Views/Occupation'
import Region from '../Views/Region'
import Ministry from '../Views/Ministry'
import Leadership from '../Views/Leadership'
import Comparison from '../Views/Comparison'
import Progress from '../Views/Progress'
import Hiring from '../Views/Hiring'
import FlowReport from '../Views/FlowReport'

class Main extends Component {
  getOccupationData (data) {
    return data ? data.filter(r => r['Variable_Type'] !== 'Region') : data
  }

  getRegionData (data) {
    return data ? data.filter(r => r['Variable_Type'] !== 'Management') : data
  }

  render () {
    const activeOuterTab = this.props.match.params.highLevelNav || 'home'
    let activeInnerTab
    if (activeOuterTab === 'representation' && !this.props.match.params.lowLevelNav) {
      activeInnerTab = 'by-occupation'
    } else {
      activeInnerTab = this.props.match.params.lowLevelNav || 'representation-by-group'
    }

    return (
      <div className='Main row'>
        <div className='col'>
          <TabInterface activeTabKey={activeOuterTab} matchURL={this.props.match.url} search={this.props.location.search}>
            <Tab key={'home'} name='Home'>
              <div>
                <h1>Workforce Profiles Report 2018</h1>
                <p className='lead'>
                  Explore statistics on the representation of designated equity groups across the BC Public Service. This online tool replaces the paper report that was previously produced which can be found on the <a href='https://www2.gov.bc.ca/gov/content/data/statistics/government/employee-research' target='_blank' rel='noopener noreferrer'>BC Stats website</a>.
                </p>
                <p className='lead'>
                  Use the tabs at the top to begin your journey. You can refine your selections by using the filters on the left.
                </p>
                <h2>Contact</h2>
                <p className='lead'>Questions? Contact us through <a href='https://www2.gov.bc.ca/gov/content/home/contact-us' target='_blank' rel='noopener noreferrer'>Service BC</a>.</p>
              </div>
            </Tab>
            <Tab key={'indicators-of-progress'} name='Indicators of Progress'>
              <div className='Secondary'>
                <TabInterface activeTabKey={activeInnerTab} baseURL={`/${activeOuterTab}`} search={this.props.location.search}>
                  <Tab key={'representation-by-group'} name='By Designated Group'>
                    <Progress
                      variableLockCallback={this.props.variableLockCallback}
                      data={this.props.data.iopReportData}
                    />
                  </Tab>
                  <Tab key={'hiring'} name='Hiring'>
                    <Hiring
                      variableLockCallback={this.props.variableLockCallback}
                      data={this.props.data.iopReportData}
                    />
                  </Tab>
                </TabInterface>
              </div>
            </Tab>
            <Tab key={'comparison'} name='Comparison'>
              <Comparison
                variableLockCallback={this.props.variableLockCallback}
                data={this.props.data.comparisonData}
              />
            </Tab>
            <Tab key={'leadership'} name='Leadership'>
              <Leadership
                variableLockCallback={this.props.variableLockCallback}
                data={this.props.data.leadershipData}
              />
            </Tab>
            <Tab key={'ministries'} name='Ministries'>
              <Ministry
                variableLockCallback={this.props.variableLockCallback}
                data={this.props.data.ministryData}
              />
            </Tab>
            <Tab key={'representation'} name='Representation'>
              <div className='Secondary'>
                <TabInterface activeTabKey={activeInnerTab} baseURL={`/${activeOuterTab}`} search={this.props.location.search}>
                  <Tab key={'by-occupation'} name='By Occupation'>
                    <Occupation
                      variableLockCallback={this.props.variableLockCallback}
                      data={this.getOccupationData(this.props.data.occupationRegionData)}
                    />
                  </Tab>
                  <Tab key={'by-region'} name='By Region'>
                    <Region
                      variableLockCallback={this.props.variableLockCallback}
                      data={this.getRegionData(this.props.data.occupationRegionData)}
                    />
                  </Tab>
                  <Tab key={'flow-report'} name='Flow Report'>
                    {/* <FlowReport
                      variableLockCallback={this.props.variableLockCallback}
                      data={this.props.data.flowReportData}
                    /> Commented out while we are waiting for Flow data - FH */}
                    <div className='alert alert-warning' role='alert'>
                      <h2>Data for 2018 not yet available</h2>
                      <p>The Flow Report data for 2018 is still being generated, and will be added to the tool once available.</p>
                    </div>
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
