import React, { useState } from "react";
import { usePosts } from "../../hook/usePosts";
import { useQueryClient } from "@tanstack/react-query";

const Posts = ({ setPostId }) => {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  console.log(data);

  const postTitle = () => {
    let title;
    switch (status) {
      case "pending":
        title = "loading...";
        break;
      case "error":
        title = <span>Error: {error.message}</span>;
        break;
      case "success":
        title = (
          <div>
            {data.map((post) => (
              <p key={post.id}>
                <a
                  onClick={() => setPostId(post.id)}
                  href="#"
                  style={
                    queryClient.getQueryData(["post", post.id])
                      ? {
                          fontWeight: "bold",
                          color: "green",
                        }
                      : {}
                  }
                >
                  {post.title}
                </a>
              </p>
            ))}
          </div>
        );
        break;
      default:
        break;
    }
    return title;
  };

  return postTitle();
};

export default Posts;
