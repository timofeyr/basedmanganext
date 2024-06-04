// import React from "react";
// import Link from "next/link";
// // import { supabase } from "../../../api";
// import { addBookmark, getChapters } from "./actions";
// import { redirect } from "next/navigation";

// const page = async ({ searchParams }: any) => {
//   const chapters = await getChapters(searchParams);

//   return (
//     <>
//       {chapters?.map((c) => {
//         return (
//           <Link
//             href={{
//               pathname: "/reader",
//               query: {
//                 mangaName: searchParams.mangaName,
//                 chapter: c.name,
//               },
//             }}
//           >
//             {c.name}
//             <br />
//           </Link>
//         );
//       })}
//       <form action={addBookmark}>
//         <input type="hidden" name="manga_name" value={searchParams.mangaName} />
//         <button type="submit">Add to bookmarks</button>
//       </form>
//     </>
//   );
// };

// export default page;

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { supabase } from "../../../api";
import { addBookmark, getChapters } from "./actions";
import { redirect } from "next/navigation";

const page = async ({ searchParams }: any) => {
  const chapters = await getChapters(searchParams);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{searchParams.mangaName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {chapters?.map((c) => (
          <Card key={c.name} className="h-full">
            <CardHeader>
              <Link
                href={{
                  pathname: "/reader",
                  query: {
                    mangaName: searchParams.mangaName,
                    chapter: c.name,
                  },
                }}
              >
                <h2 className="text-lg font-semibold">{c.name}</h2>
              </Link>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            {/* Placeholder for future content */}
            <CardFooter>
              <Button variant="outline">Download</Button> {/* Example button */}
            </CardFooter>
          </Card>
        ))}
      </div>
      <form action={addBookmark} className="mt-8">
        <input type="hidden" name="manga_name" value={searchParams.mangaName} />
        <Button type="submit">Add to bookmarks</Button>
      </form>
    </div>
  );
};

export default page;
