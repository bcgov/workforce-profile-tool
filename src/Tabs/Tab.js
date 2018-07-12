import React from 'react'

class Tab extends React.Component {
  render () {
    return (
      <div className='col-xs-12'>
        {this.props.children}
      </div>
    )
  }
}

export default Tab
