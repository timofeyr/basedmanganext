'use server'

import { createClient } from "@/utils/supabase/server";
import { supabase } from "../../../api";
import { redirect } from 'next/navigation';

export async function getChapters(param: any) {
    const name = param;
    const { data: chapters, error } = await supabase.storage
      .from("basedmanga")
      .list("manga/" + name.mangaName);

    if (!chapters?.length) {
    redirect("/404");
    }

    return chapters;
}

export async function addBookmark(formData: FormData) {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();
    const text = formData.get('manga_name') as string;

    if ((await supabase.from("bookmarks").select("manga_name").match({manga_name: text, user_uuid: user.user?.id})).data?.length) {
        console.log("exists");
    } else {
        const { data: error } = await supabase.from("bookmarks").insert({user_uuid: user.user?.id, manga_name: text});
        if (error) {
            redirect('/error');
        }
    }
}
