// import Link from "next/link";
// import { checkAuth, getBookmarks, getProfilePicture, logOut } from "./actions";
// import Image from "next/image";
// import { redirect } from "next/navigation";

// const page = async () => {
//   const url = await getProfilePicture();
//   const bookmarks = await getBookmarks();
//   const auth = await checkAuth();
//   if (!auth) {
//     redirect("/login");
//   } else {
//     return (
//       <>
//         <Image
//           className="mx-auto"
//           src={url}
//           width={300}
//           height={100}
//           alt={url}
//           objectFit="cover"
//         />
//         {bookmarks?.map((b) => {
//           return (
//             <Link
//               href={{
//                 pathname: "/chapters",
//                 query: {
//                   mangaName: b.manga_name,
//                 },
//               }}
//             >
//               {b.manga_name}
//               <br />
//             </Link>
//           );
//         })}
//         <form action={logOut}>
//           <button type="submit">Log Out</button>
//         </form>
//       </>
//     );
//   }
// };

// export default page;

import Link from "next/link";
import { checkAuth, getBookmarks, getProfilePicture, logOut } from "./actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";

const page = async () => {
  const url = await getProfilePicture();
  const bookmarks = await getBookmarks();
  const auth = await checkAuth();

  if (!auth) {
    redirect("/login");
  } else {
    return (
      <>
        <TopBar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Image
              className="rounded-full"
              src={url}
              width={120}
              height={120}
              alt="Profile Picture"
              objectFit="cover"
            />
            <h1 className="text-2xl font-bold mt-4">My Profile</h1>
          </div>

          <h2 className="text-xl font-semibold mb-4">Bookmarks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bookmarks?.map((b) => (
              <Card key={b.manga_name} className="h-full">
                <CardHeader>
                  <Link
                    href={{
                      pathname: "/chapters",
                      query: {
                        mangaName: b.manga_name,
                      },
                    }}
                  >
                    <h2 className="text-lg font-semibold">{b.manga_name}</h2>
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                {/* Placeholder for future content, e.g., manga cover */}
                <CardFooter>
                  <Button variant="outline">Remove</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <form action={logOut} className="mt-8">
            <Button type="submit">Log Out</Button>
          </form>
        </div>
      </>
    );
  }
};

export default page;
