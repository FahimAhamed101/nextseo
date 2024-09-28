/** @type {import('next').NextConfig} */


const nextConfig = {
 
    images: {
        domains: ['nextbackend-virid.vercel.app'],
        unoptimized: true,
      },

      
      env:{
        API_URL: process.env.API_URL,
      }

};

export default nextConfig;
