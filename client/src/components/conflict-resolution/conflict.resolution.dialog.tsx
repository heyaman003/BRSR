import { Table } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import ConflictResolutionTable from "./conflict.resolution.table";


interface Props {
  table: Table;
}

const ConflictResolutionDialog: React.FC<Props> = ({ table }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className=" px-8 py-2 text-white bg-red-500 font-bold rounded-sm mr-5 mt-2">
          Resolve Conflict
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[90vw] overflow-auto">
        <DialogHeader>
            <h2 className="text-xl font-semibold">Resolve Conflicts</h2>
        </DialogHeader>
        {/* <DialogDescription className="max-h-[90vh] w-[90vw] overflow-auto"> */}
            <ConflictResolutionTable table={table}/>
        {/* </DialogDescription> */}
      </DialogContent>
    </Dialog>
  );
};

export default ConflictResolutionDialog;
