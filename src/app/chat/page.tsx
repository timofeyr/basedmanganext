"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const supabase = createClient();

const IndexPage = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select(
          "conversation_id, user1_id, users!conversations_user2_id_fkey (username), created_at"
        );
      console.log(data);
      if (error) {
        console.error(error);
      } else {
        setConversations(data);
      }
    };
    fetchConversations();
  }, []);

  const handleSelectConversation = async (conversationId: number) => {
    setSelectedConversation(conversationId);
    const { data, error } = await supabase
      .from("messages")
      .select(
        "message_id, conversation_id, users!messages_sender_id_fkey (username), content, created_at"
      )
      .eq("conversation_id", conversationId);
    if (error) {
      console.error(error);
    } else {
      setMessages(data);
    }
  };

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const usr = await supabase.auth.getUser();
      if (!selectedConversation) return;

      const currentMessage = newMessage; // Create a new variable to hold the current value

      try {
        const { data, error } = await supabase
          .from("messages")
          .insert({
            conversation_id: selectedConversation,
            sender_id: usr.data.user?.id,
            content: currentMessage,
          })
          .select("*")
          .single();

        if (error) {
          console.error(error);
        } else {
          setMessages([...messages, data]);
          setNewMessage(""); // Reset newMessage to an empty string
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [messages, setMessages, setNewMessage, selectedConversation, newMessage] // Add newMessage to the dependencies
  );

  return (
    <div className="flex h-screen">
      {/* Conversation List */}
      <Card className="w-1/4 h-full border-r border-gray-200">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 overflow-y-auto">
          {conversations.map((conversation) => (
            <Button
              key={conversation.conversation_id}
              variant={
                selectedConversation === conversation.conversation_id
                  ? "default"
                  : "ghost"
              }
              onClick={() =>
                handleSelectConversation(conversation.conversation_id)
              }
            >
              Conversation with {conversation.users.username}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Message Area */}
      <Card className="w-3/4 h-full">
        {selectedConversation && (
          <>
            <CardHeader>
              <CardTitle>Conversation {selectedConversation}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col-reverse gap-4 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.message_id} className="flex flex-col gap-2">
                  <span className="text-sm text-gray-500">
                    {message.users.username}:
                  </span>
                  <p>{message.content}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSendMessage} className="flex gap-2 w-full">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(event) => setNewMessage(event.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">Send</Button>
              </form>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default IndexPage;
