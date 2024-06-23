"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { getServerSideSupabase } from "./action";

// export const getSesh = async () => {
//   const { session } = await getServerSideSupabase();

//   // You can perform authenticated operations here if needed
//   // e.g., fetching user-specific data before rendering

//   return {
//     props: {
//       initialSession: session,
//     }, // will be passed to the page component as props
//   };
// };

const UploadManga = () => {
  const [fileUploadProgress, setFileUploadProgress] = useState<number>(0);
  //   const session = getSesh();
  const supabase = createClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string; author: string; genre: string }>();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Handle folder upload logic here, considering browser limitations with folder uploads.
    // You might need a library like 'react-directory-upload' or implement chunked file uploads manually.
    // For simplicity, we'll assume single file upload for now.
    const file = files[0];
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    // if (!session) return;

    const { data, error: uploadError } = await supabase.storage
      .from("basedmanga")
      .upload(`zips/${file.name}`, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return;
    }
  };

  const onSubmit = async (data: {
    title: string;
    author: string;
    genre: string;
  }) => {
    try {
      // Insert manga details into the database
      const { error: insertError } = await supabase.from("mangas").insert({
        title: data.title,
        author: data.author,
        genre: data.genre,
      });

      if (insertError) {
        console.error("Insert error:", insertError);
        return;
      }

      alert("Manga uploaded successfully!");
      router.push("/"); // Redirect or show success message
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Upload Manga</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Since folder upload via browser is complex, we'll demonstrate single file input */}
        <Label htmlFor="file">Select Manga Zipped Folder</Label>
        <Input
          id="file"
          type="file"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          onChange={handleFileChange}
        />

        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Manga Title (Same as folder name)"
          {...register("title", { required: true })}
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && <p className="text-red-500">Title is required</p>}
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          placeholder="Author Name"
          {...register("author", { required: true })}
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            errors.author ? "border-red-500" : ""
          }`}
        />
        {errors.author && <p className="text-red-500">Author is required</p>}

        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          placeholder="Genre"
          {...register("genre", { required: true })}
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            errors.genre ? "border-red-500" : ""
          }`}
        />
        {errors.genre && <p className="text-red-500">Genre is required</p>}

        <Button type="submit" className="w-full mt-4">
          Upload Manga
        </Button>
      </form>
      {fileUploadProgress > 0 && <p>Upload Progress: {fileUploadProgress}%</p>}
    </div>
  );
};

export default UploadManga;
