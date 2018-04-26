class Group {
  constructor (key, title, filename) {
    this.key = key
    this.title = title
    this.filename = filename
  }
}

const GROUPS = {
  'indigenous': new Group(
    'indigenous',
    'Indigenous',
    'indigenous'
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
