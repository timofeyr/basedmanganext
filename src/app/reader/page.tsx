import Image from "next/image";
import React from "react";
import { supabase } from "../../../api";

const page = async ({ searchParams }: any) => {
  const chapterPath =
    "manga/" + searchParams.mangaName + "/" + searchParams.chapter + "/";

  const { data, error } = await supabase.storage
    .from("basedmanga")
    .list(chapterPath);

  const names = data?.map((obj) =>
    supabase.storage.from("basedmanga").getPublicUrl(chapterPath + obj.name)
  );

  return (
    <>
      {names?.map((img) => {
        return (
          <div className="m-auto">
            <Image
              className="mx-auto"
              src={img.data.publicUrl}
              width={1000}
              height={100}
              alt={searchParams.chapter}
              objectFit="cover"
            />
          </div>
        );
      })}
    </>
  );
};

export default page;
