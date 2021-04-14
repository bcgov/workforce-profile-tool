import React from 'react'

import './Definitions.scss'

export const DEFINITIONS = [
  { term: '<3', definition: 'Data suppressed because value is less than 3.' },
  {
    term: 'S',
    definition:
      'Value is 3 or greater, but is suppressed to prevent residual disclosure.',
  },
  {
    term: 'x',
    definition:
      'Data suppressed, but it can be revealed that the occupation is significantly under-represented without revealing the absolute number. For all other suppressed data, it cannot be revealed whether or not the occupation is significantly under-represented.',
  },
]

const Definitions = (): JSX.Element => {
  const definitionRows = DEFINITIONS.map((item) => {
    return (
      <React.Fragment key={item.term}>
        <div className="term">{item.term}</div>
        <div className="definition">{item.definition}</div>
      </React.Fragment>
    )
  })
  return <div className="Definitions">{definitionRows}</div>
}

export default Definitions
