import React from 'react'
import { Link } from 'react-router-dom'
import './TabInterface.css'

class TabInterface extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTabKey: 0
    }

    this.setActiveTab = this.setActiveTab.bind(this)
  }

  setActiveTab (activeTab) {
    this.setState({ activeTabKey: activeTab }, () => {
      // Fire a global event for any components that need to
      // know when they are visible (e.g. MapViz)
      window.dispatchEvent(new window.Event('shown'))
    })
  }

  componentDidMount () {
    this.setActiveTab(this.props.activeTabKey)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps !== this.props && this.props.activeTabKey !== this.state.activeTabKey) {
      this.setActiveTab(this.props.activeTabKey)
    }
  }

  render () {
    // Build the tab buttons at the top of the interface
    const tabButtons = this.props.children.map(child => {
      const key = child.key
      const search = this.props.search
      const isActiveClass = (key === this.state.activeTabKey) ? ' active' : ''
      const linkTo = this.props.baseURL
        ? `${this.props.baseURL}/${key}${search}`
        : `/${key}${search}`
      return (
        <div key={child.props.name} className={`TabButton ${isActiveClass}`}>
          <Link
            to={linkTo}
            role={'button'}
            title={child.props.name}
          >
            {child.props.icon && <i className={'fa fa-lg ' + child.props.icon} />}
            <span className={this.props.hideTextWhenSmall && 'hidden-xs'}>
              {child.props.name}
            </span>
          </Link>
        </div>
      )
    })

    // The actual tabs
    const tabs = this.props.children.map((child) => {
      const key = child.key
      const showTab = (key === this.state.activeTabKey) ? '' : 'none'
      return (
        <div key={key} className='Tab row' style={{display: showTab}}>
          <div className='col'>
            {child}
          </div>
        </div>
      )
    })

    return (
      <div className='TabInterface'>
        <div className='row TabButtons'>
          {tabButtons}
        </div>
        {tabs}
      </div>
    )
  }
}

TabInterface.propTypes = {
  children: function (props, propName, componentName) {
    // Validate that children are Tab components
    const prop = props[propName]
    let error = null
    React.Children.forEach(prop, function (child) {
      if (child.type.name !== 'Tab') {
        error = new Error(`\`${componentName}\` children should be of type \`Tab\`.`)
      }
    })
    return error
  }
}

export default TabInterface
