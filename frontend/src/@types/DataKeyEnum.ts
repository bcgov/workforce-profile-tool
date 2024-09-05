// If you change YEAR_PLACEHOLDER, also change in DataKeyEnum below, which
// cannot have computed members (so no string interpolation has been used).
export const YEAR_PLACEHOLDER = 'YYYY'

export enum DataKeyEnum {
  Comparison = `wpYYYY_comparison`,
  Leadership = `wpYYYY_leadership`,
  OccupationRegion = `wpYYYY_rep_occ_rgn`,
  Progress = `wpYYYY_ind_progress`,
  Hiring = `wpYYYY_hiring`,
  Flow = `wpYYYY_flow`,
}
