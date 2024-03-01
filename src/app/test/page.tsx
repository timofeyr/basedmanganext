// import { supabase } from "../../../api";
// import Image from "next/image";

// const getImages = async ({ mangaName }: any) => {
//   const { data, error } = await supabase.storage
//     .from("basedmanga")
//     .list("manga/Futari Escape/Futari Escape ch02 End of the line escape");

//   const names = data?.map((obj) =>
//     supabase.storage
//       .from("basedmanga")
//       .getPublicUrl(
//         "manga/Futari Escape/Futari Escape ch02 End of the line escape/" +
//           obj.name
//       )
//   );

//   // console.log(names?[0].data.publicUrl);

//   return (
//     <>
//       {names?.map((img) => {
//         return (
//           <div className="m-auto">
//             <Image
//               className="mx-auto"
//               src={img.data.publicUrl}
//               width={1000}
//               height={100}
//               alt=""
//               objectFit="cover"
//             />
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default getImages;
