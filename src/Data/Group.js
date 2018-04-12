class Group {
  constructor (key, title, filename) {
    this.key = key
    this.title = title
    this.filename = filename
  }
}

const GROUPS = {
  'aboriginal': new Group(
    'aboriginal',
    'Aboriginal',
    'aboriginal'
  ),
  'personsWithDisabilities': new Group(
    'personsWithDisabilities',
    'Persons with Disabilities',
    'persons-disabilities'
  ),
  'visibleMinorities': new Group(
    'visibleMinorities',
    'Visible Minorities',
    'visible-minorities'
  ),
  'women': new Group(
    'women',
    'Women',
    'women'
  )
}

export { Group, GROUPS }
