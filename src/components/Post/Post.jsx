import React, { useState } from "react";
import { usePost } from "../../hook/usePost";
import { HomeOutlined } from "@ant-design/icons";
import { Card, ConfigProvider } from "antd";

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
        <div className="h-full">
          <ConfigProvider
            theme={{
              components: {
                Card: {
                  headerFontSize: 36,
                  headerHeight: 80,
                },
              },
            }}
          >
            <Card
              title={data.title}
              className="border-4 text-2xl h-full"
              extra={<HomeOutlined className="text-2xl text-emerald-400" onClick={() => setPostId(-1)} />}
            >
              <p>{data.body}</p>
            </Card>
          </ConfigProvider>

          {/* <h1 className="font-bold text-4xl pb-10">{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div> */}
        </div>
      );
      break;
    default:
      break;
  }

  return <div className="h-full">{mainContent}</div>;
};

export default Post;
