// // pages/api/[...nextjs-api].ts

// import { NextApiRequest, NextApiResponse } from "next";
// import { createClient } from "@/utils/supabase/server";

// const supabase = createClient();


// // Create a new conversation
// export async function createConversation(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { user1Id, user2Id } = req.body;
//   const { data, error } = await supabase
//     .from("conversations")
//     .insert({ user1_id: user1Id, user2_id: user2Id, created_at: new Date() });
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   return res.status(201).json(data);
// }

// // Get all conversations for a user
// export async function getConversations(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { userId } = req.query;
//   const { data, error } = await supabase
//     .from("conversations")
//     .select("conversation_id, user1_id, user2_id, created_at")
//     .or(`user1_id.eq.${userId}, user2_id.eq.${userId}`);
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   return res.status(200).json(data);
// }

// // Create a new message
// export async function createMessage(req: NextApiRequest, res: NextApiResponse) {
//   const { conversationId, senderId, content } = req.body;
//   const { data, error } = await supabase.from("messages").insert({
//     conversation_id: conversationId,
//     sender_id: senderId,
//     content,
//     created_at: new Date(),
//   });
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   return res.status(201).json(data);
// }

// // Get all messages for a conversation
// export async function getMessages(req: NextApiRequest, res: NextApiResponse) {
//   const { conversationId } = req.query;
//   const { data, error } = await supabase
//     .from("messages")
//     .select("message_id, conversation_id, sender_id, content, created_at")
//     .eq("conversation_id", conversationId);
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   return res.status(200).json(data);
// }

// // Create a new user
// export async function createUser(req: NextApiRequest, res: NextApiResponse) {
//   const { username } = req.body;
//   const { data, error } = await supabase
//     .from("users")
//     .insert({ username, created_at: new Date() });
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   return res.status(201).json(data);
// }

// // Get a user by username
// export async function getUserByUsername(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { username } = req.query;
//   const { data, error } = await supabase
//     .from("users")
//     .select("user_uuid, username")
//     .eq("username", username);
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   return res.status(200).json(data);
// }
