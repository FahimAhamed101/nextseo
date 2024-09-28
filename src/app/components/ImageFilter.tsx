


import Button from "./Button";
import { Image } from "./Image";
import { Text } from "./Text";
import { BlogPost } from "@/models/BlogPost";

const ImageFilter = async () => {
  


  const response = await fetch('http://127.0.0.1:8000/post/api/' );
  
  const data = await response.json();
  console.log(data.posts)
  const  posts  = data;
console.log(posts)

 
    return (
        <section className="w-full flex flex-col gap-12 py-16 lg:px-16 md:px-10 px-5">
            <div className="flex w-full md:justify-center items-start md:gap-6 gap-3 flex-wrap">
               
                {/* filtered cards display */}
                <main className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-x-5 gap-y-8 md:mt-8">
                    {
                        posts.map(({ id , title,content,subtitle,image } : BlogPost  ) => (

                            <div key={id} className={`w-full cursor-pointer transition-all duration-200 rounded-lg shadow bg-gray-800 border border-gray-600 `}>
                                <Image className="rounded-t-lg w-full h-[200px] overflow-hidden" image={image} alt={title} objectCover="object-cover" />
                               
                                <div className="p-5">
                                    <Text as="h5" className="mb-2 text-2xl font-bold tracking-tight text-white">
                                   
                                    </Text>
                                    <Text as="p" className="mb-3 font-normal text-gray-400">
                                       
                                    </Text>
                                </div>
                            </div>

                        ))
                    }
                </main>

            </div>
        </section>
    )
}

export default ImageFilter