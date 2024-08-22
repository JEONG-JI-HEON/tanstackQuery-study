import React, { useState } from "react";
import { usePost } from "../../hook/usePost";

const Post = ({ postId, setPostId }) => {
  const { status, data, error, isFetching } = usePost(postId);

  let mainContent;
  switch (status) {
    case "pending":
      mainContent = "로딩중....";
      break;
    case "error":
      mainContent = `에러 코드 ${error}`;
      break;
    case "success":
      mainContent = (
        <>
          <h1 className="font-bold text-4xl pb-10">{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <div>
      <div className="cursor-pointer" onClick={() => setPostId(-1)}>
        뒤로가기
      </div>
      {mainContent}
    </div>
  );
};

export default Post;
