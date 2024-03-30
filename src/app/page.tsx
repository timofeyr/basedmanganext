import Link from "next/link";
import { supabase } from "../../api";

const page = async () => {
  const { data: mangas } = await supabase.from("mangas").select("title");
  if (!mangas) return null;

  return (
    <>
      {mangas.map((manga) => {
        return (
          <Link
            href={{
              pathname: "/chapters",
              query: {
                mangaName: manga.title,
              },
            }}
          >
            {manga.title}
            <br />
          </Link>
        );
      })}
      <br />
      <Link href="/profile">Profile</Link>
    </>
  );
};

export default page;
