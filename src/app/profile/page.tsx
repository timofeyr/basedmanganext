import Link from "next/link";
import { checkAuth, getBookmarks, getProfilePicture, logOut } from "./actions";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async () => {
  const url = await getProfilePicture();
  const bookmarks = await getBookmarks();
  const auth = await checkAuth();
  if (!auth) {
    redirect("/login");
  } else {
    return (
      <>
        <Image
          className="mx-auto"
          src={url}
          width={300}
          height={100}
          alt={url}
          objectFit="cover"
        />
        {bookmarks?.map((b) => {
          return (
            <Link
              href={{
                pathname: "/chapters",
                query: {
                  mangaName: b.manga_name,
                },
              }}
            >
              {b.manga_name}
              <br />
            </Link>
          );
        })}
        <form action={logOut}>
          <button type="submit">Log Out</button>
        </form>
      </>
    );
  }
};

export default page;
