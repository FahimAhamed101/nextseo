import { delay } from "@/lib/utils";
import { BlogPost } from "@/models/BlogPost";
import Link from "next/link";
import Image from 'next/image'
import ImageFilter from "./components/ImageFilter"
export default async function BlogPage() {
  

  const response = await fetch('https://nextbackend-virid.vercel.app/post/api/' );
  
  const data = await response.json();
  console.log(data.posts)
  const  posts  = data;
console.log(posts)
  await delay(1000);
 

  return (
   
    <div className="w-full min-h-screen">
   
   <ImageFilter />

    {posts && posts.map(({ id , title,content,subtitle,image } : BlogPost  ) => (
        <article key={id}>
             <Image
      src={image}
      width={500}
      height={500}
      alt="Picture of the author"
    />
          <h2>

            <Link href={`/posts/${id}`} className="text-lg font-bold">
              {title}
              
            </Link>
            {subtitle}
          </h2>{content}
        </article>
      ))}


  </div>





  );
}