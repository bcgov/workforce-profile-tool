type MinistryKeyedData = {
  Ministry_Key: string
}

type DesignatedGroupKeyedData = {
  Des_Grp: string
}

type EmployeeTypeKeyedData = {
  Employee_Type: string
}

export type ProgressRawData = MinistryKeyedData &
  EmployeeTypeKeyedData &
  DesignatedGroupKeyedData & {
    '2015_pc': number
    '2018_pc': number
    '2018_hired_ct': number
  }

export type LeadershipRawData = DesignatedGroupKeyedData & {
  Executive: number
  Management_Band: number
  Employees_BC_Population: number
  ALL_Available_Workforce: number
  ALL_BCPS: number
}

export type MinistryRawData = DesignatedGroupKeyedData &
  MinistryKeyedData & {
    Value: string
  }

export type ComparisonRawData = MinistryKeyedData &
  DesignatedGroupKeyedData &
  EmployeeTypeKeyedData & {
    Employees_BC_Population: number
    Available_Workforce_BCPS: number
    Employees_BCPS: number
  }

export type EmployeeCountRawData = MinistryKeyedData &
  EmployeeTypeKeyedData & {
    Employee_Count: number
  }

export type GenericRawData = {
  Ministry_Key?: string
  Des_Grp?: string
  Employee_Type?: string
}
