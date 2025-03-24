import { Comment } from "@/models/models";
import { Clock, Mail } from "lucide-react";
import TimeAgo from "react-timeago";

const ViewComments = ({ comments }: {comments: Comment[] }) => {

  return (
    <div className=" h-full flex flex-col justify-between w-full">
      <ul className="mt-4 flex flex-col gap-4 overflow-y-auto flex-grow">
        {comments.map((comment: Comment) => (
          <li key={comment.id}>
            <div className="p-4 rounded-md hover:bg-lime-50 hover:shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className=" font-semibold capitalize">
                    {comment.user?.name}
                  </span>
                  <span className="text-xs text-gray-500 flex gap-1 items-center">
                    <Mail size={13} />
                    {comment.user?.email}
                  </span>
                </div>
                <span className="text-xs text-gray-500 flex gap-1 items-center">
                  <Clock size={13} />
                  over
                  {comment.createdAt && (
                    <TimeAgo date={comment.createdAt.toString()} />
                  )}
                </span>
              </div>
              <p className="mt-2 text-sm">{comment.data}</p>
            </div>
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default ViewComments;



