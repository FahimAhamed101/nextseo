import ClapButton from "@/components/ClapButton";
import { delay } from "@/lib/utils";
import { BlogPost } from "@/models/BlogPost";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import Image from 'next/image'
interface BlogPostPageProps {
  params: { postId: string };
}

export async function generateStaticParams() {
  const response = await fetch("http://127.0.0.1:8000/post/api/");
  const data = await response.json();
  console.log(data.posts)
  const  posts  = data;

  return data.posts.map(({ id  } : BlogPost ) => id);
}

// Manually deduplicate requests if not using fetch
// const getPost = cache(async (postId: string) => {
//   const post = await prisma.post.findUnique(postId);
//   return post;
// })

export async function generateMetadata({
  params: { postId },
}: BlogPostPageProps): Promise<Metadata> {
  const response = await fetch(`http://127.0.0.1:8000/post/api/${postId}`);
  const post : BlogPost = await response.json();

  return {
    title: post.title,
    description: post.body,
    // openGraph: {
    //   images: [
    //     {
    //       url: post.imageUrl
    //     }
    //   ]
    // }
  };
}

export default async function BlogPostPage({
  params: { postId },
}: BlogPostPageProps) {
  const response = await fetch(`http://127.0.0.1:8000/post/api/${postId}`);
  const { title, image,content }: BlogPost = await response.json();

  if (response.status === 404) {
    notFound();
  }

  await delay(1000);

  return (
    <article className="max-w-prose m-auto space-y-5">
      <h1 className="text-3xl text-center font-bold">{title}</h1>
      <p className="text-lg">{content}</p>
      <Image
      src={image}
      width={500}
      height={500}
      alt="Picture of the author"
    />
      <ClapButton />
    </article>
  );
}