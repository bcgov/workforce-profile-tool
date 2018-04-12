class Region {
  constructor (key, title) {
    this.key = key
    this.title = title
  }
}

const vancouver = new Region('vancouver', 'Vancouver CMA')
const victoria = new Region('victoria', 'Victoria CMA')
const other = new Region('other', 'Other B.C. and Not Specified')

const REGIONS = {
  'vancouver': vancouver,
  'victoria': victoria,
  'other': other
}

const ORDERED_REGIONS = [
  vancouver, victoria, other
]

export { Region, REGIONS, ORDERED_REGIONS }
