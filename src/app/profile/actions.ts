'use server'

import { createClient } from "@/utils/supabase/server";

export async function getProfilePicture() {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    // console.log(user.user?.id);
    const { data: profile_pic, error } = await supabase.from("users").select("profile_picture").eq("user_uuid", user.user?.id);
    return profile_pic?.[0].profile_picture;
}

export async function getBookmarks() {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    const { data: bookmarks } = await supabase.from("bookmarks").select("manga_name").match({user_uuid: user.user?.id});
    return bookmarks;
}

export async function logOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    console.log(error);
}

export async function checkAuth() {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    return Boolean(user.user);
}