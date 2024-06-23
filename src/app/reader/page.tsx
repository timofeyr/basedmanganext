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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {searchParams.mangaName} - Chapter {searchParams.chapter}
      </h1>
      <div className="flex flex-col gap-4">
        {names?.map((img, index) => (
          <div key={index} className="w-full">
            <Image
              className="mx-auto"
              src={img.data.publicUrl}
              width={1000}
              height={1000} // Adjust height as needed or remove for automatic aspect ratio
              alt={`${searchParams.chapter} - Page ${index + 1}`}
              objectFit="contain" // Use "contain" to fit image within container without cropping
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
