import React from "react";

interface Props {
    children: React.ReactNode
    isResponse: boolean
    isFocused?: boolean
    isLocationResponse?: boolean
}

const ChatBubble: React.FC<Props> = ({ children, isResponse, isLocationResponse: isLocation, isFocused: focused }) => {
    return (
        <div className={`chat w-full ${isResponse ? "chat-start" : "chat-end"}`}>
            <div className={`flex rounded-box whitespace-pre-wrap ${ !isResponse ? "max-w-[80%]" : "" } ${isResponse ? focused ? "bg-[#F8F5F5] text-primary" : "bg-white" : "bg-primary text-white"}`}>
                <div className={`w-2 bg-${focused ? "primary" : "transparent"} rounded-l-lg`} hidden={!isLocation}>
                </div>

                <div className="w-full py-2 px-4">
                    { children }
                </div>
            </div>
        </div>
    )
};

export default ChatBubble;