import React from 'react'

import Dictionary from '../@types/Dictionary'
import Error from './Error'
import HistoricalData from './HistoricalData'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

interface Props<T extends Dictionary<unknown>> {
  children: React.ReactNode
  data: T[] | undefined
  error?: unknown
  isLoading?: boolean
  title?: string
}

const GenericView = <T extends Dictionary<unknown>>({
  children,
  data,
  error,
  isLoading,
  title,
}: Props<T>): JSX.Element => {
  return (
    <div>
      <HistoricalData />
      {title && <Title title={title} />}
      {(isLoading || !data) && <Loading />}
      {error && <Error />}
      {!isLoading && data && data.length === 0 && <NoData />}
      {data && data.length > 0 && <div>{children}</div>}
    </div>
  )
}

export default GenericView
