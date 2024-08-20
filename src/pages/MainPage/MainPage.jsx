import React, { useState } from "react";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { getQueryClient } from "../../queryClient";

const MainPage = () => {
  const queryClient = getQueryClient();

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  const [postId, setPostId] = useState(-1);

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <div>hello, world</div>
    </PersistQueryClientProvider>
  );
};

export default MainPage;
