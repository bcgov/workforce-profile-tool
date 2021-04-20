import React from 'react'

const NoGraph = (): JSX.Element => {
  return (
    <div className="alert alert-warning" role="alert">
      <h2>No chart available</h2>
      <p>
        The data represented by the combination of filters you have selected
        cannot be charted, as all the values are either zero or otherwise
        suppressed. Please adjust your selected filters.
      </p>
    </div>
  )
}

export default NoGraph
