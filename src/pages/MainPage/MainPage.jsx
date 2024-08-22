import React, { useState } from "react";

import styles from "./mainPage.module.scss";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { getQueryClient } from "../../queryClient";
import Post from "../../components/Post/Post";
import Posts from "../../components/Posts/Posts";

const MainPage = () => {
  const queryClient = getQueryClient();

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  const [postId, setPostId] = useState(-1);

  return (
    <div className={styles["main"]}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <h2 className={styles["list-header"]}>리스트</h2>
        <div className={styles["list-cover"]}>
          {postId > -1 ? <Post postId={postId} setPostId={setPostId} /> : <Posts setPostId={setPostId} />}
        </div>
      </PersistQueryClientProvider>
    </div>
  );
};

export default MainPage;
