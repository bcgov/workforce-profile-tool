import React from 'react'
import { useDataManager } from '../Data/DataManager'

import './Definitions.scss'

export type Definition = {
  years?: number[] // Undefined if a value is valid for all years
  term: string
  definition: string
}

const DEFINITIONS: Definition[] = [
  {
    years: [2018, 2020],
    term: '<3',
    definition: 'Data suppressed because value is less than 3.',
  },
  {
    years: [2018, 2020],
    term: 'S',
    definition:
      'Value is 3 or greater, but is suppressed to prevent residual disclosure.',
  },
  {
    years: [2022],
    term: 'S',
    definition:
      'Data suppressed because value is less than 3, or to prevent residual disclosure.',
  },
]

export const definitionsForYear = (year: string | undefined) => {
  return DEFINITIONS.filter((item) =>
    item.years !== undefined ? item.years.includes(parseInt(year || '')) : true
  )
}

interface Props {
  additionalDefinitions?: Definition[]
}

/** The definitions to show underneath a table. */
const Definitions = ({ additionalDefinitions }: Props): JSX.Element => {
  const { year } = useDataManager()

  const definitionRows = definitionsForYear(year)
    .concat(additionalDefinitions || [])
    .map((item) => {
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
