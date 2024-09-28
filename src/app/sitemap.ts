import { BlogPost  } from "@/models/BlogPost";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch("https://nextbackend-virid.vercel.app/post/api/");
  const data = await response.json();
  console.log(data.posts)
  const  posts  = data;
console.log(posts)
  const postEntries: MetadataRoute.Sitemap = posts.map(({ id } :  BlogPost ) => ({
    url: `https://nextbackend-virid.vercel.app/post/api/posts/${id}`,
    // lastModified: new Date(post.updatedAt),
    // changeFrequency:,
    // priority:
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}