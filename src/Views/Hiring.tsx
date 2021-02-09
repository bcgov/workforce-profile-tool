import React, { Component } from 'react'
import FixTypeLater from '../@types/FixTypeLater'
import { useDataManager } from '../Data/DataManager'
import HiringGraph from '../Graphs/HiringGraph'
import HiringTable from '../Table/HiringTable'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

const Hiring = (): JSX.Element => {
  const title = 'Indicators of Progress — Hiring, 2015 to 2018'
  const employeeCount = 1000 // useQueryParams
  const { indicatorsOfProgressData: data } = useDataManager()

  return (
    <div>
      <Title title={title} employeeCount={employeeCount} />
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && (
        <div>
          <HiringGraph data={data} title={title} />
          <HiringTable data={data} />
        </div>
      )}
    </div>
  )
}

export default Hiring
