import FixTypeLater from './FixTypeLater'

type Dictionary<T = FixTypeLater> = {
  [key: string]: T
}

export default Dictionary
