import React from 'react'
import { Link } from 'react-router-dom'
import FixTypeLater from '../@types/FixTypeLater'
import './TabInterface.scss'

interface Props {
  activeTabKey: string
  children: React.ReactNode
  hideTextWhenSmall?: boolean
  search: string
  baseURL?: string
}

interface State {
  activeTabKey?: string
}

class TabInterface extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      activeTabKey: undefined,
    }

    this.setActiveTab = this.setActiveTab.bind(this)
  }

  setActiveTab(activeTab: string): void {
    this.setState({ activeTabKey: activeTab }, () => {
      // Fire a global event for any components that need to know when they are
      // visible (e.g. MapViz). Awkward code a result of fixing for IE.
      let event
      if (typeof window.Event === 'function') {
        event = new window.Event('shown')
      } else {
        event = document.createEvent('Event')
        event.initEvent('shown', true, true)
      }
      window.dispatchEvent(event)
    })
  }

  componentDidMount(): void {
    this.setActiveTab(this.props.activeTabKey)
  }

  componentDidUpdate(prevProps: Props): void {
    if (
      prevProps !== this.props &&
      this.props.activeTabKey !== this.state.activeTabKey
    ) {
      this.setActiveTab(this.props.activeTabKey)
    }
  }

  render(): JSX.Element {
    // Build the tab buttons at the top of the interface
    let tabButtons: React.ReactNode[] = []
    let tabs: React.ReactNode[] = []

    if (this.props.children && this.props.children instanceof Array) {
      tabButtons = this.props.children.map((child: FixTypeLater) => {
        const key = child.key
        const search = this.props.search
        const isActiveClass = key === this.state.activeTabKey ? ' active' : ''
        const linkTo = this.props.baseURL
          ? `${this.props.baseURL}/${key}${search}`
          : `/${key}${search}`
        return (
          <div
            key={child.props.name}
            className={`TabButton text-center ${isActiveClass}`}
          >
            <Link to={linkTo} role={'button'} title={child.props.name}>
              {child.props.icon && (
                <i className={'fa fa-lg ' + child.props.icon} />
              )}
              <span className={this.props.hideTextWhenSmall ? 'hidden-xs' : ''}>
                {child.props.name}
              </span>
            </Link>
          </div>
        )
      })

      // The actual tabs
      tabs = this.props.children.map((child: FixTypeLater) => {
        const key = child.key
        const showTab = key === this.state.activeTabKey
        const element = showTab ? (
          <div key={key} className="Tab row">
            <div className="col">{child}</div>
          </div>
        ) : (
          <div key={key} />
        )
        return element
      })
    }

    return (
      <div className="TabInterface my-3">
        <div className="row TabButtons">{tabButtons}</div>
        {tabs}
      </div>
    )
  }
}

export default TabInterface
