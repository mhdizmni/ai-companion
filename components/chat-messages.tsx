"use client"

import { Companion } from "@prisma/client"
import { ChatMessage, ChatMessageProps } from "./chat-message";
import { ElementRef, useEffect, useRef } from "react";

interface ChatMessagesProps {
    companion: Companion;
    isLoading: boolean;
    messages: ChatMessageProps[];
}

export const ChatMessages = ({
    companion,
    isLoading,
    messages = []
}: ChatMessagesProps) => {
    const scroll = useRef<ElementRef<"div">>(null);

    useEffect(() => {
        scroll?.current?.scrollIntoView({
            behavior: "smooth",
        })
    }, [messages.length])

    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage
                content="hello"
                role="system"
                src={companion.src}
            />
            <ChatMessage
                content="hi"
                role="user"
            />
            {messages.map((message) => (
                <ChatMessage
                    key={message.content}
                    content={message.content}
                    role={message.role}
                    src={message.src}
                />
            ))}
            {isLoading && (
                <ChatMessage
                    src={companion.src}
                    role="system"
                    isLoading
                />
            )}
            <div ref={scroll} />
        </div>
    )
}