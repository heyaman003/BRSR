import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Cell, Row, Table as TableType } from "@/types";
import CellInput from "./cell.input";
import { memo, useCallback, useEffect, useState } from "react";
import * as BSON from "bson";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
const generateId = () => new BSON.ObjectId().toString();

const TableUI = ({
  table,
  updateTableData,
  getTableData
}: {
  table: TableType;
  updateTableData: (updatedTableData: TableType) => void;
  getTableData: (questionIndex: number, tableIndex: number) => TableType | null
}) => {
  const [tableState, setTableState] = useState<TableType>(table);
  const [isSavingTableData, setIsSavingTableData] = useState<boolean>(false);

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
            (_, ind: number) => new Cell(generateId(), "", true, 1, 1, ind)
          ),
          false,
          tableState.rows.length
        ),
      ];
      return { ...table };
    });
  };
  const deleteRow = (id: string) => {
    setTableState((table: TableType) => {
      table.rows = table?.rows.filter((row) => row.id != id);
      return { ...table };
    });
  };

  const saveTable = async () => {
    try {
      setIsSavingTableData(true);
      const raw = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/section/table/${table.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
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
    <div className="mb-1 py-3 rounded-md">
      <Table>
        <TableHeader className="bg-green-20">
          {tableState.rows
            .filter((row: Row) => row.isHeading)
            .sort((a: Row, b: Row) => a.index - b.index)
            .map((row: Row) => (
              <TableRow key={row.id} className=" border-green-300">
                {row.cells
                  .sort((a, b) => a.index - b.index).map((cell: Cell) => (
                  <TableHead
                    key={cell.id}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    className="text-center text-green-700 bg-green-50 hover:bg-green-100 p-2"
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
            .sort((a: Row, b: Row) => a.index - b.index)
            .map((row: Row) => (
              <TableRow key={row.id} className=" hover:bg-white border-green-30 bg-blue-50">
                {row.cells
                  .sort((a, b) => a.index - b.index)
                  .map((cell: Cell) => (
                    <TableCell
                      key={cell.id}
                      colSpan={cell.colSpan}
                      rowSpan={cell.rowSpan}
                      className="py-3"
                    >
                      {!cell.isUpdateable ? (
                        cell.data
                      ) : (
                        <CellInput
                          getTableData={getTableData}
                          value={cell.data}
                          rowId={row.id}
                          cellId={cell.id}
                          updateTableCell={updateTableCell}
                          tableState={tableState}
                          operation={cell.operation}
                          operands = {cell.operands}
                        />
                      )}
                    </TableCell>
                  ))}
                {table.isDynamic && (
                    <button onClick={()=>deleteRow(row.id)} className="mt-1 bg-transparent hover:bg-transparent hover:text-red-500 p-2 rounded-full duration-0 text-red-300">
                      <Trash2 className="duration-0" size={20}/>
                    </button>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <button
          className=" px-8 py-2 text-white bg-yellow-500 font-bold rounded-sm mr-5 mt-2"
          onClick={saveTable}
        >
          {isSavingTableData ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Save Table"
          )}
        </button>
        {table.isDynamic && (
          <div>
            <button
              className=" px-8 py-2 text-white bg-green-500 font-bold rounded-sm mr-5 mt-2"
              onClick={addRow}
            >
              Add Row
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TableUI);
