import React, { useEffect, useState } from "react";
import { usePost } from "../../hook/usePost";
import { HomeOutlined } from "@ant-design/icons";
import { Card, ConfigProvider, Skeleton } from "antd";

const Post = ({ postId, setPostId }) => {
  const { status, data, error, isFetching } = usePost(postId);

  const [delayedStatus, setDelayedStatus] = useState("pending");

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDelayedStatus(status);
    }, 500);
    return () => clearTimeout(timer);
  }, [status]);

  // let mainContent;
  // switch (status) {
  //   case "pending":
  //     mainContent = "로딩중....";
  //     break;
  //   case "error":
  //     mainContent = `에러 코드 ${error}`;
  //     break;
  //   case "success":
  //     mainContent = (
  //       <div className="h-full">
  //         <ConfigProvider
  //           theme={{
  //             components: {
  //               Card: {
  //                 headerFontSize: 36,
  //                 headerHeight: 80,
  //               },
  //             },
  //           }}
  //         >
  //           <Card
  //             title={data.title}
  //             className="border-4 text-2xl h-full"
  //             extra={<HomeOutlined className="text-2xl text-emerald-400" onClick={() => setPostId(-1)} />}
  //           >
  //             <p>{data.body}</p>
  //           </Card>
  //         </ConfigProvider>
  //       </div>
  //     );
  //     break;
  //   default:
  //     break;
  // }

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
