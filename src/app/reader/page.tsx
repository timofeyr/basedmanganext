import ButtonComponent from "@/components/Button";
import * as fs from "fs";
import Image from "next/image";
import React from "react";

const MangaPage = ({ searchParams }: any) => {
  const fileNames = fs.readdirSync(
    "./public/manga/" + searchParams.manga + "/" + searchParams.chapter
  );

  return (
    <>
      {fileNames.map((f) => {
        return (
          <div className="m-auto">
            <Image
              className="mx-auto"
              src={
                "/manga/" +
                searchParams.manga +
                "/" +
                searchParams.chapter +
                "/" +
                f
              }
              width={1000}
              height={100}
              alt={f}
              objectFit="cover"
            />
          </div>
        );
      })}
    </>
  );
};

export default MangaPage;
