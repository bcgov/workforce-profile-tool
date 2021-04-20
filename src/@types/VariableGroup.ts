import { Variable } from './Variable'

export type VariableGroup = {
  key: string
  name: string
  isExclusive: boolean
  default: string | string[]
  variables: Variable[]
}
