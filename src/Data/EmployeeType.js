class EmployeeType {
  constructor (key, title) {
    this.key = key
    this.title = title
  }
}

const regular = new EmployeeType('regular', 'Regular')
const auxiliary = new EmployeeType('auxiliary', 'Auxiliary')
const all = new EmployeeType('all', 'All')

const EMPLOYEE_TYPES = {
  'regular': regular,
  'auxiliary': auxiliary,
  'all': all
}

const ORDERED_EMPLOYEE_TYPES = [
  regular, auxiliary, all
]

export { EmployeeType, EMPLOYEE_TYPES, ORDERED_EMPLOYEE_TYPES }
