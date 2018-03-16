import React from 'react'
import { Link } from 'react-router-dom'
import './TabInterface.css'

class TabInterface extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTabIndex: 0
    }

    this.setActiveTab = this.setActiveTab.bind(this)
  }

  setActiveTab (index) {
    if (Number.isInteger(+index)) {
      this.setState({ activeTabIndex: index })
    }
  }

  componentDidMount () {
    this.setActiveTab(this.props.activeTabIndex)
  }

  componentDidUpdate (prevProps, prevState) {
    // Fire a global event for any components that need to
    // know when they are visible (e.g. MapViz)
    window.dispatchEvent(new window.Event('shown'))
    if (prevProps !== this.props && this.props.activeTabIndex !== this.state.activeTabIndex) {
      this.setActiveTab(this.props.activeTabIndex)
    }
  }

  render () {
    // Build the tab buttons at the top of the interface
    const tabButtons = this.props.children.map((child, index) => {
      const isActiveClass = (index === this.state.activeTabIndex) ? ' active' : ''
      const linkTo = this.props.baseURL ? `${this.props.baseURL}/${index}` : `/${index}`
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
    const tabs = this.props.children.map((child, index) => {
      const showTab = (index === this.state.activeTabIndex) ? '' : 'none'
      return (
        <div key={index} className='Tab row' style={{display: showTab}}>
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
