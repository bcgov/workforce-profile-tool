/* eslint react/jsx-key: "off" */ // Turn off the jsx-key warning.

import { usePagination, useSortBy, useTable } from 'react-table'
import React from 'react'

import ColumnSort from './ColumnSort'
import FixTypeLater from '../@types/FixTypeLater'
import { ColumnWithClassName } from '../@types/ColumnWithClassName'

interface Props<T extends Record<string, unknown>> {
  data: T[]
  columns: ColumnWithClassName<T>[]
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
}: Props<T>): JSX.Element => {
  const tableInstance = useTable({ columns, data }, useSortBy, usePagination)

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    page,
    prepareRow,
  }: FixTypeLater = tableInstance

  return (
    <>
      <table
        className="table table-sm table-striped mt-3"
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
                  <span {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    <ColumnSort column={column} />
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
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
      </table>
    </>
  )
}

export default Table
