import React, { useEffect } from "react";

import fetchWithAxios from "./utils/fetchWithAxios";
import parseWithZod from "./utils/parseWithZod";
import { IConversation, ConversationSchema } from "./utils/interfaces";
import useAppState from "./stores/useAppStore";

import ChatComponent from "./components/Chat";
import SidePanel from "./components/SidePanel";
import ErrorComponent from "./components/ErrorComponent";

const Index: React.FC = () => {
  const user = useAppState((state) => state.user);
  
  const setConversations = useAppState((state) => state.setConversations);

  const isSidePanelOpen = useAppState((state) => state.isSidePanelOpen);
  const setisSidePanelOpen = useAppState((state) => state.setisSidePanelOpen);

  const setError = useAppState((state) => state.setError);

  //Set the sidepanel to be closed by default if the user is on a small screen
  useEffect(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 1024) {
      setisSidePanelOpen(false);
    }
  }, []);

  // Fetch past conversations from database if a user is logged in
  useEffect(() => {
    const getAndStoreConversations = async () => {
      if (user) {
        const conversations = await fetchWithAxios(`${import.meta.env.VITE_API_URL}/conversations?userId=${user.id}`, 'GET');

        // Make sure all of the conversations are compliant with the schema
        conversations.forEach((conversation: IConversation) => parseWithZod(conversation, ConversationSchema));

        setConversations(conversations)
      }
    }

    getAndStoreConversations()
  }, [user]);

  useEffect(() => {
    setError(null);
  }, [])

  return (
    <div className="flex h-full bg-opacity-80 bg-gray-100">
      <div className="flex h-full w-full">
        <div>
          <div className={`drawer ${isSidePanelOpen ? "drawer-open" : ""} h-full`}>
            <SidePanel />
          </div>
        </div>
        {/* Content for the main container */}
        <div className={`w-full h-full`}>
          <ErrorComponent />
          <ChatComponent />
        </div>
      </div>
    </div>
  );
};

export default Index;