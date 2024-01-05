import React from "react";
import * as fs from "fs";
import Link from "next/link";

const mangaFolderPath = "./public/manga/";
const mangaCollection = fs.readdirSync(mangaFolderPath);

const page = () => {
  return (
    <>
      {mangaCollection.map((m: string) => {
        return (
          <Link
            href={{
              pathname: "/chapters",
              query: {
                manga: m,
              },
            }}
          >
            {m}
            <br />
          </Link>
        );
      })}
    </>
  );
};

export default page;
