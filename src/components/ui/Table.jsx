import React, { useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  StyledTable,
  StyledButton,
  StyledFooter,
  StyledSpinner,
  StyledPagination,
} from "../../styles/CommonStyle";

export function Table({ data, columns }) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: data?.value ? data.value : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() &&
                    { asc: " 🔼", desc: " 🔽", false: " ↕" }[
                      header.column.getIsSorted() ?? null
                    ]}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data?.loading ? (
            <tr>
              <td colSpan={columns?.length}>
                <StyledSpinner viewBox="0 0 50 50">
                  <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                  />
                </StyledSpinner>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </StyledTable>
      <StyledPagination>
        <StyledButton type="primary" onClick={() => table.setPageIndex(0)}>
          &nbsp;{"<<"}&nbsp;
        </StyledButton>
        <StyledButton
          type="primary"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          &nbsp;{"<"}&nbsp;
        </StyledButton>
        <StyledButton
          type="primary"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          &nbsp;{">"}&nbsp;
        </StyledButton>
        <StyledButton
          type="primary"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          &nbsp;{">>"}&nbsp;
        </StyledButton>
      </StyledPagination>

      <StyledFooter>
        Page{" "}
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}{" "}
        </strong>
      </StyledFooter>
    </>
  );
}
