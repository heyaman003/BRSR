import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Textarea } from "../ui/textarea";

const GovernanceTable = () => {
  return (
    <Table className="mb-10">
      <TableHeader>
        <TableRow>
          <TableHead colSpan={7} className="font-bold text-green-500">
            Policy and management processes
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2}>
            Statement by director responsible for the business responsibility
            report, highlighting ESG related challenges, targets and
            achievements (listed entity has flexibility regarding the placement
            of this disclosure)
          </TableCell>
        </TableRow>
        <TableRow className="flex flex-row">
          <TableCell className="w-1/2">
            Details of the highest authority responsible for implementation and
            oversight of the Business Responsibility policy (ies).
          </TableCell>
          <TableCell className="flex-grow">
            <Textarea
              rows={3}
              className=" resize-none border border-green-300 bg-green-50 text-green-900 px-2 py-1 w-full 
                              focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-green-100 
                              rounded-md transition-all"
            />
          </TableCell>
        </TableRow>
        <TableRow className="flex flex-row">
          <TableCell className="w-1/2">
            Does the entity have a specified Committee of the Board/ Director
            responsible for decision making on sustainability related issues?
            (Yes / No). If yes, provide details.
          </TableCell>
          <TableCell className="flex-grow">
            <Textarea
              rows={3}
              className=" resize-none border border-green-300 bg-green-50 text-green-900 px-2 py-1 w-full 
                              focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-green-100 
                              rounded-md transition-all"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default GovernanceTable;
