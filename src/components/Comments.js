import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentIds, setCommentIds] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    if (state?.comments) {
      setCommentIds(state.comments);
    }
  }, [state]);

  useEffect(() => {
    const fetchComments = async () => {
      if (commentIds.length === 0) return;

      try {
        const commentData = await Promise.all(
          commentIds.map(async (id) => {
            try {
              const response = await axios.get(
                `https://hn.algolia.com/api/v1/items/${id}`
              );
              return response.data;
            } catch (error) {
              if (error.response && error.response.status === 404) {
                return null;
              } else {
                throw error;
              }
            }
          })
        );
        setComments(commentData.filter((comment) => comment !== null));
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [commentIds]);

  return (
    <div className="bg-orange-50 w-full">
      <div className=" p-2">
        <h2 className="font-bold text-2xl">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="m-4">
              <p className="">
                <span className="">{"-> "}</span>
                <strong className="">{comment.author}</strong>:
              </p>
              <p className="ml-8">{comment.text}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
