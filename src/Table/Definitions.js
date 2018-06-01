import React, { Component } from 'react'

import './Definitions.css'

class Definitions extends Component {
  render () {
    return (
      <dl className='Definitions'>
        <dt>&lt;3</dt><dd>Data suppressed because value is less than 3.</dd>
        <dt>S</dt><dd>Value is 3 or greater, but is suppressed to prevent residual disclosure.</dd>
        <dt>x</dt><dd>Data suppressed, but it can be revealed that the occupation is significantly under-represented without revealing the absolute number. For all other suppressed data, it cannot be revealed whether or not the occupation is significantly under-represented.</dd>
      </dl>
    )
  }
}

export default Definitions
