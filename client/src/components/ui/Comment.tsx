import React, { useState } from 'react';
import { MessageSquareText, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CommentSectionProps {
  comments: string[];
  updateComments: (comments: string[]) => void;
  commentCount: number
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, updateComments, commentCount }) => {
  console.log("========>", commentCount)
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      updateComments([...comments, newComment.trim()]);
      setNewComment('');
      setIsAddingComment(false);
    }
  };

  const handleDeleteComment = (index: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    updateComments(updatedComments);
  };

  return (
    <div className="">
      {comments.length > 0 && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 font-medium mb-2">Comments:</p>
          <div className="space-y-2">
            {comments.map((comment, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-3 rounded-md border border-gray-200 flex justify-between items-start"
              >
                <p className="text-sm text-gray-800">{comment}</p>
                <button 
                  onClick={() => handleDeleteComment(index)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {isAddingComment ? (
        <div className="mt-2 space-y-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
            rows={1}
          />
          <div className="flex space-x-2">
            <Button 
              onClick={handleAddComment}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 h-auto"
            >
              Save
            </Button>
            <Button 
              onClick={() => {
                setIsAddingComment(false);
                setNewComment('');
              }}
              variant="outline"
              className="text-sm py-1 px-3 h-auto"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingComment(true)}
          className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition-colors text-sm font-medium"
        >
          <MessageSquareText size={18} />
          <span className='text-base'>{commentCount}</span>
        </button>
      )}
    </div>
  );
};

export default CommentSection;