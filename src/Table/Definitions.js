import React, { Component } from 'react'

import './Definitions.css'

export const DEFINITIONS = [
  { term: '<3', definition: 'Data suppressed because value is less than 3.' },
  { term: 'S', definition: 'Value is 3 or greater, but is suppressed to prevent residual disclosure.' },
  { term: 'x', definition: 'Data suppressed, but it can be revealed that the occupation is significantly under-represented without revealing the absolute number. For all other suppressed data, it cannot be revealed whether or not the occupation is significantly under-represented.' }
]

class Definitions extends Component {
  render () {
    const definitionRows = DEFINITIONS.map(item => {
      return (
        <React.Fragment key={item.term}>
          <dt>{item.term}</dt><dd>{item.definition}</dd>
        </React.Fragment>
      )
    })
    return (
      <dl className='Definitions'>
        { definitionRows }
      </dl>
    )
  }
}

export default Definitions
