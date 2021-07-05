import React, { useEffect } from 'react'
import { DataKeyEnum } from '../@types/DataKeyEnum'
import { HiringRawData } from '../@types/DataTypes'
import { useDataManager } from '../Data/DataManager'
import { useDataQuery } from '../Data/useDataQuery'

const Hiring = (): JSX.Element => {
  const { setLockedVars } = useDataManager()

  // When page loads, set the locked variables as appropriate.
  useEffect(() => setLockedVars({ Year: ['2020'] }), [])

  const { data, isLoading, error } = useDataQuery<HiringRawData>(
    DataKeyEnum.Hiring
  )

  console.log('data', data, 'isLoading', isLoading, 'error', error)

  return (
    <>
      <h2>Hiring</h2>
      <p>Intentionally left blank</p>
    </>
  )
  // const { progressData: data, hiringTotal, setLockedVars } = useDataManager()

  // useEffect(() => setLockedVars({}), [])

  // const totalHired = hiringTotal

  // const columns: ColumnWithClassName<ProgressRawData>[] = [
  //   {
  //     id: 'Des_Grp',
  //     Header: 'Designated Group',
  //     accessor: (r) => displayNameByKey('Des_Grp', r.Des_Grp) || '',
  //   },
  //   {
  //     id: '2020_hired_ct',
  //     Header: 'Hired, 2015 to 2018',
  //     accessor: (r) => formatNumber(r['2020_hired_ct']),
  //     className: 'text-right',
  //   },
  //   {
  //     id: 'percent_total',
  //     Header: 'Percent of all hires',
  //     accessor: (r) => formatPercent(r['2020_hired_ct'], 1, totalHired),
  //     className: 'text-right',
  //   },
  // ]

  // const codeOrder: Dictionary<number> = {
  //   // TODO: Factor this out
  //   IND: 0,
  //   DIS: 1,
  //   VM: 2,
  //   WOM: 3,
  //   WOM_SM: 4,
  //   AS_TOTAL: 5,
  // }

  // if (data && data.length) {
  //   data.sort((a, b) => codeOrder[a.Des_Grp] - codeOrder[b.Des_Grp])
  // }

  // return (
  //   <GenericView
  //     title="Indicators of Progress — Hiring, 2015 to 2018"
  //     data={data}
  //   >
  //     <HiringGraph title={'Indicators of Progress — Hiring, 2015 to 2018'} />
  //     <GenericTable columns={columns} data={data} filename="hiring" />
  //   </GenericView>
  // )
}

export default Hiring
