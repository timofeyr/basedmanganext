import React from "react";
import Link from "next/link";
import { supabase } from "../../../api";

const page = async ({ searchParams }: any) => {
  const name = searchParams;

  const { data: chapters, error } = await supabase.storage
    .from("basedmanga")
    .list("manga/" + name.mangaName);

  // if (!chapters) return <h1>Error 404</h1>;  TODO: Add 404 stuff

  return (
    <>
      {chapters?.map((c) => {
        return (
          <Link
            href={{
              pathname: "/reader",
              query: {
                mangaName: name.mangaName,
                chapter: c.name,
              },
            }}
          >
            {c.name}
            <br />
          </Link>
        );
      })}
    </>
  );
};

export default page;
