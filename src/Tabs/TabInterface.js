import React from 'react'
import './TabInterface.css'

class TabInterface extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTabIndex: 0
    }
  }

  tabClick (index) {
    this.setState({ activeTabIndex: index })
  }

  componentDidUpdate () {
    // Fire a global event for any components that need to
    // know when they are visible (e.g. MapViz)
    window.dispatchEvent(new window.Event('shown'))
  }

  render () {
    // Build the tab buttons at the top of the interface
    const tabButtons = this.props.children.map((child, index) => {
      const isActiveClass = (index === this.state.activeTabIndex) ? ' active' : ''
      return (
        <div key={child.props.name} className={`TabButton ${isActiveClass}`}>
          <a
            onClick={() => this.tabClick(index)}
            role={'button'}
            tabIndex={'0'}
            title={child.props.name}
          >
            {child.props.icon && <i className={'fa fa-lg ' + child.props.icon} />}
            <span className={this.props.hideTextWhenSmall && 'hidden-xs'}>
              {child.props.name}
            </span>
          </a>
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
