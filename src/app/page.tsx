import { delay } from "@/lib/utils";
import { BlogPost } from "@/models/BlogPost";
import Link from "next/link";

export default async function BlogPage() {
  const response = await fetch("http://127.0.0.1:8000/post/api/");
  
  const data = await response.json();
  console.log(data.posts)
  const  posts  = data;
console.log(posts)
  await delay(1000);
 

  return (
    <div className="max-w-prose m-auto space-y-5">
      <h1 className="text-3xl text-center mb-3 font-bold">Posts</h1>
      {posts.map(({ id , title } : BlogPost  ) => (
        <article key={title}>
          <h2>
            <Link href={`/posts/${id}`} className="text-lg font-bold">
              {title}
            </Link>
          </h2>
        </article>
      ))}
    </div>
  );
}