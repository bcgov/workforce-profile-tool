export type MinistryKeyedData = {
  Ministry_Key: string
}

export type DesignatedGroupKeyedData = {
  Des_Grp: string
}

export type EmployeeTypeKeyedData = {
  Employee_Type: string
}

export type ProgressRawData = MinistryKeyedData &
  EmployeeTypeKeyedData &
  DesignatedGroupKeyedData & {
    '2015_pc': string
    '2018_pc': string
    '2020_pc': string
    '2022_pc': string
    '2020_hired_ct': string
  }

export type LeadershipRawData = DesignatedGroupKeyedData & {
  Executive: string
  Management_Band: string
  Employees_BC_Population: string
  ALL_Available_Workforce: string
  ALL_BCPS: string
}

export type HiringRawData = MinistryKeyedData &
  EmployeeTypeKeyedData &
  DesignatedGroupKeyedData & {
    Variable_Type: string
    Display_Type: string
    DesGrp_Count_ORG: string
    Total_Count_ORG: string
  }

export type MinistryRawData = DesignatedGroupKeyedData &
  MinistryKeyedData & {
    Value: string
  }

export type MinistryKeyRawData = MinistryKeyedData & {
  Ministry_Title: string
}

export type ComparisonRawData = MinistryKeyedData &
  DesignatedGroupKeyedData &
  EmployeeTypeKeyedData & {
    Employees_BC_Population: string
    Available_Workforce_BCPS: string
    Employees_BCPS: string
  }

export type EmployeeCountRawData = MinistryKeyedData &
  EmployeeTypeKeyedData & {
    Employee_Count: string
  }

export type OccupationRegionRawData = MinistryKeyedData &
  DesignatedGroupKeyedData &
  EmployeeTypeKeyedData & {
    Variable_Type: string
    Occupation_Type: string
    Occupation_Region_Group: string
    DesGrp_Count_ORG: string
    NonDesGrp_Count_ORG: string
    Total_Count_ORG: string
    DesGrp_Percent_ORG: string
    DesGrp_Percent_AvailableWorkforce: string
    DesGrp_Count_Expected: string
    DesGrp_Count_Shortfall: string
  }

export type FlowRawData = MinistryKeyedData &
  DesignatedGroupKeyedData &
  EmployeeTypeKeyedData & {
    Variable_Type: string
    Display_Type: string
    DesGrp_Count_ORG: string
    NonDesGrp_Count_ORG: string
    Total_Count_ORG: string
    DesGrp_Percent_ORG: string
    NonDesGrp_Percent_ORG: string
  }

export type GenericRawData = {
  Ministry_Key?: string
  Des_Grp?: string
  Employee_Type?: string
}
