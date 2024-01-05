import React from "react";
import * as fs from "fs";
import Link from "next/link";

const page = ({ searchParams }: any) => {
  const mangaName = searchParams.manga;
  const mangaFolderPath = "./public/manga/" + mangaName;
  const chapterCollection = fs.readdirSync(mangaFolderPath);
  const mangaChapterArr = {
    mangaName,
    chapterCollection,
  };

  return (
    <>
      {mangaChapterArr.chapterCollection.map((c) => {
        return (
          <Link
            href={{
              pathname: "/reader",
              query: {
                manga: mangaChapterArr.mangaName,
                chapter: c,
              },
            }}
          >
            {c}
            <br />
          </Link>
        );
      })}
    </>
  );
};

export default page;
