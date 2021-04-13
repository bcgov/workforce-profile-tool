/* eslint react/jsx-key: "off" */ // Turn off the jsx-key warning.

import { usePagination, useSortBy, useTable } from 'react-table'
import React from 'react'

import ColumnSort from './ColumnSort'
import FixTypeLater from '../@types/FixTypeLater'
import { ColumnWithClassNameAndFooter } from '../@types/ColumnWithClassName'

interface Props<T extends Record<string, unknown>> {
  data: T[]
  columns: ColumnWithClassNameAndFooter<T>[]
  showFooter?: boolean
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  showFooter,
}: Props<T>): JSX.Element => {
  const tableInstance = useTable({ columns, data }, useSortBy, usePagination)

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    footerGroups,
    page,
    prepareRow,
  }: FixTypeLater = tableInstance

  return (
    <>
      <table
        className="table table-sm table-striped mt-3 Shadow"
        id="MainTable"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup: FixTypeLater) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: FixTypeLater) => (
                <th
                  {...column.getHeaderProps({
                    className: column.className,
                  })}
                >
                  <div {...column.getSortByToggleProps()}>
                    <div className="d-flex align-items-end">
                      <div>{column.render('Header')}</div>
                      <ColumnSort column={column} />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: FixTypeLater) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: FixTypeLater) => {
                  return (
                    <td
                      {...cell.getCellProps({
                        className: cell.column.className,
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
            {footerGroups.map((footerGroup: FixTypeLater) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column: FixTypeLater) => (
                  <td
                    {...column.getHeaderProps({
                      className: column.className,
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
