import React, { useEffect, useState } from "react";

import { HomeOutlined } from "@ant-design/icons";
import { Card, ConfigProvider, List, Skeleton } from "antd";
import { usePost } from "../../hook/usePost";
import { usePosts } from "../../hook/usePosts";

const Post = ({ postId, setPostId }) => {
  const { status, data, error, isFetching } = usePost(postId);
  const allDatas = usePosts(postId).data;

  const [delayedStatus, setDelayedStatus] = useState("pending");

  const prevData = allDatas?.find((allData) => allData?.id === data?.id - 1);
  const nextData = allDatas?.find((allData) => allData?.id === data?.id + 1);

  const anotherData = [
    { ...prevData, dtitle: "이전글" },
    { ...nextData, dtitle: "다음글" },
  ];

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDelayedStatus(status);
    }, 500);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    console.log(postId);
    setDelayedStatus(status);
  }, [postId]);

  const onClickEvent = (item) => {
    if (!item || !item.id) return;
    setPostId(item.id);
    setDelayedStatus("pending");
  };

  const renderAnotherContent = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={anotherData}
        renderItem={(item, index) => (
          <List.Item onClick={() => onClickEvent(item)}>
            <List.Item.Meta title={<p>{item.dtitle}</p>} description={item.body ? item.body : "글이 없습니다."} />
          </List.Item>
        )}
      />
    );
  };

  const renderContent = () => {
    switch (delayedStatus) {
      case "pending":
        return (
          <div className="h-full">
            <Card
              title={<Skeleton title={false} paragraph={{ rows: 1, width: "70%" }} active />}
              className="border-4 text-2xl h-full"
            >
              <Skeleton title={false} paragraph={{ rows: 1, width: "70%" }} active />
            </Card>
          </div>
        );
      case "error":
        return `에러 코드 ${error}`;
      case "success":
        return (
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
                {renderAnotherContent()}
              </Card>
            </ConfigProvider>
          </div>
        );
      default:
        break;
    }
  };

  return renderContent();
};

export default Post;
