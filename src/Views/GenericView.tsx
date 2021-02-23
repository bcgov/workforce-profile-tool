import React from 'react'

import Dictionary from '../@types/Dictionary'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

interface Props<T extends Dictionary<unknown>> {
  title: string
  data: T[] | undefined
  children: React.ReactNode
}

const GenericView = <T extends Dictionary<unknown>>({
  title,
  data,
  children,
}: Props<T>): JSX.Element => {
  return (
    <div>
      <Title title={title} />
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && <div>{children}</div>}
    </div>
  )
}

export default GenericView
