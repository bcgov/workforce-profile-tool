import { useLocation, useParams } from 'react-router'

import { useDataManager } from '../Data/DataManager'
import Comparison from '../Views/Comparison'
import Home from './Home'
import Leadership from '../Views/Leadership'
import OccupationRegion, {
  OccupationRegionEnum,
} from '../Views/OccupationRegion'
import FlowReport from '../Views/FlowReport'
import Hiring from '../Views/Hiring'
import Organization from '../Views/Organization'
import Progress from '../Views/Progress'
import Tab from '../Tabs/Tab'
import TabInterface from '../Tabs/TabInterface'

import './Main.scss'

interface MainParamProps {
  /** The key for the low-level navigation (i.e. sub-tab), if necessary. */
  lowLevelNav?: string
  /** The key for the high-level navigation tab. */
  highLevelNav?: string
}

const Main = (): JSX.Element => {
  const location = useLocation()
  const { lowLevelNav, highLevelNav } = useParams<MainParamProps>()
  const { year } = useDataManager()

  // Set the default tabs: "Home" when highLevelNav is not present, a
  const activeOuterTab = highLevelNav || 'home'
  let activeInnerTab
  if (activeOuterTab === 'indicators-of-progress' && !lowLevelNav) {
    activeInnerTab = 'representation-by-group'
  } else if (activeOuterTab === 'representation' && !lowLevelNav) {
    // If the high level tab is "representation" and there's no low-level tab
    // set, the low-level tab defaults to the "by-occupation" inner tab.
    activeInnerTab = 'by-occupation'
  } else {
    // Otherwise, set to whatever might be passed in, or '' in the exceptional
    // case.
    activeInnerTab = lowLevelNav || ''
  }

  return (
    <div className="Main">
      <TabInterface activeTabKey={activeOuterTab} search={location.search}>
        <Tab key={'home'} name="Home">
          <Home />
        </Tab>
        <Tab key={'indicators-of-progress'} name="Indicators of Progress">
          {/* <Progress /> */}
          <div className="Secondary">
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
          </div>
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
              <Tab key={'flow-report'} name="Flow Report">
                <FlowReport />
              </Tab>
            </TabInterface>
          </div>
        </Tab>
      </TabInterface>
    </div>
  )
}

export default Main
