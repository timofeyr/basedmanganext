import Link from "next/link";
import { supabase } from "../../api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const page = async () => {
  const { data: mangas } = await supabase.from("mangas").select("title");
  if (!mangas) return null;
  console.log(mangas);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Manga</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mangas.map((manga) => (
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
                <h2 className="text-lg font-semibold">{manga.title}</h2>
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
      <div className="mt-8">
        <Link href="/profile">
          <Button>Go to Profile</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
