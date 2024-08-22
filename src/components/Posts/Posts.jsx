import React, { useState } from "react";
import { usePosts } from "../../hook/usePosts";
import { useQueryClient } from "@tanstack/react-query";

import { Avatar, List } from "antd";

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
          // <div>
          //   {data.map((post) => (
          //     <div key={post.id} className="cursor-pointer mb-3" onClick={() => setPostId(post.id)}>
          //       <p
          //         style={
          //           queryClient.getQueryData(["post", post.id])
          //             ? {
          //                 fontWeight: "bold",
          //                 color: "red",
          //               }
          //             : {}
          //         }
          //       >
          //         {post.title}
          //       </p>
          //     </div>
          //   ))}
          // </div>
          <>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item className="cursor-pointer" onClick={() => setPostId(item.id)}>
                  <List.Item.Meta
                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                    title={
                      <p
                        style={
                          queryClient.getQueryData(["post", item.id])
                            ? {
                                fontWeight: "bold",
                                color: "red",
                              }
                            : {}
                        }
                      >
                        {item.title}
                      </p>
                    }
                    description={item.body}
                  />
                </List.Item>
              )}
            />
          </>
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
