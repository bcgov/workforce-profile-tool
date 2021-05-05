import React from 'react'

const NoData = (): JSX.Element => {
  return (
    <div className="alert alert-warning Shadow" role="alert">
      <h2>No data</h2>
      <p>
        There is no data for the selected combination of filters. Try changing
        the filters.
      </p>
    </div>
  )
}

export default NoData
