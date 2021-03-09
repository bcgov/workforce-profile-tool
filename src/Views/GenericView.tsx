import React from 'react'

import Dictionary from '../@types/Dictionary'
import Loading from './Loading'
import NoData from './NoData'
import Title from './Title'

interface Props<T extends Dictionary<unknown>> {
  children: React.ReactNode
  data: T[] | undefined
  title?: string
}

const GenericView = <T extends Dictionary<unknown>>({
  children,
  data,
  title,
}: Props<T>): JSX.Element => {
  return (
    <div>
      {title && <Title title={title} />}
      {!data && <Loading />}
      {data && data.length === 0 && <NoData />}
      {data && data.length > 0 && <div>{children}</div>}
    </div>
  )
}

export default GenericView
