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
import { memo, useState } from "react";
import * as BSON from "bson";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateTableData } from "@/features/activeSubsectionData/activeSubsectionSlice";
import ConflictResolutionDialog from "../conflict-resolution/conflict.resolution.dialog";
const generateId = () => new BSON.ObjectId().toString();

const TableUI = ({
  tableId,
  questionId,
  tableIndex,
  questionIndex,
}: {
  tableId: string;
  questionId: string;
  tableIndex: number;
  questionIndex: number;
}) => {
  const dispatch = useDispatch();
  const tableState: TableType = useSelector(
    (state: RootState) =>
      state.activeSubsection.data.questions
        .find((question) => question.id === questionId)
        ?.answer_table?.find((table) => table.id === tableId) as TableType
  );
  const [isSavingTableData, setIsSavingTableData] = useState<boolean>(false);
  const conflict = useSelector(
    (state: RootState) =>
      state.activeSubsection.data.questions?.[questionIndex]?.answer_table?.[
        tableIndex
      ]?.conflict
  );

  const addRow = () => {
    const cellCount = tableState.rows[tableState.rows.length - 1].cells.length;
    dispatch(
      updateTableData({
        questionId: questionId,
        tableData: {
          ...tableState,
          rows: [
            ...tableState.rows,
            new Row(
              generateId(),
              Array.from({ length: cellCount }).map(
                (_, ind: number) => new Cell(generateId(), "", true, 1, 1, ind)
              ),
              false,
              tableState.rows.length
            ),
          ],
        },
      })
    );
    //   table.rows = [
    //     ...table.rows,
    //     new Row(
    //       generateId(),
    //       Array.from({ length: cellCount }).map(
    //         (_, ind: number) => new Cell(generateId(), "", true, 1, 1, ind)
    //       ),
    //       false,
    //       tableState.rows.length
    //     ),
    //   ];
    //   return { ...table };
    // });
  };
  const deleteRow = (id: string) => {
    dispatch(
      updateTableData({
        questionId,
        tableData: {
          ...tableState,
          rows: tableState.rows.filter((row) => row.id !== id),
        },
      })
    );
  };

  const saveTable = async () => {
    try {
      setIsSavingTableData(true);
      const raw = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/section/table/${tableState.id}`,
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
                {row.cells.map((cell: Cell) => (
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
            .map((row: Row) => (
              <TableRow
                key={row.id}
                className=" hover:bg-white border-green-30 bg-blue-50"
              >
                {row.cells.map((cell: Cell) => (
                  <TableCell
                    key={cell.id}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    className={`py-3 ${
                      cell.isHeading && "bg-green-50 hover:bg-green-100"
                    }`}
                  >
                    {!cell.isUpdateable ? (
                      <span
                        className={`inline-block w-full h-full ${
                          cell.isHeading
                            ? "text-center font-semibold text-sm text-green-700"
                            : "text-left"
                        }`}
                      >
                        {cell.data}
                      </span>
                    ) : (
                      <CellInput
                        value={cell.data}
                        rowIndex={row.index}
                        cellIndex={cell.index}
                        operation={cell.operation}
                        operands={cell.operands}
                        tableIndex={tableIndex}
                        questionIndex={questionIndex}
                      />
                    )}
                  </TableCell>
                ))}
                {tableState.isDynamic && (
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="mt-1 bg-transparent hover:bg-transparent hover:text-red-500 p-2 rounded-full duration-0 text-red-300"
                  >
                    <Trash2 className="duration-0" size={20} />
                  </button>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        {conflict && (
          <ConflictResolutionDialog table={tableState}/>
        )}

        {
          <button
            disabled={conflict ? true : false}
            className=" px-8 py-2 text-white bg-yellow-500 font-bold rounded-sm mr-5 mt-2 disabled:bg-yellow-700 disabled:text-gray-200 disabled:cursor-not-allowed"
            onClick={saveTable}
          >
            {isSavingTableData ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Save Table"
            )}
          </button>
        }
        {tableState.isDynamic && (
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
