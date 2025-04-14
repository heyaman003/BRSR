import { useFetch } from "@/hooks/use-fetch";
import { History } from "@/models/models";
import { plainToInstance } from "class-transformer";
import { Clock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";

const ViewHistory = ({ questionId }: { questionId: string }) => {
  const customFetch = useFetch();

  const [histories, setHistories] = useState<History[]>([]);

  const fetchHistory = async (questionId: string) => {
    const res = await customFetch(`/section/${questionId}/history`, {
      method: "GET",
    });
    return res.data;
  };

  useEffect(() => {
    if (questionId)
      fetchHistory(questionId).then((history) =>
        setHistories(plainToInstance(History, history) as History[])
      );
  }, [questionId]);

  return (
    <ul>
      {histories.map((history) => (
        <div className="p-4 rounded-md hover:bg-lime-50 hover:shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className=" font-semibold capitalize">
                {history.user?.name}
              </span>
              <span className="text-xs text-gray-500 flex gap-1 items-center">
                <Mail size={13} />
                {history.user?.email}
              </span>
            </div>
            <span className="text-xs text-gray-500 flex gap-1 items-center">
              <Clock size={13} />
              over
              {history.createdAt && (
                <TimeAgo date={history.createdAt.toString()} />
              )}
            </span>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default ViewHistory;
