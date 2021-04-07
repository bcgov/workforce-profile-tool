import React from 'react'

import Comparison from '../Views/Comparison'
import FixTypeLater from '../@types/FixTypeLater'
import Hiring from '../Views/Hiring'
import Leadership from '../Views/Leadership'
import Ministry from '../Views/Ministry'
import Occupation from '../Views/Occupation'
import Progress from '../Views/Progress'
import Region from '../Views/Region'
import Tab from '../Tabs/Tab'
import TabInterface from '../Tabs/TabInterface'

import './Main.scss'
import Home from './Home'

interface Props {
  data?: FixTypeLater
  match?: FixTypeLater
  variableLockCallback?: FixTypeLater
  location?: FixTypeLater
}

const Main = (props: Props): JSX.Element => {
  const activeOuterTab = props.match.params.highLevelNav || 'home'
  let activeInnerTab
  if (activeOuterTab === 'representation' && !props.match.params.lowLevelNav) {
    activeInnerTab = 'by-occupation'
  } else {
    activeInnerTab = props.match.params.lowLevelNav || 'representation-by-group'
  }

  return (
    <div className="Main row">
      <div className="col">
        <TabInterface
          activeTabKey={activeOuterTab}
          matchURL={props.match.url}
          search={props.location.search}
        >
          <Tab key={'home'} name="Home">
            <Home />
          </Tab>
          <Tab key={'indicators-of-progress'} name="Indicators of Progress">
            <Progress />
            {/* <div className="Secondary">
              <TabInterface
                activeTabKey={activeInnerTab}
                baseURL={`/${activeOuterTab}`}
                search={props.location.search}
              >
                <Tab key={'representation-by-group'} name="By Designated Group">
                  <Progress />
                </Tab>
                 <Tab key={'hiring'} name="Hiring">
                  <Hiring />
                </Tab> 
              </TabInterface> 
            </div> */}
          </Tab>
          <Tab key={'comparison'} name="Comparison">
            <Comparison />
          </Tab>
          <Tab key={'leadership'} name="Leadership">
            <Leadership />
          </Tab>
          <Tab key={'ministries'} name="Ministries">
            <Ministry />
          </Tab>
          <Tab key={'representation'} name="Representation">
            <div className="Secondary">
              <TabInterface
                activeTabKey={activeInnerTab}
                baseURL={`/${activeOuterTab}`}
                search={props.location.search}
              >
                <Tab key={'by-occupation'} name="By Occupation">
                  <Occupation />
                </Tab>
                <Tab key={'by-region'} name="By Region">
                  <Region />
                </Tab>
                {/* <Tab key={'flow-report'} name="Flow Report">
                  <div className="alert alert-warning" role="alert">
                    <h2>Data for 2018 not yet available</h2>
                    <p>
                      The Flow Report data for 2018 is still being generated,
                      and will be added to the tool once available.
                    </p>
                  </div>
                </Tab> */}
              </TabInterface>
            </div>
          </Tab>
        </TabInterface>
      </div>
    </div>
  )
}

export default Main
