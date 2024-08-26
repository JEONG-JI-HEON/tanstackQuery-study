import React, { useEffect, useState } from "react";
import { usePosts } from "../../hook/usePosts";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, List, Pagination, Skeleton } from "antd";
import SkeletonNode from "antd/es/skeleton/Node";

const Posts = ({ setPostId }) => {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  const [delayedStatus, setDelayedStatus] = useState("pending");

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDelayedStatus(status);
    }, 500);
    return () => clearTimeout(timer);
  }, [status]);

  const renderContent = () => {
    switch (delayedStatus) {
      case "pending":
        return (
          <>
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
            <Skeleton className="mb-5" title={false} paragraph={{ rows: 2, width: ["70%", "70%"] }} active avatar />
          </>
        );
      case "error":
        return <span>Error: {error.message}</span>;
      case "success":
        return (
          <>
            <List
              itemLayout="horizontal"
              dataSource={data}
              pagination={{
                onChange: (page, pageSize) => {},
                align: "center",
                pageSize: 10,
                total: data.length,
                showSizeChanger: false,
              }}
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
      default:
        return null;
    }
  };

  return renderContent();
};

export default Posts;
