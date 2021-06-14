// If you change YEAR_PLACEHOLDER, also change in DataKeyEnum below, which
// cannot have computed members (so no string interpolation has been used).
export const YEAR_PLACEHOLDER = 'YYYY'

export enum DataKeyEnum {
  Comparison = `WPYYYY_Comparison`,
  Leadership = `WPYYYY_Leadership`,
  OccupationRegion = `WPYYYY_Rep_Occ_Rgn`,
  Progress = `WPYYYY_Ind_Progress`,
}
