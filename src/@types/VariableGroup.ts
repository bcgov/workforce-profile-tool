import { Variable } from './Variable'

export type VariableGroup = {
  key: string
  name: string
  shortName?: string
  isExclusive: boolean
  default: string | string[]
  variables: Variable[]
}
