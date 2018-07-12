import React from 'react'

class Tab extends React.Component {
  render () {
    console.log('Tab rendering')
    return (
      <div className='col-xs-12'>
        {this.props.children}
      </div>
    )
  }
}

export default Tab
