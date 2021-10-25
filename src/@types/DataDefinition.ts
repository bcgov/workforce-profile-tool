export type DataDefinition<T> = {
  label: string
  color: string
  tooltip?: string
  key: keyof T
}
