/* eslint react/jsx-key: "off" */ // Turn off the jsx-key warning.

import { Column, usePagination, useSortBy, useTable } from 'react-table'

import { ColumnWithClassName } from '../@types/ColumnWithClassName'
import { DataDictionaryEntry } from '../Data/useDataQuery'
import ColumnSort from './ColumnSort'
import TableTooltip from './TableTooltip'

interface Props<T extends Record<string, unknown>> {
  columns: Column[]
  data: T[]
  dataDictionary: DataDictionaryEntry[]
  showFooter?: boolean
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  dataDictionary,
  showFooter,
}: Props<T>): JSX.Element => {
  const tableInstance = useTable(
    { columns, data, initialState: { pageSize: 1000 } },
    useSortBy,
    usePagination
  )

  const {
    footerGroups,
    getTableBodyProps,
    getTableProps,
    headerGroups,
    page,
    prepareRow,
  } = tableInstance

  return (
    <>
      <table
        className="table table-sm table-striped mt-3 Shadow"
        id="MainTable"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    {...column.getHeaderProps({
                      className: (column as ColumnWithClassName<T>).className,
                    })}
                  >
                    <div {...column.getSortByToggleProps()}>
                      <div className="d-flex align-items-end">
                        <div>
                          {column.render('Header')}
                          <TableTooltip
                            tooltipKey={column.id}
                            dataDictionary={dataDictionary}
                          />
                        </div>
                        <ColumnSort column={column} />
                      </div>
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps({
                        className: (cell.column as ColumnWithClassName<T>)
                          .className,
                      })}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        {showFooter && (
          <tfoot>
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <td
                    {...column.getHeaderProps({
                      className: (column as ColumnWithClassName<T>).className,
                    })}
                    {...column.getFooterProps()}
                  >
                    {column.render('Footer')}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
    </>
  )
}

export default Table
