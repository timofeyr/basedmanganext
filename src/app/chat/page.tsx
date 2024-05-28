"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";

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
        .select("conversation_id, user1_id, user2_id, created_at");
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
      .select("message_id, conversation_id, sender_id, content, created_at")
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
    <div>
      <h1>Conversations</h1>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.conversation_id}>
            <a
              href="#"
              onClick={() =>
                handleSelectConversation(conversation.conversation_id)
              }
            >
              Conversation with {conversation.user2_id}
            </a>
          </li>
        ))}
      </ul>
      {selectedConversation && (
        <div>
          <h2>Messages for conversation {selectedConversation}</h2>
          <ul>
            {messages.map((message) => (
              <li key={message.message_id}>
                <p>
                  {message.sender_id.username}: {message.content}
                </p>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
