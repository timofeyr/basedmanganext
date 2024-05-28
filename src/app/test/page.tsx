"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const IndexPage = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("conversation_id, user1_id, user2_id, created_at");
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
      .select("message_id, conversation_id, sender_id, content, created_at")
      .eq("conversation_id", conversationId);
    if (error) {
      console.error(error);
    } else {
      setMessages(data);
    }
  };

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
        </div>
      )}
    </div>
  );
};

export default IndexPage;
