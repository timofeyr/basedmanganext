// import Link from "next/link";
// // import { supabase } from "../../api";
// import { createClient } from "@/utils/supabase/client";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// const page = async () => {
//   const supabase = createClient();
//   const { data: mangas } = await supabase.from("mangas").select("title");
//   if (!mangas) return null;
//   // console.log(mangas);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">All Manga</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {mangas.map((manga) => (
//           <Card key={manga.title} className="h-full">
//             <CardHeader>
//               <Link
//                 href={{
//                   pathname: "/chapters",
//                   query: {
//                     mangaName: manga.title,
//                   },
//                 }}
//               >
//                 <h2 className="text-lg font-semibold">{manga.title}</h2>
//               </Link>
//             </CardHeader>
//             <CardContent className="flex-grow"></CardContent>{" "}
//             {/* Placeholder for future content */}
//             <CardFooter>
//               {/* <Button variant="outline">Unfollow</Button> */}
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//       <div className="mt-8">
//         <Link href="/profile">
//           <Button>Go to Profile</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default page;

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";

// The modified function to fetch first image, author, and genre

async function fetchMangaDetails(mangaTitle: any) {
  const supabase = createClient();

  try {
    // Fetch manga details
    const { data: mangaData, error: mangaError } = await supabase
      .from("mangas")
      .select("author, genre")
      .eq("title", mangaTitle)
      .single();

    if (mangaError) {
      console.error(
        `Error fetching manga details for ${mangaTitle}:`,
        mangaError
      );
      return null;
    }

    // Fetch first image
    const { data: chapterList, error: chapterError } = await supabase.storage
      .from("basedmanga")
      .list(`manga/${mangaTitle}/`);

    if (chapterError) {
      console.error(
        `Error fetching chapter list for ${mangaTitle}:`,
        chapterError
      );
      return null;
    }

    if (!chapterList || chapterList.length === 0) {
      console.log(`No chapters found for '${mangaTitle}'.`);
      return null;
    }

    const firstChapterDir = chapterList.find(
      (item) => item.name !== ".." && item.name !== "."
    );

    if (!firstChapterDir) {
      console.log(
        `No valid first chapter directory found for '${mangaTitle}'.`
      );
      return null;
    }

    const { data: fileList, error: fileError } = await supabase.storage
      .from("basedmanga")
      .list(`manga/${mangaTitle}/${firstChapterDir.name}/`);

    if (fileError) {
      console.error(`Error fetching file list for ${mangaTitle}:`, fileError);
      return null;
    }

    const firstImage = fileList.find(
      (file) => file.name.endsWith(".jpg") || file.name.endsWith(".png")
    );

    if (!firstImage) {
      console.log(
        `No image file found in the first chapter of '${mangaTitle}'.`
      );
      return null;
    }

    return {
      previewImage: supabase.storage
        .from("basedmanga")
        .getPublicUrl(
          `manga/${mangaTitle}/${firstChapterDir.name}/${firstImage.name}`
        ).data.publicUrl,
      author: mangaData.author,
      genre: mangaData.genre,
    };
  } catch (e) {
    console.error(`An unexpected error occurred for ${mangaTitle}:`, e);
    return null;
  }
}

const page = async () => {
  const supabase = createClient();
  const { data: mangas } = await supabase.from("mangas").select("title");
  if (!mangas) return null;

  // Fetch manga details asynchronously
  const mangaPromises = mangas.map(async (manga) => {
    const details = await fetchMangaDetails(manga.title);
    return { ...manga, ...details };
  });

  const mangasWithDetails = await Promise.all(mangaPromises);

  console.log(mangasWithDetails);

  return (
    <>
      <TopBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Manga</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mangasWithDetails.map((manga) => (
            <Card key={manga.title} className="h-full">
              <CardHeader>
                <Link
                  href={{
                    pathname: "/chapters",
                    query: {
                      mangaName: manga.title,
                    },
                  }}
                >
                  <img
                    src={manga.previewImage}
                    alt={`${manga.title} Preview`}
                    className="w-full h-auto mb-2"
                  />
                  <h2 className="text-lg font-semibold">{manga.title}</h2>
                  <p>Author: {manga.author}</p>
                  <p>Genre: {manga.genre}</p>
                </Link>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>{" "}
              {/* Placeholder for future content */}
              <CardFooter>
                {/* <Button variant="outline">Unfollow</Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* <div className="mt-8">
          <Link href="/profile">
            <Button className="mr-2">Go to Profile</Button>
          </Link>
          <Link href="/upload">
            <Button className="mr-2">Upload manga</Button>
          </Link>
          <Link href="/chat">
            <Button>Chat</Button>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default page;
