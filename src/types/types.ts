// types.ts
export type Conversation = {
    conversation_id: number;
    user1_id: string;
    user2_id: string;
    created_at: string;
  };
  
  export type Message = {
    message_id: number;
    conversation_id: number;
    sender_id: string;
    content: string;
    created_at: string;
  };