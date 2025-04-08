import { Cell, Row, Table as TableType } from "@/models/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DialogFooter } from "../ui/dialog";
import { useDispatch } from "react-redux";
import { acceptCurrentChange, acceptIncomingChange } from "@/features/activeSubsectionData/activeSubsectionSlice";

interface Props {
  table: TableType;
}
const ConflictResolutionTable: React.FC<Props> = ({ table }) => {
  const dispatch = useDispatch();

  return (
    <>
      <h3 className="text-red-500 font-semibold text-lg text-center mt-4">
        Current Changes
      </h3>
      <Table>
        <TableHeader>
          {table.rows
            .filter((row: Row) => row.isHeading)
            .sort((a: Row, b: Row) => a.index - b.index)
            .map((row: Row) => (
              <TableRow key={row.id} className=" border-red-300">
                {row.cells.map((cell: Cell) => (
                  <TableHead
                    key={cell.id}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    className="text-center text-red-700 bg-red-100 hover:bg-red-200 p-2"
                  >
                    {cell.data}
                  </TableHead>
                ))}
              </TableRow>
            ))}
        </TableHeader>
        <TableBody>
          {table.rows
            .filter((row: Row) => !row.isHeading)
            .map((row: Row) => (
              <TableRow
                key={row.id}
                className=" hover:bg-red-100 border-green-30 bg-red-50"
              >
                {row.cells.map((cell: Cell) => (
                  <TableCell
                    key={cell.id}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    className={`py-3 text-gray-600 ${
                      cell.isHeading && "bg-red-50 hover:bg-red-100"
                    }`}
                  >
                    {!cell.isUpdateable ? (
                      <span
                        className={`inline-block w-full h-full ${
                          cell.isHeading
                            ? "text-center font-semibold text-sm text-red-700"
                            : "text-left"
                        }`}
                      >
                        {cell.data}
                      </span>
                    ) : (
                      cell.data
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <h3 className="text-green-600 font-semibold text-lg text-center mt-4">
        Incoming Changes
      </h3>
      {table.conflict && (
        <Table>
          <TableHeader className="bg-green-20">
            {table.conflict
              .filter((row: Row) => row.isHeading)
              .map((row: Row) => (
                <TableRow key={row.id} className=" border-green-300">
                  {row.cells.map((cell: Cell) => (
                    <TableHead
                      key={cell.id}
                      colSpan={cell.colSpan}
                      rowSpan={cell.rowSpan}
                      className="text-center text-green-700 bg-green-100 hover:bg-green-200 p-2"
                    >
                      {cell.data}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
          </TableHeader>
          <TableBody>
            {table.conflict
              .filter((row: Row) => !row.isHeading)
              .map((row: Row) => (
                <TableRow
                  key={row.id}
                  className=" hover:bg-green-100 border-green-30 bg-green-50"
                >
                  {row.cells.map((cell: Cell) => (
                    <TableCell
                      key={cell.id}
                      colSpan={cell.colSpan}
                      rowSpan={cell.rowSpan}
                      className={`py-3 text-gray-600 ${
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
                        cell.data
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}

      <DialogFooter>
        <button
          className=" px-8 py-2 text-white bg-red-500 font-bold rounded-sm mr-5 mt-2"
          onClick={()=>dispatch(acceptCurrentChange({tableId: table.id}))}
        >
          Accept Current Change
        </button>
        <button
          className=" px-8 py-2 text-white bg-green-500 font-bold rounded-sm mr-5 mt-2"
          onClick={()=>{dispatch(acceptIncomingChange({tableId: table.id}))}}
        >
          Accept Incoming Change
        </button>
      </DialogFooter>
    </>
  );
};

export default ConflictResolutionTable;
