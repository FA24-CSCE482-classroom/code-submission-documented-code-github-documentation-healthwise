import React, { useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

import useAppStore from "../../stores/useAppStore";
import { postConversation, postResponse } from "../../utils/dbFunctions";
import { APIResponseSchema, IAPIResponse } from "../../utils/interfaces";

import { TfiMenuAlt } from "react-icons/tfi";

import OllieAvatar from "./OllieAvatar";
import ChatBubble from "./ChatBubble";
import ApiResponse from "./ApiResponse";

const ChatComponent: React.FC = () => {
  // Use Zustand to manage app state such as the questions the user asks and the response from the api
  // https://github.com/pmndrs/zustand
  const apiResponses = useAppStore((state) => state.apiResponses);
  const setApiResponses = useAppStore((state) => state.setApiResponses);

  // Update the currentConversation object inside the app store whenever the user asks a question and gets a response
  const addQueryToConversation = useAppStore((state) => state.addQueryToConversation);
  const currentConversationId = useAppStore((state) => state.currentConversationId);
  const setCurrentConversationId = useAppStore((state) => state.setCurrentConversationId);

  const user = useAppStore((state) => state.user);

  const isSidePanelOpen = useAppStore((state) => state.isSidePanelOpen);
  const setisSidePanelOpen = useAppStore((state) => state.setisSidePanelOpen);

  // Using react-hook-form to manage the state of the input field
  // https://www.react-hook-form.com/
  const { register, handleSubmit, reset, getValues, setValue } = useForm();

  // Creates the auto scroll when the api responds
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the container with smooth animation
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  });

  // Call the backend with the user entered query to get a response
  // https://tanstack.com/query/v4/docs/react/guides/mutations
  const { mutate: getResponse, isLoading } = useMutation(async (data: any) => {
    if (data.query === "") return

    const conversationId = currentConversationId ?? uuid()
    setCurrentConversationId(conversationId)

    const formData = new FormData();
    formData.append("data", data.query);

    const response: IAPIResponse = ((await axios.post(`${import.meta.env.VITE_API_URL}/formattedresults`, formData, { headers: { "Content-Type": "multipart/form-data" } })).data)

    // Parse the response and make sure it complies with the expected API Response
    APIResponseSchema.parse(response);

    return response
  }, {
    onSuccess: async (response: IAPIResponse | undefined) => {
      if (response) {
        setApiResponses([...apiResponses, response]);

        // If a user is logged in, save their conversation
        if (user) {
          await postConversation(currentConversationId!, response.userQuery, user.id)
          await postResponse(response, currentConversationId!)
        }

        addQueryToConversation(currentConversationId!, response)

        reset();
      }
    }
  });

  const regenerateResponse = () => {
    const previousQuery = apiResponses[apiResponses.length - 1].userQuery;

    setValue("query", previousQuery);
    getResponse({ query: previousQuery });
  }

  return (
    <div className="flex w-full flex-col h-full">
      {!isSidePanelOpen && (
        <button className="drawer-content absolute btn w-12 m-3 btn-primary btn-outline border-primary bg-white z-10" onClick={() => setisSidePanelOpen(!isSidePanelOpen)}>
          <TfiMenuAlt className="text-lg" />
        </button>
      )}

      <div className="h-full p-4 flex flex-col justify-end overflow-hidden">
        <div ref={containerRef} className="overflow-y-auto max-h-[calc(100vh-14rem)] ">

          { /* Initial greeting */}
          <div className="xl:flex gap-4">
            <OllieAvatar />
            <ChatBubble isResponse={true}>
              <p>Hi! I’m Ollie, your virtual assistant for the OliviaHealth network. How can I help you?</p>
            </ChatBubble>
          </div>

          { /* Api response to user query */}
          {apiResponses.map((response, index) => {
            return (
              <div key={`${index} - question`}>
                <ChatBubble isResponse={false}>
                  {response.userQuery}
                </ChatBubble>

                <ApiResponse apiResponse={response} regenerateResponse={regenerateResponse} />
              </div>
            );
          })}

          { /* Render loading dots while fetching api response */}
          {isLoading ? (<>
            <ChatBubble isResponse={false}>
              <p>{getValues("query")}</p>
            </ChatBubble>

            <div className="flex gap-4">
              <OllieAvatar />
              <ChatBubble isResponse={true}>
                <span className="loading loading-dots loading-md"></span>
              </ChatBubble>
            </div>
          </>) : ""}

        </div>
      </div>

      { /* input field with the submit button */}
      <form className="form-control shadow-2xl" onSubmit={handleSubmit((data) => getResponse(data))}>
        <div className="input-group">
          <input placeholder="Ask me a question" className="input w-full py-6 bg-white focus:outline-none" {...register("query")} style={{ "borderRadius": 0 }} />
          <button className="btn btn-square h-full bg-white border-none hover:bg-primary active:bg-primary-focus" style={{ "borderRadius": 0 }}>
            <p>
              <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Subtract" d="M0.655396 34L31.263 17L0.655396 0L4.89595 13.1308L21.2664 17L4.89595 21.2815L0.655396 34Z" fill="lightGrey" />
              </svg>
            </p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
