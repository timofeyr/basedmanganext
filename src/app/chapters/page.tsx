import React from "react";
import Link from "next/link";
// import { supabase } from "../../../api";
import { addBookmark, getChapters } from "./actions";
import { redirect } from "next/navigation";

const page = async ({ searchParams }: any) => {
  const chapters = await getChapters(searchParams);

  return (
    <>
      {chapters?.map((c) => {
        return (
          <Link
            href={{
              pathname: "/reader",
              query: {
                mangaName: searchParams.mangaName,
                chapter: c.name,
              },
            }}
          >
            {c.name}
            <br />
          </Link>
        );
      })}
      <form action={addBookmark}>
        <input type="hidden" name="manga_name" value={searchParams.mangaName} />
        <button type="submit">Add to bookmarks</button>
      </form>
    </>
  );
};

export default page;
