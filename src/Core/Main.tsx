import { useLocation, useParams } from 'react-router'
import React from 'react'

import OccupationRegion, {
  OccupationRegionEnum,
} from '../Views/OccupationRegion'
import Comparison from '../Views/Comparison'
import Home from './Home'
import Leadership from '../Views/Leadership'
import Organization from '../Views/Organization'
import Progress from '../Views/Progress'
import Tab from '../Tabs/Tab'
import TabInterface from '../Tabs/TabInterface'

import './Main.scss'

interface MainParamProps {
  lowLevelNav?: string
  highLevelNav?: string
}

const Main = (): JSX.Element => {
  const location = useLocation()
  const { lowLevelNav, highLevelNav } = useParams<MainParamProps>()

  const activeOuterTab = highLevelNav || 'home'
  let activeInnerTab
  if (activeOuterTab === 'representation' && !lowLevelNav) {
    activeInnerTab = 'by-occupation'
  } else {
    activeInnerTab = lowLevelNav || 'representation-by-group'
  }

  return (
    <div className="Main">
      <TabInterface activeTabKey={activeOuterTab} search={location.search}>
        <Tab key={'home'} name="Home">
          <Home />
        </Tab>
        <Tab key={'indicators-of-progress'} name="Indicators of Progress">
          <Progress />
          {/* <div className="Secondary">
              <TabInterface
                activeTabKey={activeInnerTab}
                baseURL={`/${activeOuterTab}`}
                search={location.search}
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
        <Tab key={'organizations'} name="Organizations">
          <Organization />
        </Tab>
        <Tab key={'representation'} name="Representation">
          <div className="Secondary">
            <TabInterface
              activeTabKey={activeInnerTab}
              baseURL={`/${activeOuterTab}`}
              search={location.search}
            >
              <Tab key={'by-occupation'} name="By Occupation">
                <OccupationRegion viewType={OccupationRegionEnum.Occupation} />
              </Tab>
              <Tab key={'by-region'} name="By Region">
                <OccupationRegion viewType={OccupationRegionEnum.Region} />
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
  )
}

export default Main
