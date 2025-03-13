import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Cell, Row, Table as TableType } from "@/types";
import CellInput from "./CellInput";
import { memo, useCallback, useEffect, useState } from "react";
import * as BSON from "bson";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const generateId = () => new BSON.ObjectId().toString();

const TableUI = ({
  table,
  updateTableData,
}: {
  table: TableType;
  updateTableData: (updatedTableData: TableType) => void;
}) => {
  const [tableState, setTableState] = useState<TableType>(table);
  const [isSavingTableData, setIsSavingTableData] = useState<boolean>(false)

  useEffect(() => {
    updateTableData(tableState);
  }, [tableState]);

  const updateTableCell = useCallback(
    (rowId: string, cellId: string, newValue: string) => {
      setTableState((table: TableType) => ({
        ...table,
        rows: table.rows.map((row: Row) =>
          rowId === row.id
            ? {
                ...row,
                cells: row.cells.map((cell: Cell) =>
                  cell.id === cellId ? { ...cell, data: newValue } : cell
                ),
              }
            : row
        ),
      }));
    },
    []
  );

  const addRow = () => {
    const cellCount = tableState.rows[tableState.rows.length - 1].cells.length;
    setTableState((table: TableType) => {
      table.rows = [
        ...table.rows,
        new Row(
          generateId(),
          Array.from({ length: cellCount }).map(
            (_) => new Cell(generateId(), "", true, 1, 1)
          ),
          false
        ),
      ];
      return { ...table };
    });
  };

  const saveTable = async () => {
    try {
      setIsSavingTableData(true);
      const raw = await fetch(
        `http://localhost:8000/section/table/${table.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(tableState),
        }
      );

      const res = await raw.json();

      if (raw.status < 200 || raw.status > 399) throw new Error(res.message);

      toast.success(res.message);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    } finally {
      setIsSavingTableData(false);
    }
  };

  return (
    <div className="mb-10 bg-blue-50 p-3 rounded-md">
      <Table>
        <TableHeader>
          {tableState.rows
            .filter((row: Row) => row.isHeading)
            .map((row: Row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell: Cell) => (
                  <TableHead
                    key={cell.id}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    className="text-center"
                  >
                    {cell.data}
                  </TableHead>
                ))}
              </TableRow>
            ))}
        </TableHeader>
        <TableBody>
          {tableState.rows
            .filter((row: Row) => !row.isHeading)
            .map((row: Row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell: Cell) => (
                  <TableCell
                    key={cell.id}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                  >
                    {!cell.isUpdateable ? (
                      cell.data
                    ) : (
                      <CellInput
                        value={cell.data}
                        rowId={row.id}
                        cellId={cell.id}
                        updateTableCell={updateTableCell}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <button
          className=" px-8 py-2 text-white bg-yellow-500 font-bold rounded-sm mr-5 mt-2"
          onClick={saveTable}
        >
          {isSavingTableData?<Loader2 className="animate-spin" />:'Save Table'}
        </button>
        {table.isDynamic && (
          <button
            className=" px-8 py-2 text-white bg-green-500 font-bold rounded-sm mr-5 mt-2"
            onClick={addRow}
          >
            Add Row
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(TableUI);
