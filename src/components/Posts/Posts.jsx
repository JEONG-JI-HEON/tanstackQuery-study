import React, { useEffect, useState } from "react";
import { usePosts } from "../../hook/usePosts";
import { useQueryClient } from "@tanstack/react-query";

import { Avatar, List, Skeleton } from "antd";

const Posts = ({ setPostId }) => {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  console.log(data);

  const postTitle = () => {
    let title;
    switch (status) {
      case "pending":
        title = (
          <>
            <Skeleton active avatar>
              <List.Item.Meta />
            </Skeleton>
            <Skeleton active avatar>
              <List.Item.Meta />
            </Skeleton>
            <Skeleton active avatar>
              <List.Item.Meta />
            </Skeleton>
            <Skeleton active avatar>
              <List.Item.Meta />
            </Skeleton>
            <Skeleton active avatar>
              <List.Item.Meta />
            </Skeleton>
          </>
        );
        break;
      case "error":
        title = <span>Error: {error.message}</span>;
        break;
      case "success":
        title = (
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
